"use server";

import { leads, endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db/db";

export async function getLeads(userId: string) {
  const leadsData = await db
    .select()
    .from(leads)
    .leftJoin(endpoints, eq(leads.endpointId, endpoints.id))
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(leads.createdAt));

  const data: LeadRow[] = leadsData.map((lead) => ({
    id: lead.lead.id,
    data: lead.lead.data,
    schema: lead.endpoint?.schema || {},
    createdAt: lead.lead.createdAt,
    updatedAt: lead.lead.updatedAt,
    endpointId: lead.endpoint?.id || "",
    endpoint: lead.endpoint?.name || "",
  }));

  return data;
}
