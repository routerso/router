import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";
import { HelpForm } from "./help-form";

const pageData = {
  name: "Support",
  title: "Support",
  description: "Get help with Router.so",
};

export default async function Page() {
  return (
    <>
      <Breadcrumbs pageName={pageData?.name} />
      <PageWrapper>
        <Header title={pageData?.title}>{pageData?.description}</Header>
        <div className="max-w-2xl">
          <HelpForm />
        </div>
      </PageWrapper>
    </>
  );
}
