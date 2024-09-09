"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { CircleCheck, CircleX, Webhook, CodeXml } from "lucide-react";
import { Endpoint } from "@/lib/db";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  endpoints: Endpoint[];
}

const logTypeFilter = [
  {
    value: "success",
    label: "Success",
    icon: CircleCheck,
  },
  {
    value: "error",
    label: "Error",
    icon: CircleX,
  },
];

const postTypeFilter = [
  {
    value: "http",
    label: "HTTP",
    icon: Webhook,
  },
  {
    value: "form",
    label: "Form",
    icon: CodeXml,
  },
];

export function DataTableToolbar<TData>({
  table,
  endpoints,
}: DataTableToolbarProps<TData>) {
  const endpointFilters = endpoints.map((endpoint) => ({
    value: endpoint.name,
    label: endpoint.name,
    icon: undefined,
  }));

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter leads by ID..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Type"
            options={logTypeFilter}
          />
        )}
        {table.getColumn("postType") && (
          <DataTableFacetedFilter
            column={table.getColumn("postType")}
            title="Method"
            options={postTypeFilter}
          />
        )}
        {table.getColumn("endpoint") && (
          <DataTableFacetedFilter
            column={table.getColumn("endpoint")}
            title="Endpoints"
            options={endpointFilters}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
