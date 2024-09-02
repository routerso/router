"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  views: {
    label: "Overview",
  },
  leads: {
    label: "Leads",
    color: "hsl(var(--chart-1))",
  },
  errors: {
    label: "Errors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart({
  chartData,
  className,
}: {
  chartData: LeadAndErrorCountResults;
  className?: string;
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("leads");

  const total = React.useMemo(
    () => ({
      leads: chartData.reduce((acc, curr) => acc + curr.leads, 0),
      errors: chartData.reduce((acc, curr) => acc + curr.errors, 0),
    }),
    [chartData]
  );

  return (
    <Card className={cn("shadow-none", className)}>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row sm:h-[99px]">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6">
          <CardTitle>Router Overview</CardTitle>
          <CardDescription>
            Showing total lead and error counts for the past month
          </CardDescription>
        </div>
        <div className="flex">
          {["leads", "errors"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-5"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
