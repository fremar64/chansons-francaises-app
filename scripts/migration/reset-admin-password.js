#!/usr/bin/env node
/**
 * Reset Admin Password
 * 
 * Permet de définir un nouveau mot de passe pour l'admin après migration
 * 
 * Usage: node scripts/migration/reset-admin-password.js <email> <new-password>
 */

require('dotenv').config({ path: require('path').join(__dirname, '../../.env.local') });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.error('❌ Usage: node reset-admin-password.js <email> <new-password>');
  console.error('   Example: node reset-admin-password.js admin@ceredis.net NewSecurePassword123!');
  process.exit(1);
}

async function resetPassword() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  console.log(`🔄 Resetting password for ${email}...`);

  // Récupérer l'utilisateur par email
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error('❌ Error listing users:', listError.message);
    process.exit(1);
  }

  const user = users.find(u => u.email === email);
  
  if (!user) {
    console.error(`❌ User not found: ${email}`);
    process.exit(1);
  }

  // Mettre à jour le mot de passe
  const { data, error } = await supabase.auth.admin.updateUserById(
    user.id,
    { password: newPassword }
  );

  if (error) {
    console.error('❌ Error updating password:', error.message);
    process.exit(1);
  }

  console.log('✅ Password updated successfully!');
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 New password: ${newPassword}`);
  console.log(`🆔 User ID: ${user.id}`);
}

resetPassword().catch(error => {
  console.error('💥 Fatal error:', error);
  process.exit(1);
});
