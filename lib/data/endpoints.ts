"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { getErrorMessage } from "@/lib/helpers/error-message";

export async function getEndpoints(userId: string) {
  const data = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(endpoints.updatedAt));

  return data;
}

export async function getEndpointByIncrementId(incrementId: number) {
  const [data] = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.incrementId, incrementId));
  return data;
}

export async function getEndpointById(id: string) {
  const [data] = await db.select().from(endpoints).where(eq(endpoints.id, id));
  return data;
}

export async function deleteEndpoint(id: string) {
  try {
    await db.delete(endpoints).where(eq(endpoints.id, id));
    revalidatePath("/endpoints");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function disableEndpoint(id: string) {
  try {
    await db
      .update(endpoints)
      .set({ enabled: false, updatedAt: new Date() })
      .where(eq(endpoints.id, id));
    revalidatePath("/endpoints");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function enableEndpoint(id: string) {
  try {
    await db
      .update(endpoints)
      .set({ enabled: true, updatedAt: new Date() })
      .where(eq(endpoints.id, id));
    revalidatePath("/endpoints");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
