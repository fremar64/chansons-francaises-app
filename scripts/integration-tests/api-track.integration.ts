import 'dotenv/config';
import assert from 'assert';

async function testApiTrack() {
  console.log('🔎 Test API: POST /api/ceredis/track (activité fictive)...');
  const payload = {
    userId: 'test-user',
    userName: 'Testeur',
    activityId: 'test-activity',
    activityName: 'Test Activity',
    activityType: 'qcm',
    chansonId: 'test-chanson',
    seanceId: 'test-seance',
    niveau: 'A1',
    score: 8,
    maxScore: 10,
    duration: 120,
    response: 'Réponse test',
    metadata: { test: true },
  };

  const res = await fetch('http://localhost:3000/api/ceredis/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  assert(res.ok, `La requête API doit réussir (status ${res.status})`);
  const data = await res.json();
  assert(data.success === true, 'Le tracking doit être un succès');
  assert(Array.isArray(data.xapiStatements), 'xapiStatements doit être un tableau');
  assert(Array.isArray(data.cassAssertions), 'cassAssertions doit être un tableau');
  console.log('✅ Tracking API réussi:', data);
}

async function main() {
  try {
    await testApiTrack();
    console.log('🎉 Test API Route /api/ceredis/track passé');
    process.exit(0);
  } catch (e) {
    console.error('❌ Erreur lors du test API:', e);
    process.exit(1);
  }
}

main();
