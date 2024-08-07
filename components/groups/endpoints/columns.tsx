"use client";

import { Endpoint } from "@/lib/db";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import OptionsDropdown from "./options-dropdown";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const columns: ColumnDef<Endpoint>[] = [
  {
    accessorKey: "incrementId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      const incrementId: string = row.getValue("incrementId");
      return (
        <Link href={`/endpoints/${row.original.id}`}>
          <span className="text-muted-foreground text-sm">#</span> {incrementId}
        </Link>
      );
    },
  },
  {
    accessorKey: "endpointUrl",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Endpoint URL" />;
    },
    cell: ({ row }) => {
      const id: string = row.getValue("incrementId");
      return (
        <Button
          variant="outline"
          className="text-sm"
          onClick={() => {
            navigator.clipboard.writeText(
              `https://app.router.so/api/endpoints/${id}`
            );
            toast.success("Endpoint Copied");
          }}
        >
          {`https://app.router.so/api/endpoints/${id}`}
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return (
        <Button asChild variant="link" className="text-sm px-0">
          <Link href={`/endpoints/${row.original.id}`}>
            {name} <InfoCircledIcon className="ml-2" />
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Posting" />;
    },
    cell: ({ row }) => {
      const enabled: boolean = row.getValue("enabled");
      return (
        <Badge variant={enabled ? "outline" : "secondary"}>
          {enabled ? "enabled" : "disabled"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "webhookEnabled",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Webhook" />;
    },
    cell: ({ row }) => {
      const enabled: boolean = row.getValue("webhookEnabled");
      return (
        <Badge variant={enabled ? "outline" : "secondary"}>
          {enabled ? "enabled" : "disabled"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "options",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Options" />;
    },
    cell: ({ row }) => {
      const id: string = row.original.id;
      const enabled: boolean = row.getValue("enabled");
      return <OptionsDropdown id={id} enabled={enabled} />;
    },
    enableSorting: false,
  },
];
