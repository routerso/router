"use server";

import { leads, endpoints } from "../db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, Lead } from "../db";
import { getErrorMessage } from "@/lib/helpers/error-message";

/**
 * Creates a new lead in the database
 */
export async function createLead(
  endpointId: string,
  data: {
    [x: string]: any;
  }
): Promise<string> {
  const [{ leadId }] = await db
    .insert(leads)
    .values({
      data,
      createdAt: new Date(),
      updatedAt: new Date(),
      endpointId: endpointId,
    })
    .returning({ leadId: leads.id });

  return leadId;
}

/**
 * Gets all leads for a user
 */
export async function getLeads(userId: string): Promise<LeadRow[]> {
  const leadsData = await db
    .select()
    .from(leads)
    .leftJoin(endpoints, eq(leads.endpointId, endpoints.id))
    .where(eq(endpoints.userId, userId))
    .orderBy(desc(leads.createdAt));

  const data: LeadRow[] = leadsData.map((lead) => ({
    id: lead.lead.id,
    data: lead.lead.data,
    schema: lead.endpoint?.schema || [],
    createdAt: lead.lead.createdAt,
    updatedAt: lead.lead.updatedAt,
    endpointId: lead.endpoint?.id as string,
    endpoint: lead.endpoint?.name || undefined,
  }));

  return data;
}

/**
 * Get lead data for one specific lead
 */
export async function getLeadData(id: string): Promise<Lead> {
  const leadData = await db.select().from(leads).where(eq(leads.id, id));
  return leadData[0];
}

/**
 * Get all leads by an endpoint id
 */
export async function getLeadsByEndpoint(id: string): Promise<{
  leadData: Lead[];
  schema: {
    key: string;
    value: ValidationType;
  }[];
}> {
  const leadData = await db
    .select()
    .from(leads)
    .where(eq(leads.endpointId, id));

  const [{ schema }] = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.id, id));

  return { leadData, schema };
}

/**
 * Delete a lead by id
 */
export async function deleteLead(id: string): Promise<
  | {
      error: string;
    }
  | undefined
> {
  try {
    await db.delete(leads).where(eq(leads.id, id));
    revalidatePath("/leads");
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
