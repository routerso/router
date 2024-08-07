import { NextResponse } from "next/server";
import { useSession } from "@/lib/auth/use-session";
import { db } from "@/lib/db";
import { endpoints } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const session = await useSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data: EndpointPayload = await request.json();
    const token = randomBytes(64).toString("hex");

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
