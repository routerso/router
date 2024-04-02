import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { endpoints, logs, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { validations } from "@/lib/utils/validations";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const authorization = headersList.get("authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Unauthorized. No valid bearer token provided." },
        { status: 401 }
      );
    }

    const token = authorization.split(" ")[1];

    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { message: "Invalid ID provided." },
        { status: 400 }
      );
    }

    const data = await request.json();

    const endpointResult = await db
      .select()
      .from(endpoints)
      .where(eq(endpoints.incrementId, parsedId));
    const endpoint = endpointResult[0];

    if (endpoint.token !== token) {
      return NextResponse.json(
        { message: "Unauthorized. Invalid token provided." },
        { status: 401 }
      );
    }

    const schema = endpoint?.schema as GeneralSchema[];

    // TODO: make this into its own function
    const dynamicSchema = schema.reduce<z.ZodRawShape>(
      (acc, { key, value }) => {
        const validation = validations[value];
        if (validation) {
          acc[key as keyof SchemaToZodMap] = validation;
        }
        return acc;
      },
      {}
    );

    const EndpointZodSchema = z.object(dynamicSchema);

    Object.keys(dynamicSchema).forEach((key) => {
      const validation = dynamicSchema[key];
      console.log(`Field: ${key}, Validation: ${validation._def.typeName}`);
    });

    const parsedData = EndpointZodSchema.safeParse(data);

    if (!parsedData.success) {
      await db.insert(logs).values({
        type: "error",
        message: JSON.stringify(parsedData.error.format()),
        createdAt: new Date(),
        endpointId: endpoint.id,
      });
      revalidatePath("/logs");
      return NextResponse.json(
        { errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    const insertedLead = await db
      .insert(leads)
      .values({
        data: parsedData.data,
        createdAt: new Date(),
        updatedAt: new Date(),
        endpointId: endpoint.id,
      })
      .returning({ insertedId: leads.id });

    await db.insert(logs).values({
      type: "success",
      message: { success: insertedLead[0].insertedId },
      createdAt: new Date(),
      endpointId: endpoint.id,
    });
    revalidatePath("/logs");

    return NextResponse.json({ id: insertedLead[0].insertedId });
  } catch (error) {
    // create a log of the error
    await db.insert(logs).values({
      type: "error",
      message: JSON.stringify(error),
      createdAt: new Date(),
      endpointId: params.id,
    });
    revalidatePath("/logs");
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(request.redirect);
  const { searchParams } = new URL(request.url);
  console.log(searchParams.toString());
  console.log(params.id);
  return NextResponse.json({ message: "GET request" });
}
