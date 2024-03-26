import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";

const pageData = {
  name: "Leads",
  title: "Leads",
  description: "Breakdown of all your leads",
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <Header title={pageData?.title}>{pageData?.description}</Header>
      <div className="grid gap-4 grid-rows-[500px,1fr]">
        {pageData?.description}
      </div>
    </>
  );
}
