import "@/lib/db/config";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users } from "./schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const db = drizzle(sql);
