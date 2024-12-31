import SignOut from "./signout";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { auth } from "@/lib/auth";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

interface AccountWidgetProps {
  plan?: "free" | "lite" | "pro" | "business" | "enterprise";
}

export default async function AccountWidget({ plan }: AccountWidgetProps) {
  const session = await auth();
  if (!session) return;

  const showUpgrade = plan === "free" || plan === "lite";

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
        {showUpgrade && (
          <>
            <DropdownMenuItem asChild className="p-0">
              <Link
                href="/upgrade"
                className="w-full p-2 flex items-center gap-2 text-green-500 hover:bg-green-500/15 hover:text-green-500"
              >
                <ArrowUp className="h-4 w-4" />
                <div className="grid gap-0.5">
                  <span className="font-medium">Upgrade Plan</span>
                  <span className="text-xs text-muted-foreground">
                    Capture more leads
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <SignOut>
          <DropdownMenuItem className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
