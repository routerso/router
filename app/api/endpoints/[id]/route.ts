import { NextResponse } from "next/server";
import {
  convertToCorrectTypes,
  generateDynamicSchema,
  validateAndParseData,
} from "@/lib/validation";
import { headers } from "next/headers";
import { getEndpointByIncrementId } from "@/lib/data/endpoints";
import { createLead } from "@/lib/data/leads";
import { createLog } from "@/lib/data/logs";
import { getErrorMessage } from "@/lib/helpers/error-message";
import { constructBodyFromURLParameters } from "@/lib/helpers/construct-body";

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

    const endpoint = await getEndpointByIncrementId(parsedId);

    if (!endpoint)
      return NextResponse.json(
        { message: "Endpoint not found." },
        { status: 404 }
      );

    if (endpoint.token !== token) {
      return NextResponse.json(
        { message: "Unauthorized. Invalid token provided." },
        { status: 401 }
      );
    }

    const schema = endpoint?.schema as GeneralSchema[];
    const dynamicSchema = generateDynamicSchema(schema);
    const parsedData = validateAndParseData(dynamicSchema, data);

    if (!parsedData.success) {
      createLog(
        "error",
        "http",
        JSON.stringify(parsedData.error.format()),
        endpoint.id
      );

      return NextResponse.json(
        { errors: parsedData.error.format() },
        { status: 400 }
      );
    }

    const leadId = await createLead(endpoint.id, parsedData.data);

    await createLog("success", "http", leadId, endpoint.id);

    return NextResponse.json({ success: true, id: leadId });
  } catch (error: unknown) {
    await createLog("error", "http", getErrorMessage(error), params.id);

    console.error(error);

    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const referer = headersList.get("referer");
    const { searchParams } = new URL(request.url);

    const parsedId = parseInt(params.id);
    if (isNaN(parsedId)) {
      return NextResponse.json(
        { message: "Invalid ID provided." },
        { status: 400 }
      );
    }

    const endpoint = await getEndpointByIncrementId(parsedId);

    if (!endpoint) {
      return NextResponse.json(
        { message: "Endpoint not found." },
        { status: 404 }
      );
    }

    const rawData = constructBodyFromURLParameters(searchParams);
    const schema = endpoint?.schema as GeneralSchema[];
    const data = convertToCorrectTypes(rawData, schema);
    const dynamicSchema = generateDynamicSchema(schema);
    const parsedData = validateAndParseData(dynamicSchema, data);

    if (!parsedData.success) {
      createLog(
        "error",
        "http",
        JSON.stringify(parsedData.error.format()),
        endpoint.id
      );

      return NextResponse.redirect(
        new URL(endpoint?.failUrl || referer || "/fail")
      );
    }

    const leadId = await createLead(endpoint.id, parsedData.data);

    await createLog("success", "http", leadId, endpoint.id);

    return NextResponse.redirect(
      new URL(endpoint?.successUrl || referer || "/success")
    );
  } catch (error: unknown) {
    await createLog("error", "http", getErrorMessage(error), params.id);

    console.error(error);

    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
