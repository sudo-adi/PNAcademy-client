import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClipboardList, Upload } from "lucide-react";
import KeyMetricCard from "../cards/key-metric-card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AllUsersInAssessmentLeaderboardsTable from "../tabs/single-report-dialog-users-tab";
import { GetReportsByAssessmentIdProps } from "@/lib/types/reportTypes";
import { useManageReports } from "../../hooks/useManageReports";
import Leaderboards, { LeaderboardData } from "../charts/leaderboards";

export interface ViewReportDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentId: string;
  data: {
    assessmentName: string;
    assessmentId: string;
    assessmentDate: string;
    totalParticipants: number;
    totalMarks: number;
    averageMarks: number;
    averageMarksPercentage: number;
    isPublished: boolean;
  };
}

const ViewReportByGroupDialog: React.FC<ViewReportDialogBoxProps> = ({
  assessmentId,
  data,
  isOpen,
  onClose,
}) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);

  const COLORS = ["#00C49F", "#FFBB28"];

  // Separate leaderboards for above and below average scorers
  const aboveAverageLeaders = leaderboardData.filter(
    (leader) => leader.correct_percentage > data.averageMarksPercentage
  );

  const { fetchReportByAssessmentId } = useManageReports();

  const onClickViewReport = async () => {
    const payload = {
      assessmentId: assessmentId,
      page: 1,
      pageSize: 9999,
      sortBy: "marks_scored" as "marks_scored",
      orderBy: "DESC" as "DESC",
    } as GetReportsByAssessmentIdProps;
    const response = await fetchReportByAssessmentId(payload);
    setLeaderboardData(response.data.results);
  };

  const belowAverageLeaders = leaderboardData.filter(
    (leader) => leader.correct_percentage <= data.averageMarksPercentage
  );

  // Dynamically calculate Pie Chart Data for Score Distribution
  const aboveAverageCount = leaderboardData.filter(
    (leader) => leader.correct_percentage > data.averageMarksPercentage
  ).length;

  const belowAverageCount = leaderboardData.filter(
    (leader) => leader.correct_percentage <= data.averageMarksPercentage
  ).length;

  const topFiveCandidates = leaderboardData
    .sort((a, b) => b.correct_percentage - a.correct_percentage)
    .slice(0, 5);

  // Pie Chart Data
  const pieChartData = [
    { name: "Above Average", value: aboveAverageCount },
    { name: "Below Average", value: belowAverageCount },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button
          className="w-full transition-all duration-300"
          onClick={onClickViewReport}
        >
          View Report
          <ClipboardList className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[60rem] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-sm flex flex-row justify-between font-bold">
            {data.assessmentName}
          </DialogTitle>
          <DialogDescription className="text-[10px]">
            {data.assessmentId}
          </DialogDescription>
        </DialogHeader>
        <Tabs>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="0">Overview</TabsTrigger>
            <TabsTrigger value="1">Users Report</TabsTrigger>
          </TabsList>
          <TabsContent value="0" className="py-2 space-y-4">
            {/* First Row: Key Metrics and Leaderboard */}
            <div className="flex space-x-4">
              <div className="w-1/3">
                <KeyMetricCard
                  props={{
                    totalParticipants: data.totalParticipants,
                    totalMarks: data.totalMarks,
                    averageMarks: data.averageMarks,
                    averageMarksPercentage: data.averageMarksPercentage,
                  }}
                />
              </div>
              <Card className="w-2/3">
                <CardHeader>
                  <CardTitle className="text-xs">Leaderboards</CardTitle>
                </CardHeader>
                <CardContent>
                  <Leaderboards data={topFiveCandidates} />
                </CardContent>
              </Card>
            </div>

            {/* Second Row: Pie Chart and Two Leaderboards */}
            <div className="flex space-x-4">
              {/* Pie Chart Card */}
              <Card className="w-1/3">
                <CardHeader>
                  <CardTitle className="text-xs">Score Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Above Average Leaderboard */}
              <Card className="w-1/3">
                <CardHeader>
                  <CardTitle className="text-xs">
                    Students Above Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Leaderboards data={aboveAverageLeaders} />
                </CardContent>
              </Card>

              {/* Below Average Leaderboard */}
              <Card className="w-1/3">
                <CardHeader>
                  <CardTitle className="text-xs">
                    Students Below Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Leaderboards data={belowAverageLeaders} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="1" className="py-2 h-full">
            <AllUsersInAssessmentLeaderboardsTable
              data={{
                users: leaderboardData,
                totalMarks: data.totalMarks,
              }}
            />
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex justify-end">
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Publish Reports
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportByGroupDialog;
