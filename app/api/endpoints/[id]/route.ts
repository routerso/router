import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { endpoints, logs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { validations } from "@/lib/utils/validations";
import { headers } from "next/headers";

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
      });
      return NextResponse.json(
        { errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    console.log(JSON.stringify(parsedData));

    // create a log of the success
    return NextResponse.json({ id: params.id });
  } catch (error) {
    // create a log of the error
    console.error(error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
