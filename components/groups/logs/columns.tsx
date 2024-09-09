"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import OptionsDropdown from "./options-dropdown";
import LogModal from "./log-modal";
import { Button } from "@/components/ui/button";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export const columns: ColumnDef<LogRow>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      const id: string = row.getValue("id");
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(`${id}`);
            toast.success("ID Copied");
          }}
        >
          {id}
        </Button>
      );
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
        <Button asChild variant="link" className="px-0" size="sm">
          <Link href={`/endpoints/${row.original.endpointId}`}>
            {endpoint} <InfoCircledIcon className="ml-2" />
          </Link>
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "postType",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Method" />;
    },
    cell: ({ row }) => {
      const postType: "http" | "form" = row.getValue("postType");
      const isForm = postType === "form";
      return (
        <Badge variant={isForm ? "secondary" : "outline"}>
          {isForm ? "Form" : "HTTP"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "message",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Message" />;
    },
    cell: ({ row }) => {
      const message: string = row.getValue("message");
      const type: "success" | "error" = row.getValue("type");
      const date: Date = row.getValue("createdAt");
      return <LogModal message={message} type={type} date={date} />;
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
