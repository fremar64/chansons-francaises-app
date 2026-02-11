#!/bin/bash

echo "🔎 CEREDIS Post-Migration Validation"
echo "-------------------------------------"

FAIL=0

echo "1️⃣ Verification absence logique metier dans routes legacy..."

LEGACY_LOGIC=$(grep -R "computeScore\|threshold\|stability\|Ds\|Dd" apps/lecture \
  --exclude-dir=node_modules --exclude-dir=.next 2>/dev/null)

if [ ! -z "$LEGACY_LOGIC" ]; then
  echo "❌ Logique metier detectee dans routes legacy"
  echo "$LEGACY_LOGIC"
  FAIL=1
else
  echo "✅ Routes legacy propres"
fi


echo ""
echo "2️⃣ Verification createActivity unique point d'entree..."

CREATE_USAGE=$(grep -R "createActivity(" apps app \
  --exclude-dir=node_modules --exclude-dir=.next 2>/dev/null)

if [ -z "$CREATE_USAGE" ]; then
  echo "❌ createActivity non utilise"
  FAIL=1
else
  echo "✅ createActivity utilise"
fi


echo ""
echo "3️⃣ Verification dependances interdites dans activities..."

FORBIDDEN=$(grep -R "scoring-engine\|decision-engine\|cecrl\|cass" packages/activities \
  --exclude-dir=node_modules --exclude-dir=.next 2>/dev/null)

if [ ! -z "$FORBIDDEN" ]; then
  echo "❌ Dependances interdites detectees"
  echo "$FORBIDDEN"
  FAIL=1
else
  echo "✅ activities isole correctement"
fi


echo ""
echo "4️⃣ Verification routes metier supprimees ou redirigees..."

LEGACY_FILES=$(find apps/lecture/app -path "*/levels/*" -name "page.tsx" 2>/dev/null)

LEGACY_FAIL=0
for file in $LEGACY_FILES; do
  if ! grep -q "redirect(" "$file"; then
    echo "❌ Route legacy sans redirection: $file"
    LEGACY_FAIL=1
  fi
done

if [ $LEGACY_FAIL -eq 1 ]; then
  FAIL=1
else
  echo "✅ Routes legacy en redirection uniquement"
fi


echo ""
echo "-------------------------------------"

if [ $FAIL -eq 0 ]; then
  echo "🎉 Migration validee"
else
  echo "🚨 Migration incomplete"
fi

exit $FAIL
