import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

// Load environment variables
const dev = process.env.NODE_ENV !== "production";
loadEnvConfig("./", dev);

export default defineConfig({
  schema: "lib/db/schema.ts",
  out: "lib/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  verbose: true,
  strict: true,
});
