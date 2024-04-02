"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db/db";
import { endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export async function getEndpoints(userId: string) {
  const data = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(endpoints.updatedAt));

  return data;
}

export async function getEndpointById(id: string) {
  const data = await db.select().from(endpoints).where(eq(endpoints.id, id));
  return data[0];
}

export async function deleteEndpoint(id: string) {
  await db.delete(endpoints).where(eq(endpoints.id, id));
  revalidatePath("/endpoints");
}

export async function disableEndpoint(id: string) {
  await db
    .update(endpoints)
    .set({ enabled: false, updatedAt: new Date() })
    .where(eq(endpoints.id, id));
  revalidatePath("/endpoints");
}

export async function enableEndpoint(id: string) {
  await db
    .update(endpoints)
    .set({ enabled: true, updatedAt: new Date() })
    .where(eq(endpoints.id, id));
  revalidatePath("/endpoints");
}
