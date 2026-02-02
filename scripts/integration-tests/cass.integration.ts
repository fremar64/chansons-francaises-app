import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

console.log('CASS_URL:', process.env.CASS_URL);
console.log('CASS_USERNAME:', process.env.CASS_USERNAME);
console.log('CASS_PASSWORD:', process.env.CASS_PASSWORD ? '***' : '(vide)');
import { getCassClient } from '../../lib/cass-client';
import assert from 'assert';

async function testCassConnection() {
  console.log('🔎 Test CaSS: connexion et récupération des frameworks...');
  const cass = getCassClient();
  const frameworks = await cass.frameworks();
  assert(Array.isArray(frameworks), 'La réponse frameworks doit être un tableau');
  console.log(`✅ Frameworks récupérés: ${frameworks.length}`);
}

async function testCreateAssertion() {
  console.log('🔎 Test CaSS: création d\'une assertion fictive...');
  const cass = getCassClient();
  const fakeAssertion = {
    '@context': 'http://purl.org/ctdl/terms/',
    '@type': 'ceasn:Assertion',
    competency: '1.1',
    subject: 'test-user',
    evidence: 'http://localhost:3000/response/test',
    level: 'A1',
    confidence: 0.8,
    assertedDate: new Date().toISOString(),
  };
  const created = await cass.createAssertion(fakeAssertion);
  assert(created && created.competency === '1.1', 'L\'assertion CaSS n\'a pas été créée correctement');
  console.log('✅ Assertion CaSS fictive créée avec succès');
}

async function main() {
  try {
    await testCassConnection();
    await testCreateAssertion();
    console.log('🎉 Tous les tests CaSS sont passés');
    process.exit(0);
  } catch (e) {
    console.error('❌ Erreur lors des tests CaSS:', e);
    process.exit(1);
  }
}

main();
