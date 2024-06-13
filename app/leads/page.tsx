import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getLeads } from "@/lib/data/leads";
import { getEndpoints } from "@/lib/data/endpoints";
import { DataTable } from "@/components/groups/leads/data-table";
import { columns } from "@/components/groups/leads/columns";
import PageWrapper from "@/components/page-wrapper";

const pageData = {
  name: "Leads",
  title: "Leads",
  description: "Breakdown of all your leads",
};

export default async function Page() {
  const session = await useSession();
  if (!session) redirect("/login");

  const leads = await getLeads(session?.user?.id);
  const endpoints = await getEndpoints(session?.user?.id);

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <DataTable columns={columns} data={leads} endpoints={endpoints} />
      </PageWrapper>
    </>
  );
}
