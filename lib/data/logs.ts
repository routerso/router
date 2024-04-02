import { logs, endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db/db";

export async function getLogs(userId: string) {
  const logsData = await db
    .select()
    .from(logs)
    .leftJoin(endpoints, eq(logs.endpointId, endpoints.id))
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(endpoints.updatedAt));

  const data: LogRow[] = logsData.map((log) => ({
    id: log.log.id,
    type: log.log.type,
    message: log.log.message,
    createdAt: log.log.createdAt,
    endpointId: log.endpoint?.id || "",
    endpoint: log.endpoint?.name || "",
  }));

  return data;
}
