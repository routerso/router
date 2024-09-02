import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { CircleAlert, ArrowUp } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const Usage = ({
  totalUsage,
  used,
  plan,
}: {
  totalUsage: number;
  used: number;
  plan: string;
}) => {
  const calculateDaysLeft = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const timeDiff = nextMonth.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const daysLeft = calculateDaysLeft();
  const remaining = totalUsage - used;
  const usagePercentage = (used / totalUsage) * 100;

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="mb-6 border-b">
        <CardTitle>Usage Overview</CardTitle>
        <CardDescription>
          Total leads captured out of your current plan limit.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow">
        <div className="grid gap-3 p-3 border rounded-sm bg-muted/25">
          <div className="flex justify-between items-center">
            <p>
              {used} / {totalUsage}{" "}
              <span className="text-muted-foreground text-xs">
                Leads Captured
              </span>
            </p>
            <Badge variant={plan === "Free" ? "outline" : "default"}>
              {plan}
            </Badge>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">
              {remaining} leads remaining
            </p>
            <p className="flex items-center space-x-1 text-xs">
              <CircleAlert className="h-3 w-3 text-green-500" />
              <span>
                Plan resets in <span className="font-medium">{daysLeft}</span>{" "}
                day{daysLeft !== 1 ? "s" : ""}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
      {plan === "Free" && (
        <CardFooter className="mt-auto">
          <UpgradePlan />
        </CardFooter>
      )}
    </Card>
  );
};

const UpgradePlan = () => {
  return (
    <a
      href="https://router.so/upgrade"
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 hover:pl-5 hover:pr-3 transition-all h-full w-full border grid gap-1 border-green-500 rounded-sm bg-green-500/15 hover:bg-green-500/25"
    >
      <span className="flex items-center gap-1">
        Upgrade Plan
        <ArrowUp className="h-4 w-4" />
      </span>
      <span className="text-muted-foreground text-xs">
        Upgrade your plan to capture more leads
      </span>
    </a>
  );
};
