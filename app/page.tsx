import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { Chart } from "@/components/dashboard/chart";
import { PageWrapper } from "@/components/parts/page-wrapper";
import Link from "next/link";
import { getLeadAndErrorCounts } from "@/lib/data/dashboard";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getLeads } from "@/lib/data/leads";
import { getEndpoints } from "@/lib/data/endpoints";
import { DataTable } from "@/components/groups/leads/data-table";
import { columns } from "@/components/groups/leads/columns";

const pageData = {
  name: "Dashboard",
  title: "Dashboard",
  description: "Snapshot of your endpoints and leads",
};

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");
  const chartData = await getLeadAndErrorCounts(session.user.id);
  const leads = await getLeads(session.user.id);
  const endpoints = await getEndpoints(session.user.id);
  const recentLeads = leads.slice(0, 5); // Get the 5 most recent leads

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <Chart chartData={chartData} />
        <Links />
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Leads</h2>
          <DataTable
            columns={columns}
            data={recentLeads}
            endpoints={endpoints}
          />
        </div>
      </PageWrapper>
    </>
  );
}

const navLinks = [
  {
    name: "Endpoints",
    description: "Create and Manage Router.so Endpoints",
    href: "/endpoints",
  },
  {
    name: "Leads",
    description: "View Lead data and Form Submissions",
    href: "/leads",
  },
  {
    name: "Logs",
    description: "Monitor your API usage and errors",
    href: "/logs",
  },
  {
    name: "Settings",
    description: "Manage your account settings",
    href: "/settings",
  },
];

const Links = () => {
  return (
    <div className="grid grid-cols-2 gap-4 my-4">
      {navLinks.map((link) => (
        <Link
          className="bg-background p-4 rounded-lg border hover:bg-accent/75 transition-all"
          key={link.href}
          href={link.href}
        >
          {link.name}
          <p className="text-sm text-gray-500">{link.description}</p>
        </Link>
      ))}
    </div>
  );
};
