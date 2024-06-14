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

import { deleteLog } from "@/lib/data/logs";
import { createClientAction } from "@/lib/utils/client-action";

export default function OptionsDropdown({ id }: { id: string }) {
  const deleteLogWithId = deleteLog.bind(null, id);
  const deleteAction = createClientAction(deleteLogWithId);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md p-2">
          <MoreHorizontal />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="sr-only">Options</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowDeleteAlert(true)}>
            Delete
          </DropdownMenuItem>
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
                permanently delete this log.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={deleteAction}>
              <AlertDialogAction type="submit">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
