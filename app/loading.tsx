import { Loader2 } from "lucide-react";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { Header } from "@/components/parts/header";
import { PageWrapper } from "@/components/parts/page-wrapper";

export default function Loading() {
  return (
    <>
      <Breadcrumbs pageName="Loading" />
      <PageWrapper>
        <Header title="Loading">Please wait while the content loads</Header>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </PageWrapper>
    </>
  );
}
