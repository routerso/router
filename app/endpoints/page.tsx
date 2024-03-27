import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import CreateForm from "@/components/groups/endpoints/create-form";
import { Separator } from "@/components/ui/separator";

const pageData = {
  name: "Endpoints",
  title: "Endpoints",
  description: "Create a new endpoint.",
};

export default async function Home() {
  const session = await useSession();
  if (!session) redirect("/login");

  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <Header title={pageData?.title}>{pageData?.description}</Header>
      <CreateForm />
      <Separator />
    </>
  );
}
