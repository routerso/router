import { loadEnvConfig } from "@next/env";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from ".";

async function main() {
  try {
    const dev = process.env.NODE_ENV !== "production";
    loadEnvConfig("./", dev);

    await migrate(db, { migrationsFolder: "lib/db/drizzle" });
    console.log("Migrations complete");
  } catch (error) {
    console.log("Migrations failed");
    console.error(error);
  }
}

main();
