import { pb } from "../services/pocketbase/client";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

/**
 * Script pour ajouter le champ "role" à la collection "users" dans PocketBase.
 * Le champ sera de type select ("student" ou "teacher").
 */

async function addRoleFieldToUsers() {
  // Authentification admin
  await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL!, process.env.PB_ADMIN_PASSWORD!);
  const collection = await pb.collections.getOne("users");
  const schema = collection.schema || [];
  const hasRole = schema.some((f: any) => f.name === "role");

  if (hasRole) {
    console.log("Le champ 'role' existe déjà dans la collection users.");
    return;
  }

  // Ajout du champ role
  schema.push({
    name: "role",
    type: "select",
    required: true,
    options: {
      maxSelect: 1,
      values: ["student", "teacher"]
    }
  });

  await pb.collections.update(collection.id, {
    schema
  });
  console.log("Champ 'role' ajouté à la collection users.");
}

addRoleFieldToUsers().catch(console.error);
