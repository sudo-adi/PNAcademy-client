import React, { useState } from "react";
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

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import SingleReportDialogOverViewTab from "../tabs/single-report-dialog-over-view-tab";
import SingleReportDialogUsersTab from "../tabs/single-report-dialog-users-tab";
import { ClipboardList, Loader } from "lucide-react";
import { useReportDataProviders } from "../../hooks/useReportsDataProvider";
import {
  AvgPercentage,
  EachGroupAvgScore,
  KeyMetrics,
  ScoreDistribution,
  singleUserReport,
  UsersAttemptedFromEachGroupPercentage,
  UsersAttemptedVsUsersUnAttempted,
} from "@/lib/types/reportTypes";

interface ViewReportDialogBoxProps {
  assessmentId: string;
  data: {
    assessmentName: string;
    assessmentId: string;
    assessmentDate: string;
    totalParticipants: number;
    totalMarks: number;
    averageMarks: number;
    averageMarksPercentage: number;
  };
}

interface OverViewTabData {
  keyMetrics: KeyMetrics;
  usersAttemptedVsUsersUnAttempted: UsersAttemptedVsUsersUnAttempted;
  avgPercentage: AvgPercentage;
  scoreDistribution: ScoreDistribution;
  eachGroupAvgScore: EachGroupAvgScore;
  usersAttemptedFromEachGroupPercentage: UsersAttemptedFromEachGroupPercentage;
}

const ViewReportDialogBox: React.FC<ViewReportDialogBoxProps> = ({
  assessmentId,
  data,
}) => {
  const [objoverViewTabData, setOverViewTabData] = useState<OverViewTabData>(
    {} as OverViewTabData
  );
  const [usersReportsTabData, setUsersReportsTabData] = useState<
    singleUserReport[]
  >([] as singleUserReport[]);
  const [overViewTabDataLoading, setOverViewTabDataLoading] =
    useState<boolean>(true);
  const [usersReportsTabDataLoading, setUsersReportsTabDataLoading] =
    useState<boolean>(true);

  // Mock data
  const obj: OverViewTabData = {
    keyMetrics: {
      totalParticipants: 100,
      totalMarks: 1000,
      averageMarks: 50,
      averageMarksPercentage: 50,
    },

    usersAttemptedVsUsersUnAttempted: {
      usersAttempted: 50,
      usersUnAttempted: 50,
    },

    avgPercentage: {
      avgPercentage: 50,
    },

    scoreDistribution: {
      "0-20": 15,
      "21-40": 25,
      "41-60": 40,
      "61-80": 60,
      "81-100": 10,
      "101-120": 5,
      "121-140": 3,
      "141-160": 2,
    } as ScoreDistribution,

    eachGroupAvgScore: {
      group1: 50,
      group2: 60,
      group3: 70,
    } as EachGroupAvgScore,

    usersAttemptedFromEachGroupPercentage: {
      group1: 50,
      group2: 60,
      group3: 70,
    } as UsersAttemptedFromEachGroupPercentage,
  } as OverViewTabData;

  const usersReportsTabData1: singleUserReport[] = [
    {
      username: "user1",
      email: "user1@example.com",
      group: "group1",
      correctAnswers: 5,
      wrongAnswers: 5,
      totalScore: 50,
      percentage: 50,
    },
  ];

  const { fetchOverViewData } = useReportDataProviders();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full"
          onClick={() => fetchOverViewData(assessmentId, data)}
        >
          View Report <ClipboardList size={16} className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[50rem] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-sm flex flex-row justify-between font-bold">
            {data.assessmentName}
          </DialogTitle>
          <DialogDescription className="text-[10px]">
            {data.assessmentId}
          </DialogDescription>
        </DialogHeader>
        <Tabs>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="0">Overview</TabsTrigger>
            <TabsTrigger value="1">Users Report</TabsTrigger>
            <TabsTrigger value="2">Groups</TabsTrigger>
          </TabsList>
          <TabsContent value="0" className="py-2">
            {obj! && (
              <SingleReportDialogOverViewTab
                keyMetrics={obj.keyMetrics}
                usersAttemptedVsUsersUnAttempted={
                  obj.usersAttemptedVsUsersUnAttempted
                }
                avgPercentage={obj.avgPercentage}
                scoreDistribution={obj.scoreDistribution}
                eachGroupAvgScore={obj.eachGroupAvgScore}
                usersAttemptedFromEachGroupPercentage={
                  obj.usersAttemptedFromEachGroupPercentage
                }
              />
            )}
            {!obj && (
              <div className="flex h-full w-full items-center justify-center">
                <Loader className="h-4 w-4 animate-spin" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="1" className="py-2 h-full">
            <SingleReportDialogUsersTab users={usersReportsTabData} />
          </TabsContent>
          <TabsContent value="2" className="py-2">
            {/* <SingleReportDialogUsersTab /> */}
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex justify-end">
          <Button>Publish Reports</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportDialogBox;
