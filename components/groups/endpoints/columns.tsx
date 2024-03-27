"use client";

import { Endpoint } from "@/lib/db/db";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/header";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Endpoint>[] = [
  {
    accessorKey: "ID",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      const incrementId: string = row.getValue("incrementId");
      return (
        <Button asChild variant="outline" size="icon">
          <Link href={`/endpoints/${row.original.id}`}>{incrementId}</Link>
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
        <Link
          className="underline underline-offset-4 decoration-violet-500 hover:opacity-70 transition-all"
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
      return <Badge variant="secondary">{enabled}</Badge>;
    },
  },
  {
    accessorKey: "webhookEnabled",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Webhook Enabled" />;
    },
    cell: ({ row }) => {
      const enabled: boolean = row.getValue("webhookEnabled");
      return <Badge variant="secondary">{enabled}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Date Created" />;
    },
  },
  //   {
  //     accessorKey: "contactUrl",
  //     header: ({ column }) => {
  //       return <DataTableColumnHeader column={column} title="Website" />;
  //     },
  //     cell: ({ row }) => {
  //       const link: string = row.getValue("contactUrl");
  //       return (
  //         <Button asChild variant="outline" size="icon">
  //           <Link href={link}>
  //             <ExternalLink size={20} />
  //           </Link>
  //         </Button>
  //       );
  //     },
  //     enableSorting: false,
  //   },
  // {
  //   accessorKey: "contactAbout",
  //   header: "About",
  // },
  // TODO: add domain & how many emails are sent
  // TODO: eventually add how many replies to emails
];
