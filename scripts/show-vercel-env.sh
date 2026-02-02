#!/bin/bash
# Script pour afficher les variables d'environnement à copier dans Vercel
# Usage: ./scripts/show-vercel-env.sh

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Variables d'environnement pour Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ ! -f .env.local ]; then
  echo "❌ Fichier .env.local introuvable !"
  exit 1
fi

echo "🔧 SUPABASE (OBLIGATOIRE pour tous les environnements)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
grep "NEXT_PUBLIC_SUPABASE_URL=" .env.local
grep "NEXT_PUBLIC_SUPABASE_ANON_KEY=" .env.local
echo ""

echo "🔐 SUPABASE SERVICE ROLE (Production uniquement)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
grep "SUPABASE_SERVICE_ROLE_KEY=" .env.local
echo ""

echo "🎓 CaSS (Système de compétences)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
grep "CASS_URL=" .env.local
grep "CASS_USERNAME=" .env.local
grep "CASS_PASSWORD=" .env.local
grep "NEXT_PUBLIC_CASS_FRAMEWORK_ID=" .env.local
echo ""

echo "📊 xAPI (Learning Record Store)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
grep "XAPI_LRS_URL=" .env.local
grep "XAPI_LRS_USERNAME=" .env.local
grep "XAPI_LRS_PASSWORD=" .env.local
echo ""

echo "🔑 NextAuth"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
grep "NEXTAUTH_SECRET=" .env.local
echo "NEXTAUTH_URL=https://enaa-chansons.ceredis.net  # À ajouter manuellement"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pour configurer sur Vercel :"
echo "   1. Aller sur https://vercel.com/fremar64/chansons-francaises-app/settings/environment-variables"
echo "   2. Copier-coller chaque variable ci-dessus"
echo "   3. Sélectionner les environnements appropriés"
echo "   4. Cliquer sur 'Save'"
echo ""
echo "⚠️  Variables sensibles (Production uniquement) :"
echo "   - SUPABASE_SERVICE_ROLE_KEY"
echo "   - CASS_USERNAME, CASS_PASSWORD"
echo "   - XAPI_LRS_USERNAME, XAPI_LRS_PASSWORD"
echo ""
echo "📋 Variables publiques (tous les environnements) :"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "   - CASS_URL"
echo "   - NEXT_PUBLIC_CASS_FRAMEWORK_ID"
echo "   - NEXTAUTH_SECRET"
echo "   - NEXTAUTH_URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
