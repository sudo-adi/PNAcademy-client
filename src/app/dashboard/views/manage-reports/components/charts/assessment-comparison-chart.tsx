import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { subDays, format } from "date-fns";

// Interfaces and Data Generation Functions
export interface Assessment {
  id: string;
  name: string;
  totalParticipants: number;
  averageScore: number;
}

export interface Group {
  id: string;
  name: string;
  totalParticipants: number;
  averageScore: number;
}

export interface Participant {
  id: string;
  name: string;
  score: number;
  group: string;
}

const generateAssessments = (count: number): Assessment[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `a${i + 1}`,
    name: `Assessment ${i + 1}`,
    totalParticipants: Math.floor(Math.random() * 500) + 50,
    averageScore: Math.floor(Math.random() * 40) + 60,
  }));
};

const generateGroups = (count: number): Group[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `g${i + 1}`,
    name: `Group ${i + 1}`,
    totalParticipants: Math.floor(Math.random() * 100) + 20,
    averageScore: Math.floor(Math.random() * 40) + 60,
  }));
};

const generateParticipants = (
  count: number,
  groups: Group[]
): Participant[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `p${i + 1}`,
    name: `Participant ${i + 1}`,
    score: Math.floor(Math.random() * 100) + 1,
    group: groups[Math.floor(Math.random() * groups.length)].name,
  }));
};

const generateTimeSeriesData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: format(subDays(new Date(), days - i - 1), "MMM dd"),
    participants: Math.floor(Math.random() * 100) + 20,
    averageScore: Math.floor(Math.random() * 40) + 60,
  }));
};

export const dummyData = {
  assessments: generateAssessments(10),
  groups: generateGroups(5),
  participants: generateParticipants(1000, generateGroups(5)),
  timeSeriesData: generateTimeSeriesData(30),
  completionRate: Math.floor(Math.random() * 20) + 80,
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 border rounded-lg shadow-lg">
        <p className="font-bold text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div
            key={`tooltip-${index}`}
            className="text-xs text-muted-foreground"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};
const AssessmentPerformanceComparisonChart: React.FC = () => {
  return (
    <div className="w-full space-y-4">
      <Card className="w-full">
        <CardContent className="w-full px-0 md:px-6">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dummyData.assessments}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-muted-foreground/20"
                />
                <XAxis
                  dataKey="name"
                  className="text-xs"
                  tickMargin={10}
                  interval="preserveStartEnd"
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: "Total Participants",
                    angle: -90,
                    position: "insideLeft",
                    className: "text-xs fill-muted-foreground",
                  }}
                  className="text-xs"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: "Average Score",
                    angle: 90,
                    position: "insideRight",
                    className: "text-xs fill-muted-foreground",
                  }}
                  className="text-xs"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{
                    fontSize: "0.75rem",
                    paddingBottom: "0.5rem",
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="totalParticipants"
                  fill="hsl(var(--primary))"
                  name="Total Participants"
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="averageScore"
                  fill="hsl(var(--secondary))"
                  name="Average Score"
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentPerformanceComparisonChart;
