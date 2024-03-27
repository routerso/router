import { NextResponse } from "next/server";
import { useSession } from "@/lib/auth/use-session";
import { db } from "@/lib/db/db";
import { endpoints } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const session = await useSession();
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data: EndpointPayload = await request.json();

    const createdEndpoint = await db
      .insert(endpoints)
      .values({
        userId: session?.user?.id,
        name: data.name,
        schema: data.schema,
        enabled: data.enabled,
        webhookEnabled: data.webhookEnabled,
        webhook: data.webhook,
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
