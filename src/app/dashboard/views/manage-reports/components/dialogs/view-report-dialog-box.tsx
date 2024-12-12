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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SingleReportDialogUsersTab from "../tabs/single-report-dialog-users-tab";
import { ClipboardList, Upload } from "lucide-react";
import { useReportDataProviders } from "../../hooks/useReportsDataProvider";
import KeyMetricCard from "../cards/key-metric-card";

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
    isPublished: boolean;
  };
}

const ViewReportDialogBox: React.FC<ViewReportDialogBoxProps> = ({
  assessmentId,
  data,
}) => {
  const [usersReportsTabData, setUsersReportsTabData] = useState([
    {
      username: "John Doe",
      email: "john.doe@example.com",
      group: "Admin",
      correctAnswers: 45,
      wrongAnswers: 5,
      totalScore: 90,
      percentage: 90,
    },
    {
      username: "Jane Smith",
      email: "jane.smith@example.com",
      group: "Moderators",
      correctAnswers: 40,
      wrongAnswers: 10,
      totalScore: 80,
      percentage: 80,
    },
    {
      username: "Mike Johnson",
      email: "mike.johnson@example.com",
      group: "Students",
      correctAnswers: 35,
      wrongAnswers: 15,
      totalScore: 70,
      percentage: 70,
    },
    {
      username: "Emily Davis",
      email: "emily.davis@example.com",
      group: "Guests",
      correctAnswers: 30,
      wrongAnswers: 20,
      totalScore: 60,
      percentage: 60,
    },
    {
      username: "Chris Brown",
      email: "chris.brown@example.com",
      group: "Teachers",
      correctAnswers: 50,
      wrongAnswers: 0,
      totalScore: 100,
      percentage: 100,
    },
  ]);

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
      <DialogContent className="max-w-5xl max-h-[50rem] flex flex-col overflow-hidden">
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
          <TabsContent value="0" className="py-2">
            <KeyMetricCard
              props={{
                totalParticipants: 50,
                totalMarks: 100,
                averageMarks: 75,
                averageMarksPercentage: 75,
              }}
            />
          </TabsContent>
          <TabsContent value="1" className="py-2 h-full">
            <SingleReportDialogUsersTab users={usersReportsTabData} />
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

export default ViewReportDialogBox;
