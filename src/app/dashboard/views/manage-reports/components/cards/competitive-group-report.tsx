"use client";
import { ArrowDownFromLine, ArrowUpFromLine, TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with icons";

const chartData = [
  { month: "January", group: 186 },
  { month: "February", group: 305 },
  { month: "March", group: 237 },
  { month: "April", group: 73 },
  { month: "May", group: 209 },
  { month: "June", group: 214 },
  { month: "July", group: 189 },
  { month: "august", group: 189 },
  { month: "september", group: 189 },
  { month: "october", group: 189 },
];

const chartConfig = {
  group: {
    label: "Groups",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function CompetitiveGroupReportCard() {
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-xs">Competitive Group Analysis</CardTitle>
        <CardDescription className="text-[8px]">
          Group Average Score Comparison Chart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className=" my-auto w-full max-h-[250px] h-[150px] "
        >
          <RadarChart
            className="text-[8px]"
            data={chartData}
            margin={{
              top: -20,
              bottom: -10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="group"
              fill="var(--color-group)"
              fillOpacity={0.6}
            />
            <Radar dataKey="mobile" fill="var(--color-mobile)" />
            <ChartLegend className="mt-8" content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 font-medium text-[9px] leading-none">
          Hello Kitty leads with 34 avg.
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
