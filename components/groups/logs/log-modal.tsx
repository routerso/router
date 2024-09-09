import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LogModal({
  message,
  date,
  type,
}: {
  message: LogMessage;
  date: Date;
  type: "success" | "error";
}) {
  const messageString = JSON.stringify(message, null, 2);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-xs">
          {messageString.length > 25
            ? `${messageString.slice(0, 25)}...`
            : messageString}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            Log Details{" "}
            {type === "success" ? (
              <Badge variant="outline">success</Badge>
            ) : (
              <Badge variant="secondary">error</Badge>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <p className="my-2">
              Occured at <span>{date.toUTCString()}</span>
            </p>
            <div className="text-xs p-6 border font-mono max-w-full bg-muted rounded-lg mt-4">
              {messageString}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {type === "success" && (
            <Button variant="link">
              <Link href={`/leads/${message.id}`}>See Lead</Link>
            </Button>
          )}
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
