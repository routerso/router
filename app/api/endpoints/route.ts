import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { endpoints } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data: EndpointPOSTPayload = await request.json();
    const token = randomBytes(32).toString("hex");

    const createdEndpoint = await db
      .insert(endpoints)
      .values({
        userId: session?.user?.id,
        name: data.name,
        schema: data.schema,
        enabled: data.enabled,
        formEnabled: data.formEnabled,
        successUrl: data.successUrl,
        failUrl: data.failUrl,
        webhookEnabled: data.webhookEnabled,
        webhook: data.webhook,
        token: token,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({ endpointId: endpoints.id });

    revalidatePath("/endpoints");

    return NextResponse.json({ id: createdEndpoint[0].endpointId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data: EndpointPUTPayload = await request.json();

    if (!data.id)
      return NextResponse.json({ error: "No ID provided" }, { status: 500 });

    const createdEndpoint = await db
      .update(endpoints)
      .set({
        name: data.name,
        schema: data.schema,
        enabled: data.enabled,
        formEnabled: data.formEnabled,
        successUrl: data.successUrl,
        failUrl: data.failUrl,
        webhookEnabled: data.webhookEnabled,
        webhook: data.webhook,
        updatedAt: new Date(),
      })
      .where(eq(endpoints.id, data.id))
      .returning({ endpointId: endpoints.id });

    revalidatePath("/endpoints");

    return NextResponse.json({ id: createdEndpoint[0].endpointId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
