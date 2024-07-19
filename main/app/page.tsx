import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { Chart } from "@/components/dashboard/chart";
import { PageWrapper } from "@/components/parts/page-wrapper";

import Link from "next/link";
import { desc } from "drizzle-orm";

const pageData = {
  name: "Dashboard",
  title: "Dashboard",
  description: "Snapshot of your endpoints and leads",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <Chart />
        <Links />
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
