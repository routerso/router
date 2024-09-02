import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const Usage = ({
  totalUsage,
  used,
}: {
  totalUsage: number;
  used: number;
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
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Usage Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Used: {used}</span>
          <span>Remaining: {remaining}</span>
        </div>
        <Progress value={usagePercentage} className="h-2" />
        <div className="text-center text-sm text-muted-foreground">
          {used} out of {totalUsage} used
        </div>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        Resets in {daysLeft} day{daysLeft !== 1 ? "s" : ""}
      </CardFooter>
    </Card>
  );
};
