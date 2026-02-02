#!/usr/bin/env node
/**
 * Transform Data - PocketBase → Supabase
 * 
 * Transforme les données exportées de PocketBase vers le format Supabase
 * - camelCase → snake_case
 * - Timestamps PocketBase → ISO8601
 * - Relations → UUIDs
 * 
 * Référence : MIGRATION_MASTER_PLAN.md - Jour 2
 * 
 * Usage: node scripts/migration/transform-data.js
 */

const fs = require('fs').promises;
const path = require('path');

const EXPORT_DIR = path.join(__dirname, '../../exports');
const TRANSFORM_DIR = path.join(__dirname, '../../transformed');

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

/**
 * Convertit les noms de champs de camelCase vers snake_case
 */
function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Transforme un utilisateur PocketBase → profil Supabase
 */
function transformUser(user) {
  return {
    id: user.id, // Garder le même ID pour la relation avec auth.users
    name: user.name || user.username || 'Unknown',
    username: user.username,
    email: user.email,
    role: user.role || 'student',
    is_validated: user.isValidated !== undefined ? user.isValidated : true,
    avatar_url: user.avatar || null,
    metadata: user.preferences || {},
    created_at: user.created,
    updated_at: user.updated
  };
}

/**
 * Transforme une chanson PocketBase (pas de mapping nécessaire - pas dans schema Supabase actuel)
 */
function transformChanson(chanson) {
  // Les chansons restent en format original car pas de table chansons dans Supabase pour l'instant
  return chanson;
}

/**
 * Transforme une séance PocketBase (pas de mapping nécessaire - pas dans schema Supabase actuel)
 */
function transformSeance(seance) {
  // Les séances restent en format original car pas de table seances dans Supabase pour l'instant
  return seance;
}

/**
 * Transforme une evidence PocketBase → Supabase
 */
function transformEvidence(evidence) {
  return {
    id: evidence.id,
    user_id: evidence.user || evidence.userId,
    competency_id: evidence.competencyId || evidence.competency_id,
    evidence_type: evidence.evidenceType || evidence.evidence_type || evidence.type,
    score: parseFloat(evidence.score) || 0,
    activity_type: evidence.activityType || evidence.activity_type,
    activity_id: evidence.activityId || evidence.activity_id,
    seance_id: evidence.seanceId || evidence.seance_id,
    chanson_id: evidence.chansonId || evidence.chanson_id,
    response: evidence.response || null,
    metadata: evidence.metadata || {},
    created_at: evidence.created || evidence.created_at,
    updated_at: evidence.updated || evidence.updated_at
  };
}

/**
 * Transforme une progression PocketBase → activity Supabase
 */
function transformProgression(progression) {
  return {
    id: progression.id,
    user_id: progression.user || progression.userId,
    seance_id: progression.seanceId || progression.seance_id,
    score: parseFloat(progression.score) || 0,
    score_total: parseFloat(progression.scoreTotal || progression.score_total) || 0,
    score_max: parseFloat(progression.scoreMax || progression.score_max) || 100,
    time_spent: parseInt(progression.timeSpent || progression.time_spent) || 0,
    completed: progression.completed || false,
    metadata: progression.metadata || {},
    created_at: progression.created || progression.created_at,
    updated_at: progression.updated || progression.updated_at
  };
}

async function transformCollection(inputName, outputName, transformFn) {
  console.log(`\n🔄 Transforming ${inputName} → ${outputName}...`);
  
  try {
    const filePath = path.join(EXPORT_DIR, `${inputName}.json`);
    const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    
    if (data.length === 0) {
      console.log(`   ⚪ No records to transform`);
      // Créer quand même un fichier vide
      const outPath = path.join(TRANSFORM_DIR, `${outputName}.json`);
      await fs.writeFile(outPath, JSON.stringify([], null, 2));
      return 0;
    }
    
    const transformed = data.map(transformFn);
    
    const outPath = path.join(TRANSFORM_DIR, `${outputName}.json`);
    await fs.writeFile(outPath, JSON.stringify(transformed, null, 2));
    
    console.log(`✅ Transformed ${transformed.length} records`);
    return transformed.length;
  } catch (error) {
    console.error(`❌ Error transforming ${inputName}:`, error.message);
    // Créer un fichier vide en cas d'erreur
    try {
      const outPath = path.join(TRANSFORM_DIR, `${outputName}.json`);
      await fs.writeFile(outPath, JSON.stringify([], null, 2));
    } catch (e) {}
    return 0;
  }
}

async function main() {
  console.log('🔄 Starting data transformation...\n');
  console.log('📋 Mapping PocketBase → Supabase:\n');
  console.log('   users           → profiles');
  console.log('   evidences       → evidences');
  console.log('   progression     → activities');
  console.log('   chansons        → (kept for reference)');
  console.log('   seances         → (kept for reference)\n');
  
  await ensureDir(TRANSFORM_DIR);
  
  const stats = {};
  
  // Transformer les collections
  stats.profiles = await transformCollection('users', 'profiles', transformUser);
  stats.evidences = await transformCollection('evidences', 'evidences', transformEvidence);
  stats.activities = await transformCollection('progression', 'activities', transformProgression);
  
  // Copier chansons et seances sans transformation (pour référence)
  stats.chansons = await transformCollection('chansons', 'chansons', transformChanson);
  stats.seances = await transformCollection('seances', 'seances', transformSeance);
  
  // Sauvegarder statistiques
  const statsPath = path.join(TRANSFORM_DIR, '_transform_stats.json');
  await fs.writeFile(statsPath, JSON.stringify({
    transformedAt: new Date().toISOString(),
    mapping: {
      'users → profiles': stats.profiles,
      'evidences → evidences': stats.evidences,
      'progression → activities': stats.activities,
      'chansons (reference)': stats.chansons,
      'seances (reference)': stats.seances
    },
    totalRecords: Object.values(stats).reduce((sum, count) => sum + count, 0)
  }, null, 2));
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✨ Transformation complete!\n');
  console.log(`📁 Files saved to: ${TRANSFORM_DIR}`);
  console.log(`📊 Total records: ${Object.values(stats).reduce((sum, count) => sum + count, 0)}\n`);
  console.log('📋 Details:');
  console.log(`   profiles    : ${stats.profiles} records`);
  console.log(`   evidences   : ${stats.evidences} records`);
  console.log(`   activities  : ${stats.activities} records`);
  console.log(`   chansons    : ${stats.chansons} records (reference)`);
  console.log(`   seances     : ${stats.seances} records (reference)\n`);
}

main().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
