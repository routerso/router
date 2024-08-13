"use server";

import { revalidatePath } from "next/cache";
import { db, Endpoint } from "../db";
import { endpoints } from "../db/schema";
import { eq, desc, and } from "drizzle-orm";
import { getErrorMessage } from "@/lib/helpers/error-message";
import { authenticatedAction } from "./safe-action";
import { z } from "zod";

/**
 * Gets all endpoints for a user
 *
 * Protected by authenticatedAction wrapper
 */
export const getEndpoints = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const data = await db
      .select()
      .from(endpoints)
      .where(eq(endpoints.userId, userId))
      .orderBy(desc(endpoints.updatedAt));

    return data;
  }
);

/**
 * Gets a specific endpoint by id
 *
 * Protected by authenticatedAction wrapper
 */
export const getEndpointById = authenticatedAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { userId } }) => {
    const [data] = await db
      .select()
      .from(endpoints)
      .where(and(eq(endpoints.id, id), eq(endpoints.userId, userId)));
    return data;
  });

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
