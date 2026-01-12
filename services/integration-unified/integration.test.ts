/**
 * TESTS DU SERVICE D'INTÉGRATION UNIFIÉ
 * Script de test rapide pour vérifier le bon fonctionnement
 */

import { 
  unifiedIntegrationService, 
  createUnifiedPayload,
  type CeredisMetadata 
} from './index';

/**
 * Test 1 : Vérifier le statut du service
 */
export async function testServiceStatus() {
  console.log('\n🧪 TEST 1 : Status du service');
  console.log('================================');
  
  const status = unifiedIntegrationService.getStatus();
  
  console.log('PocketBase:', status.pocketbase.configured ? '✅' : '❌', 
    `(enabled: ${status.pocketbase.enabled})`);
  console.log('CaSS:', status.cass.configured ? '✅' : '❌', 
    `(enabled: ${status.cass.enabled})`);
  console.log('xAPI:', status.xapi.configured ? '✅' : '❌', 
    `(enabled: ${status.xapi.enabled})`);
    
  return status;
}

/**
 * Test 2 : Tester les connexions
 */
export async function testConnections() {
  console.log('\n🧪 TEST 2 : Test des connexions');
  console.log('================================');
  
  const connections = await unifiedIntegrationService.testConnections();
  
  console.log('PocketBase:', connections.pocketbase ? '✅ Connected' : '❌ Failed');
  console.log('CaSS:', connections.cass ? '✅ Connected' : '❌ Failed');
  console.log('xAPI:', connections.xapi ? '✅ Connected' : '❌ Failed');
  
  return connections;
}

/**
 * Test 3 : Tracker une activité de test
 */
export async function testActivityTracking() {
  console.log('\n🧪 TEST 3 : Tracking d\'activité');
  console.log('================================');
  
  // Metadata CEREDIS
  const ceredisMetadata: CeredisMetadata = {
    competencies: ['1.1', '2.1'],
    evidenceType: 'P1',
    domaine: 'D1',
    niveau: 'A2',
    scoreMax: 8
  };
  
  // Créer le payload
  const payload = createUnifiedPayload(
    'test-user-123',
    'Test User',
    'test-activity-001',
    'Test QCM',
    'qcm',
    6,  // score
    8,  // maxScore
    ceredisMetadata,
    {
      chansonId: 'test-chanson',
      seanceId: 'test-seance',
      niveau: 'A2',
      duration: 60
    }
  );
  
  console.log('📊 Payload:', {
    userId: payload.userId,
    activityId: payload.activityId,
    score: `${payload.score}/${payload.maxScore}`,
    competencies: payload.ceredis.competencies
  });
  
  // Tracker l'activité
  console.log('\n⏳ Tracking en cours...');
  const result = await unifiedIntegrationService.trackActivityCompletion(payload);
  
  console.log('\n📊 RÉSULTAT:');
  console.log('Success:', result.success ? '✅' : '❌');
  console.log('Evidences PocketBase:', result.evidencesCreated);
  console.log('Assertions CaSS:', result.cassAssertions.length);
  console.log('Statements xAPI:', result.xapiStatements.length);
  
  if (result.errors.length > 0) {
    console.log('\n❌ Erreurs:');
    result.errors.forEach(err => console.log(`  - ${err}`));
  }
  
  return result;
}

/**
 * Test 4 : Tester les règles Domaine 5
 */
export async function testDomain5Rules() {
  console.log('\n🧪 TEST 4 : Règles Domaine 5');
  console.log('================================');
  
  // Test 1 : QCM simple (ne devrait PAS valider D5)
  console.log('\n📝 Test 4.1 : QCM simple sans justification');
  const metadata1: CeredisMetadata = {
    competencies: ['5.3'], // Compétence D5
    evidenceType: 'P1',
    domaine: 'D5',
    niveau: 'B2',
    scoreMax: 10
  };
  
  const payload1 = createUnifiedPayload(
    'test-user',
    'Test User',
    'test-qcm-simple',
    'QCM Simple',
    'qcm',
    8,
    10,
    metadata1,
    {
      chansonId: 'test',
      seanceId: 'test',
      niveau: 'B2',
      duration: 30
    }
  );
  
  const result1 = await unifiedIntegrationService.trackActivityCompletion(payload1);
  console.log('✅ Test 4.1 terminé:', result1.success ? 'OK' : 'ERREUR');
  
  // Test 2 : QCM avec justification (devrait valider D5)
  console.log('\n📝 Test 4.2 : QCM avec justification');
  const payload2 = createUnifiedPayload(
    'test-user',
    'Test User',
    'test-qcm-justifie',
    'QCM Justifié',
    'qcm_justifie',
    8,
    10,
    metadata1,
    {
      chansonId: 'test',
      seanceId: 'test',
      niveau: 'B2',
      duration: 60,
      response: 'Ceci est une justification détaillée de plus de 20 caractères'
    }
  );
  
  const result2 = await unifiedIntegrationService.trackActivityCompletion(payload2);
  console.log('✅ Test 4.2 terminé:', result2.success ? 'OK' : 'ERREUR');
  
  // Test 3 : Journal réflexif (devrait toujours valider D5)
  console.log('\n📝 Test 4.3 : Journal réflexif');
  const payload3 = createUnifiedPayload(
    'test-user',
    'Test User',
    'test-journal',
    'Journal Réflexif',
    'journal_reflexif',
    10,
    10,
    metadata1,
    {
      chansonId: 'test',
      seanceId: 'test',
      niveau: 'B2',
      duration: 180,
      response: 'Ma réflexion métacognitive...'
    }
  );
  
  const result3 = await unifiedIntegrationService.trackActivityCompletion(payload3);
  console.log('✅ Test 4.3 terminé:', result3.success ? 'OK' : 'ERREUR');
  
  return { result1, result2, result3 };
}

/**
 * Exécuter tous les tests
 */
export async function runAllTests() {
  console.log('🚀 LANCEMENT DES TESTS DU SERVICE UNIFIÉ');
  console.log('=========================================\n');
  
  try {
    await testServiceStatus();
    await testConnections();
    
    // Optionnel : décommenter pour tester le tracking réel
    // await testActivityTracking();
    // await testDomain5Rules();
    
    console.log('\n✅ TOUS LES TESTS TERMINÉS\n');
  } catch (error) {
    console.error('\n❌ ERREUR PENDANT LES TESTS:', error);
  }
}

// Si exécuté directement
if (require.main === module) {
  runAllTests();
}
