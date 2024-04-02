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

export default function LogModal({ message }: { message: string }) {
  const messageString = JSON.stringify(message, null, 2);
  const test = JSON.parse(messageString);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="text-xs">
          {message.length > 50 ? `${message.slice(0, 50)}...` : message}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Details</AlertDialogTitle>
          <AlertDialogDescription>
            <pre>{message}</pre>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
