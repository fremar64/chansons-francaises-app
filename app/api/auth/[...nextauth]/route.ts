/**
 * API Auth - Migration Supabase
 * 
 * NOTE: Cette route n'est plus nécessaire avec Supabase Auth.
 * L'authentification se fait directement via les clients Supabase :
 * 
 * - Login : supabase.auth.signInWithPassword({ email, password })
 * - Signup : supabase.auth.signUp({ email, password, options: { data: { role, name } } })
 * - Logout : supabase.auth.signOut()
 * - Session : supabase.auth.getUser()
 * 
 * Les pages login/register doivent être migrées pour utiliser Supabase Auth directement.
 * Cette route est conservée pour compatibilité temporaire mais ne sera plus utilisée.
 * 
 * TODO: Supprimer cette route après migration complète des pages login/register.
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    error: 'NextAuth removed - use Supabase Auth directly',
    message: 'Authentication migrated to Supabase Auth. Use supabase.auth methods in client code.'
  }, { status: 410 }); // 410 Gone
}

export async function POST() {
  return NextResponse.json({ 
    error: 'NextAuth removed - use Supabase Auth directly',
    message: 'Authentication migrated to Supabase Auth. Use supabase.auth methods in client code.'
  }, { status: 410 }); // 410 Gone
}
