import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { DataTable } from "@/components/parts/data-table";
import { columns } from "@/components/groups/endpoints/columns";
import { getEndpoints } from "@/lib/data/endpoints";

const pageData = {
  name: "Endpoints",
  title: "Endpoints",
  description: "All your existing endpoints.",
};

export default async function Page() {
  const session = await useSession();
  if (!session) redirect("/login");

  const endpoints = await getEndpoints(session.user.id);
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <Header title={pageData?.title}>{pageData?.description}</Header>
      <DataTable columns={columns} data={endpoints} createObject={true} />
    </>
  );
}
