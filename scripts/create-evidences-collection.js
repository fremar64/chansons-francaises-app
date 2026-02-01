/**
 * Script pour créer la collection "evidences" dans PocketBase
 * 
 * Usage :
 * 1. Ouvrir la console DevTools sur https://pocketbase-songs.ceredis.net/_/
 * 2. Copier-coller ce script
 * 3. Appuyer sur Entrée
 */

// Configuration de la collection
const collectionConfig = {
  name: "evidences",
  type: "base",
  schema: [
    {
      name: "user",
      type: "relation",
      required: true,
      options: {
        collectionId: "_pb_users_auth_",
        cascadeDelete: true,
        minSelect: 1,
        maxSelect: 1,
        displayFields: ["email", "username"]
      }
    },
    {
      name: "competency_id",
      type: "text",
      required: true,
      options: {
        min: 1,
        max: 10,
        pattern: "^[1-5]\\.[1-7]$"
      }
    },
    {
      name: "evidence_type",
      type: "select",
      required: true,
      options: {
        maxSelect: 1,
        values: ["P1", "P2", "P3", "P4"]
      }
    },
    {
      name: "score",
      type: "number",
      required: true,
      options: {
        min: 0,
        max: 100
      }
    },
    {
      name: "activity_type",
      type: "text",
      required: false,
      options: {
        max: 100
      }
    },
    {
      name: "seance_id",
      type: "text",
      required: false,
      options: {
        max: 50
      }
    },
    {
      name: "parcours",
      type: "text",
      required: false,
      options: {
        max: 100
      }
    },
    {
      name: "metadata",
      type: "json",
      required: false
    }
  ],
  indexes: [
    "CREATE INDEX idx_evidences_user_competency ON evidences (user, competency_id, created)"
  ],
  listRule: "@request.auth.id != \"\" && user = @request.auth.id",
  viewRule: "@request.auth.id != \"\" && user = @request.auth.id",
  createRule: "@request.auth.id != \"\" && @request.data.user = @request.auth.id",
  updateRule: "@request.auth.id != \"\" && user = @request.auth.id",
  deleteRule: "@request.auth.id != \"\" && user = @request.auth.id"
};

console.log("📋 Configuration de la collection evidences :");
console.log(JSON.stringify(collectionConfig, null, 2));
console.log("\n✅ Copiez cette configuration et utilisez-la pour créer la collection via l'interface PocketBase Admin");
console.log("\nOU utilisez l'API REST pour créer automatiquement :");
console.log("\nfetch('https://pocketbase-songs.ceredis.net/api/collections', {");
console.log("  method: 'POST',");
console.log("  headers: {");
console.log("    'Content-Type': 'application/json',");
console.log("    'Authorization': 'Bearer YOUR_ADMIN_TOKEN'");
console.log("  },");
console.log("  body: JSON.stringify(collectionConfig)");
console.log("});");
