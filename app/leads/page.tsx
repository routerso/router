import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getLeads } from "@/lib/data/leads";
import { getEndpoints } from "@/lib/data/endpoints";
import { DataTable } from "@/components/groups/leads/data-table";
import { columns } from "@/components/groups/leads/columns";
import { PageWrapper } from "@/components/parts/page-wrapper";

const pageData = {
  name: "Leads",
  title: "Leads",
  description: "Breakdown of all your leads",
};

export default async function Page() {
  // fetch leads
  const leads = await getLeads();
  const { data: leadsData, serverError: leadsServerError } = leads || {};

  // fetch endpoints
  const endpoints = await getEndpoints();
  const { data: endpointsData, serverError: endpointsServerError } =
    endpoints || {};

  // check for errors
  if (
    !leadsData ||
    !endpointsData ||
    leadsServerError ||
    endpointsServerError
  ) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <DataTable
          columns={columns}
          data={leadsData}
          endpoints={endpointsData}
        />
      </PageWrapper>
    </>
  );
}
