import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getLeads } from "@/lib/data/leads";
import { DataTable } from "@/components/parts/data-table";
import { columns } from "@/components/groups/leads/columns";

const pageData = {
  name: "Leads",
  title: "Leads",
  description: "Breakdown of all your leads",
};

export default async function Home() {
  const session = await useSession();
  if (!session) redirect("/login");

  const leads = await getLeads(session?.user?.id);

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <Header title={pageData?.title}>{pageData?.description}</Header>
      <DataTable columns={columns} data={leads} filterColumn="endpoint" />
    </>
  );
}
