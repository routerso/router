import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/parts/breadcrumbs";
import { PageWrapper } from "@/components/parts/page-wrapper";

export default function Loading() {
  return (
    <>
      <Breadcrumbs isLoading={true} />
      <PageWrapper>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </PageWrapper>
    </>
  );
}
