"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import OptionsDropdown from "./options-dropdown";

export const columns: ColumnDef<LogRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return <p className="text-xs">{id}</p>;
    },
  },
  {
    accessorKey: "endpoint",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Endpoint" />;
    },
    cell: ({ row }) => {
      const endpoint: string = row.getValue("endpoint");
      return (
        <Link
          href={`/endpoints/${row.original.endpointId}`}
          className="text-sm border-b"
        >
          {endpoint}
        </Link>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      const type: "success" | "error" = row.getValue("type");
      const isError = type === "error";
      return (
        <Badge variant={isError ? "secondary" : "outline"}>
          {isError ? "error" : "success"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Message" />;
    },
    cell: ({ row }) => {
      const message: string = row.getValue("message");
      return (
        <p className="text-xs">
          {message.length > 50 ? `${message.slice(0, 50)}...` : message}
        </p>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date" />;
    },
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt");
      const date = new Date(createdAt);
      return (
        <p className="text-xs">
          {date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
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
      const id: string = row.getValue("id");
      return <OptionsDropdown id={id} />;
    },
    enableSorting: false,
  },
];
