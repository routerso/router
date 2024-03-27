import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

import {
  deleteEndpoint,
  disableEndpoint,
  enableEndpoint,
} from "@/lib/data/endpoints";

export default function OptionsDropdown({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) {
  const deleteEndpointWithId = deleteEndpoint.bind(null, id);
  const disableEndpointWithId = disableEndpoint.bind(null, id);
  const enableEndpointWithId = enableEndpoint.bind(null, id);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [showDisableAlert, setShowDisableAlert] = useState<boolean>(false);
  const [showEnableAlert, setShowEnableAlert] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md p-2">
          <MoreHorizontal />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="sr-only">Options</DropdownMenuLabel>
          <Link href={`/endpoints/${id}/edit`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          <DropdownMenuItem onClick={() => setShowDeleteAlert(true)}>
            Delete
          </DropdownMenuItem>
          {enabled ? (
            <DropdownMenuItem onClick={() => setShowDisableAlert(true)}>
              Disable
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={() => setShowEnableAlert(true)}>
              Enable
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will{" "}
              <span className="font-bold text-red-500">
                permanently delete this endpoint and all leads in it.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={deleteEndpointWithId}>
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Disable Alert */}
      <AlertDialog open={showDisableAlert} onOpenChange={setShowDisableAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable endpoint?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to disable this endpoint?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={disableEndpointWithId}>
              <AlertDialogAction type="submit">Disable</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Enable Alert */}
      <AlertDialog open={showEnableAlert} onOpenChange={setShowEnableAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enable endpoint?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to enable this endpoint?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={enableEndpointWithId}>
              <AlertDialogAction type="submit">Enable</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
