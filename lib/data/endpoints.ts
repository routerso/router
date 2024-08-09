"use server";

import { revalidatePath } from "next/cache";
import { db, Endpoint } from "../db";
import { endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { getErrorMessage } from "@/lib/helpers/error-message";

/**
 * Gets all endpoints for a user
 */
export async function getEndpoints(userId: string): Promise<Endpoint[]> {
  const data = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(endpoints.updatedAt));

  return data;
}

/**
 * Gets a specific endpoint by id
 */
export async function getEndpointById(id: string): Promise<Endpoint> {
  const [data] = await db.select().from(endpoints).where(eq(endpoints.id, id));
  return data;
}

/**
 * Deletes a specific endpoint by id
 */
export async function deleteEndpoint(id: string): Promise<
  | {
      error: string;
    }
  | undefined
> {
  try {
    await db.delete(endpoints).where(eq(endpoints.id, id));
    revalidatePath("/endpoints");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

/**
 * Disables a specific endpoint by id
 */
export async function disableEndpoint(id: string): Promise<
  | {
      error: string;
    }
  | undefined
> {
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

/**
 * Enables a specific endpoint by id
 */
export async function enableEndpoint(id: string): Promise<
  | {
      error: string;
    }
  | undefined
> {
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
