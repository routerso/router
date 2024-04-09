"use client";

import { Endpoint } from "@/lib/db/db";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import OptionsDropdown from "./options-dropdown";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Endpoint>[] = [
  {
    accessorKey: "incrementId",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      const incrementId: string = row.getValue("incrementId");
      return <Link href={`/endpoints/${row.original.id}`}>{incrementId}</Link>;
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
        <Link
          className="underline flex items-center underline-offset-4 hover:opacity-70 transition-all"
          href={`/endpoints/${row.original.id}`}
        >
          {name}
          <Button variant="ghost" size="icon">
            <InfoCircledIcon />
          </Button>
        </Link>
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
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const date = new Date(createdAt);
      return (
        <p>
          {date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
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
