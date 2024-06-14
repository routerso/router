import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "./db";

async function main() {
  try {
    await migrate(db, { migrationsFolder: "lib/db/drizzle" });
    console.log("Migrations complete");
  } catch (error) {
    console.log("Migrations failed");
    console.error(error);
  }
}

main();
