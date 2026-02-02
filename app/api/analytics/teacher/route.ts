
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Utilitaires pour déterminer le niveau CECRL à partir du score moyen
function getCecrlLevel(avgScore: number): string {
  if (avgScore >= 90) return 'B2';
  if (avgScore >= 75) return 'B1';
  if (avgScore >= 60) return 'A2';
  return 'A1';
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Récupérer toutes les activités avec les utilisateurs
    const { data: activities, error } = await supabase
      .from('activities')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ students: [] });
    }

    if (!activities || activities.length === 0) {
      return NextResponse.json({ students: [] });
    }

    // Récupérer les informations des utilisateurs uniques
    const userIds = [...new Set(activities.map(a => a.user_id))];
    const { data: users } = await supabase
      .from('profiles')
      .select('id, name, username')
      .in('id', userIds);

    const userMap = new Map(users?.map(u => [u.id, u]) || []);

    // Agréger par élève
    const statsByUser: Record<string, {
      userId: string;
      userName: string;
      totalActivities: number;
      totalScore: number;
      totalScoreMax: number;
    }> = {};

    for (const activity of activities) {
      const userId = activity.user_id;
      const user = userMap.get(userId);
      const userName = user?.name || user?.username || 'Élève';
      
      if (!statsByUser[userId]) {
        statsByUser[userId] = {
          userId,
          userName,
          totalActivities: 0,
          totalScore: 0,
          totalScoreMax: 0,
        };
      }
      statsByUser[userId].totalActivities += 1;
      statsByUser[userId].totalScore += activity.score_total || 0;
      statsByUser[userId].totalScoreMax += activity.score_max || 0;
    }

    // Formater la réponse
    const students = Object.values(statsByUser).map(s => {
      const avgScore = s.totalScoreMax > 0 ? Math.round((s.totalScore / s.totalScoreMax) * 100) : 0;
      return {
        userId: s.userId,
        userName: s.userName,
        totalActivities: s.totalActivities,
        avgScore,
        cecrlLevel: getCecrlLevel(avgScore),
      };
    });

    return NextResponse.json({ students });
  } catch (e: any) {
    console.error('Analytics teacher error:', e);
    return NextResponse.json({ students: [] });
  }
}
