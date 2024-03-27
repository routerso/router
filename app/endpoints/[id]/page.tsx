import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getEndpointById } from "@/lib/data/endpoints";
import SchemaTable from "@/components/groups/endpoints/schema-table";
import * as Craft from "@/components/craft/layout";
import { Separator } from "@/components/ui/separator";

const pageData = {
  title: "Endpoint",
  description: "Info for endpoint",
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await useSession();
  if (!session) redirect("/login");

  const endpoint = await getEndpointById(params?.id);
  const schema = endpoint?.schema as GeneralSchema[];

  const url = `https//router.so/api/${endpoint?.incrementId}`;
  // TODO: generate API key when an endpoint is created
  const apiKey = "8237lkasdf89789sadf";

  //  ---------- TODO: make this into its own function ----------
  const formattedSchema = new Object() as { [key: string]: ValidationType };
  schema.forEach((field) => {
    formattedSchema[field.key] = field.value;
  });
  const schemaString = JSON.stringify(formattedSchema, null, 2);
  //  ---------------------------------------------------------

  return (
    <>
      <Breadcrumbs pageName={endpoint?.name} />
      <Header
        title={`${pageData?.title} : ${endpoint?.name}`}
      >{`${pageData?.description} : ${endpoint?.name}`}</Header>
      <Separator />
      <SchemaTable schema={schema} />
      <Separator />
      <Craft.Article>
        <h2>Posting Instructions</h2>
        <p>
          Use the following URL to post to{" "}
          <span className="italic">{endpoint?.name}</span>:
        </p>
        <pre>{url}</pre>
        <Separator />
        <h3>Post via API POST Request</h3>
        <p>
          Send a POST request to the provided URL with the following body
          payload structure:
        </p>
        <pre>{schemaString}</pre>
        <p>Make sure to include the following API key as a header:</p>
        <pre>{endpoint?.token}</pre>
        <p>A sample CURL request would look like the following:</p>
        <pre>
          {`curl -X POST ${url} \\`}
          <br />
          {`--header "Content-Type: application/json" \\`}
          <br />
          {`--header "Authorization: Bearer ${endpoint?.token}" \\`}
          <br />
          {`--data '${schemaString}'`}
        </pre>
        <Separator />
        <h3>Post via HTML Form</h3>
      </Craft.Article>
    </>
  );
}
