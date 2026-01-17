import { pb } from "../services/pocketbase/client";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function showUserCollectionSchema() {
  await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL!, process.env.PB_ADMIN_PASSWORD!);
  const collection = await pb.collections.getOne("users");
  console.log("Objet complet retourné par pb.collections.getOne('users') :");
  console.log(JSON.stringify(collection, null, 2));
}

showUserCollectionSchema().catch(console.error);
