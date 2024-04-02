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
      <AlertDialogTrigger>
        <p className="text-xs underline underline-offset-4 hover:opacity-70 transition-all">
          {messageString.length > 25
            ? `${messageString.slice(0, 25)}...`
            : messageString}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Details</AlertDialogTitle>
          <AlertDialogDescription>
            {type === "success" ? (
              <Badge variant="outline">success</Badge>
            ) : (
              <Badge variant="secondary">error</Badge>
            )}
            <p>occured at {date.toISOString()}</p>
            <pre className="text-xs">{messageString}</pre>
            {type === "success" && (
              <Link href={`/leads/${message.success}`}>see lead</Link>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
