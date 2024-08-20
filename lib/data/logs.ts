"use server";

import { logs, endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { authenticatedAction } from "./safe-action";
import { z } from "zod";

/**
 * Creates a log entry
 *
 * Helper function used in dynamic route for creating a log
 * User does not need to be authenticated for this to happen
 */
export async function createLog(
  type: "success" | "error",
  postType: LogPostType,
  message: string,
  endpointId: string
): Promise<void> {
  await db.insert(logs).values({
    type,
    postType,
    message:
      type === "success" ? { success: true, id: message } : { error: message },
    createdAt: new Date(),
    endpointId,
  });

  revalidatePath("/logs");
}

/**
 * Gets all logs for the user
 *
 * Protected by authenticatedAction wrapper
 */
export const getLogs = authenticatedAction.action(
  async ({ ctx: { userId } }) => {
    const logsData = await db
      .select()
      .from(logs)
      .leftJoin(endpoints, eq(logs.endpointId, endpoints.id))
      .where(eq(endpoints.userId, userId))
      .orderBy(desc(logs.createdAt));

    const data: LogRow[] = logsData.map((log) => ({
      id: log.log.id,
      type: log.log.type,
      postType: log.log.postType,
      message: log.log.message,
      createdAt: log.log.createdAt,
      endpointId: log.endpoint?.id || "",
      endpoint: log.endpoint?.name || "",
    }));

    return data;
  }
);

/**
 * Deletes a log
 *
 * Protected by authenticatedAction wrapper
 */
export const deleteLog = authenticatedAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { userId } }) => {
    const logWithEndpoint = await db
      .select({
        endpointUserId: endpoints.userId,
      })
      .from(logs)
      .innerJoin(endpoints, eq(logs.endpointId, endpoints.id))
      .where(eq(logs.id, id));

    if (
      !logWithEndpoint.length ||
      logWithEndpoint[0].endpointUserId !== userId
    ) {
      throw new Error("You are not authorized for this action.");
    }

    await db.delete(logs).where(eq(logs.id, id));
    revalidatePath("/logs");
  });
