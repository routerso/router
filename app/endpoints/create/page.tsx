import { useSession } from "@/lib/auth/use-session";
import { redirect } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/parts/header";
import CreateForm from "@/components/groups/endpoints/create-form";
import { Home } from "lucide-react";

const pageData = {
  name: "New Endpoint",
  title: "Create an Endpoint",
  description: "Create a new endpoint.",
};

export default async function Page() {
  const session = await useSession();
  if (!session) redirect("/login");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home size={20} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/endpoints">Endpoints</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="px-2 py-1 bg-accent rounded-sm">
              {pageData?.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Header title={pageData?.title}>{pageData?.description}</Header>
      <CreateForm />
    </>
  );
}
