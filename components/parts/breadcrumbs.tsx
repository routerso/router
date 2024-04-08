import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Home } from "lucide-react";

export const Breadcrumbs = ({ pageName }: { pageName?: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage className="px-2 py-1 bg-accent rounded-sm">
          <BreadcrumbLink>{pageName || "Dashboard"}</BreadcrumbLink>
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
