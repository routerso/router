import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";

const pageData = {
  name: "Settings",
  title: "Settings",
  description: "Manage your Router.so account settings",
};

export default async function Page() {
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
