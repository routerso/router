import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { endpoints, logs, leads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { validations } from "@/lib/utils/validations";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { convertToCorrectTypes } from "@/lib/utils/convert-type";
import { getEndpoint } from "@/lib/data/api";
import { createDynamicSchema } from "@/lib/utils/create-schema";

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

    const endpoint = await getEndpoint(parsedId);

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint not found." },
        { status: 404 }
      );
    }

    if (endpoint.token !== token) {
      return NextResponse.json(
        { message: "Unauthorized. Invalid token provided." },
        { status: 401 }
      );
    }

    const schema = endpoint?.schema as GeneralSchema[];

    const dynamicSchema = createDynamicSchema(schema);
    const EndpointZodSchema = z.object(dynamicSchema);

    Object.keys(dynamicSchema).forEach((key) => {
      const validation = dynamicSchema[key];
      console.log(`Field: ${key}, Validation: ${validation._def.typeName}`);
    });

    const parsedData = EndpointZodSchema.safeParse(data);

    if (!parsedData.success) {
      await db.insert(logs).values({
        type: "error",
        postType: "http",
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
      postType: "http",
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
      postType: "http",
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
  const headersList = headers();
  const referer = headersList.get("referer");
  // get URL search parameters
  const { searchParams } = new URL(request.url);

  // parse the ID from the URL and return a 400 if it's not a number
  const parsedId = parseInt(params.id);
  if (isNaN(parsedId)) {
    return NextResponse.json(
      { message: "Invalid ID provided." },
      { status: 400 }
    );
  }

  // get the endpoint from the database
  const endpointResult = await db
    .select()
    .from(endpoints)
    .where(eq(endpoints.incrementId, parsedId));
  const endpoint = endpointResult[0];

  // if the endpoint doesn't exist, return a 404
  if (!endpoint) {
    return NextResponse.json(
      { message: "Endpoint not found." },
      { status: 404 }
    );
  }

  // get the data from the URL search parameters
  const rawData: any = {};
  for (const [key, value] of searchParams) {
    rawData[key] = value;
  }

  // get the schema from the endpoint
  const schema = endpoint?.schema as GeneralSchema[];

  // convert the data to the correct types
  const data = convertToCorrectTypes(rawData, schema);

  // TODO: make this into its own function
  const dynamicSchema = schema.reduce<z.ZodRawShape>((acc, { key, value }) => {
    const validation = validations[value];
    if (validation) {
      acc[key as keyof SchemaToZodMap] = validation;
    }
    return acc;
  }, {});

  // create a Zod schema from the dynamic schema
  const EndpointZodSchema = z.object(dynamicSchema);

  // validate the data against the schema
  Object.keys(dynamicSchema).forEach((key) => {
    const validation = dynamicSchema[key];
    console.log(`Field: ${key}, Validation: ${validation._def.typeName}`);
  });

  // if the data doesn't match the schema, return a 400
  const parsedData = EndpointZodSchema.safeParse(data);
  if (!parsedData.success) {
    await db.insert(logs).values({
      type: "error",
      postType: "form",
      message: JSON.stringify(parsedData.error.format()),
      createdAt: new Date(),
      endpointId: endpoint.id,
    });
    revalidatePath("/logs");
    return NextResponse.redirect(
      new URL(endpoint?.failUrl || referer || "/fail")
    );
  }

  // insert the lead into the database
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
    postType: "form",
    message: { success: insertedLead[0].insertedId },
    createdAt: new Date(),
    endpointId: endpoint.id,
  });
  revalidatePath("/logs");

  return NextResponse.redirect(
    new URL(endpoint?.successUrl || referer || "/success")
  );
}
