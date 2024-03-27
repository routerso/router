import { NextResponse } from "next/server";
import { db } from "@/lib/db/db";
import { endpoints } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { validations } from "@/lib/utils/validations";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const endpointResult = await db
      .select()
      .from(endpoints)
      // TODO: use a better way to parse and validate the id
      .where(eq(endpoints.incrementId, parseInt(params.id)));
    const endpoint = endpointResult[0];

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
      // create a log of the error
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
