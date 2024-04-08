import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import PageWrapper from "@/components/page-wrapper";

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
        <div className="grid gap-4 grid-rows-[500px,1fr]">Coming soon ...</div>
      </PageWrapper>
    </>
  );
}
