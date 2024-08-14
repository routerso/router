import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { getLogs } from "@/lib/data/logs";
import { getEndpoints } from "@/lib/data/endpoints";
import { DataTable } from "@/components/groups/logs/data-table";
import { columns } from "@/components/groups/logs/columns";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { notFound } from "next/navigation";

const pageData = {
  name: "Logs",
  title: "Logs",
  description: "Logs of all your events",
};

export default async function Page() {
  // fetch logs
  const logs = await getLogs();
  const { data: logsData, serverError: logsServerError } = logs || {};

  // fetch endpoints
  const endpoints = await getEndpoints();
  const { data: endpointsData, serverError: endpointsServerError } =
    endpoints || {};

  // check for errors
  if (!logsData || !endpointsData || logsServerError || endpointsServerError) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <DataTable
          columns={columns}
          data={logsData}
          endpoints={endpointsData}
        />
      </PageWrapper>
    </>
  );
}
