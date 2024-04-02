import "@/lib/db/config";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { users, endpoints, logs } from "./schema";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export type Endpoint = InferSelectModel<typeof endpoints>;
export type NewEndpoint = InferInsertModel<typeof endpoints>;

export type Log = InferSelectModel<typeof logs>;
export type NewLog = InferInsertModel<typeof logs>;

export const db = drizzle(sql);
