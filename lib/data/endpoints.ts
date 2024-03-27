"use server";

import { db } from "../db/db";
import { endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export async function getEndpoints(userId: string) {
  const data = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(endpoints.createdAt));

  return data;
}
