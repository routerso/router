import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { CircleIcon, LightningBoltIcon } from "@radix-ui/react-icons";

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
    <Card className="w-full">
      <CardHeader className="mb-6 border-b">
        <CardTitle>
          Usage Overview
        </CardTitle>
        <CardDescription>
          Total leads captured out of your current plan limit.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-3xl font-medium p-4 border rounded-md bg-accent/50">{used} <span className="text-muted-foreground text-base">/ {remaining}</span></p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span>{totalUsage}</span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>
        <div className="text-center text-sm">
          <span className="font-medium">{used}</span> out of <span className="font-medium">{totalUsage}</span> used
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 rounded-b-lg">
        <div className="w-full text-center text-sm flex items-center justify-center space-x-2">
          <CircleIcon className="h-3 w-3 text-green-500" />
          <span>Resets in <span className="font-medium">{daysLeft}</span> day{daysLeft !== 1 ? "s" : ""}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
