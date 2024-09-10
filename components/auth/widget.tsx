import { auth } from "@/lib/auth";
import SignOut from "@/components/auth/signout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";

export default async function AccountWidget() {
  const session = await auth();
  if (!session) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          className="text-foreground w-full items-start px-2 hover:no-underline"
          variant="link"
        >
          <div className="flex flex-col items-start group">
            <p>Account Information</p>
            <p className="text-xs text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuLabel className="text-xs">
          {session.user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOut>
          <DropdownMenuItem className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
