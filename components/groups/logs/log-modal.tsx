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
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="text-xs">
          {messageString.length > 50
            ? `${messageString.slice(0, 50)}...`
            : messageString}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log Details</AlertDialogTitle>
          <AlertDialogDescription>
            <pre>{messageString}</pre>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
