import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";

const pageData = {
  name: "Logs",
  title: "Logs",
  description: "Logs of all your events",
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
