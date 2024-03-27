"use client";

import { Endpoint } from "@/lib/db/db";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
          className="underline underline-offset-4 hover:opacity-70 transition-all"
          href={`/endpoints/${row.original.id}`}
        >
          {name}
        </Link>
      );
    },
  },
  {
    accessorKey: "enabled",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Enabled" />;
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
      return <DataTableColumnHeader column={column} title="Webhook Enabled" />;
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
];
