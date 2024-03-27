import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getEndpointById } from "@/lib/data/endpoints";
import SchemaTable from "@/components/groups/endpoints/schema-table";

const pageData = {
  title: "Endpoint",
  description: "Info for endpoint",
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await useSession();
  if (!session) redirect("/login");

  const endpoint = await getEndpointById(params?.id);
  const schema = endpoint?.schema as GeneralSchema[];

  return (
    <>
      <Breadcrumbs pageName={endpoint?.name} />
      <Header
        title={`${pageData?.title} : ${endpoint?.name}`}
      >{`${pageData?.description} : ${endpoint?.name}`}</Header>
      <SchemaTable schema={schema} />
    </>
  );
}
