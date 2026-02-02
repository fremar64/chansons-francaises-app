import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { computeCeredisScore } from '@/services/ceredis-calculator';
import type { Evidence } from '@/services/ceredis-calculator/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Créer client Supabase
    const supabase = await createClient();

    // Récupérer les evidences depuis Supabase
    const { data: records, error } = await supabase
      .from('evidences')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query failed:', error);
      return NextResponse.json({ 
        error: 'Database query failed', 
        details: error.message 
      }, { status: 502 });
    }

    // Mapper les champs Supabase vers le type Evidence
    const evidences: Evidence[] = (records || []).map((r: any) => ({
      id: r.id,
      user: r.user_id || userId,
      competency_id: r.competency_id,
      evidence_type: r.evidence_type,
      score: Number(r.score) || 0,
      created: r.created_at || new Date().toISOString(),
      activity_type: r.activity_type,
      seance_id: r.seance_id,
      parcours: r.metadata?.parcours,
      metadata: r.metadata || {}
    }));

    const result = await computeCeredisScore(userId, evidences);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('CEREDIS calculation error:', error);
    return NextResponse.json({ 
      error: error?.message || String(error),
      details: error?.data || null
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    // Créer client Supabase
    const supabase = await createClient();

    // Récupérer les evidences depuis Supabase
    const { data: records, error } = await supabase
      .from('evidences')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query failed:', error);
      return NextResponse.json({ 
        error: 'Database query failed', 
        details: error.message 
      }, { status: 502 });
    }

    // Mapper les champs Supabase vers le type Evidence
    const evidences: Evidence[] = (records || []).map((r: any) => ({
      id: r.id,
      user: r.user_id || userId,
      competency_id: r.competency_id,
      evidence_type: r.evidence_type,
      score: Number(r.score) || 0,
      created: r.created_at || new Date().toISOString(),
      activity_type: r.activity_type,
      seance_id: r.seance_id,
      parcours: r.metadata?.parcours,
      metadata: r.metadata || {}
    }));

    const result = await computeCeredisScore(userId, evidences);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('CEREDIS fetch error:', error);
    return NextResponse.json({ 
      error: error?.message || String(error),
      details: error?.data || null
    }, { status: 500 });
  }
}
