"use server";

import { db, Endpoint } from "../db/db";
import { endpoints } from "../db/schema";
import { eq } from "drizzle-orm";
import { getErrorMessage } from "../utils/error-message";

/**
 * getEndpoint
 * @param parsedId
 * @returns Promise of type Endpoint or null
 */

export async function getEndpoint(parsedId: number): Promise<Endpoint | null> {
  try {
    const [endpoint] = await db
      .select()
      .from(endpoints)
      .where(eq(endpoints.incrementId, parsedId));
    return endpoint;
  } catch (error: unknown) {
    console.log(getErrorMessage(error));
    return null;
  }
}
