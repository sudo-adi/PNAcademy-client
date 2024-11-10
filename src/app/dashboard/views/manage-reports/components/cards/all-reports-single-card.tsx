import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users2 } from "lucide-react";
import ViewReportDialogBox from "../dialogs/view-report-dialog-box";
import { Card } from "@/components/ui/card";
import { formatDate } from "date-fns";

interface AllReportsSingleCardProps {
  assessmentName: string;
  assessmentId: string;
  assessmentDate: string;
  totalParticipants: number;
  totalMarks: number;
  averageMarks: number;
  averageMarksPercentage: number;
}

const AllReportsSingleCard: React.FC<AllReportsSingleCardProps> = (
  props: AllReportsSingleCardProps
) => {
  return (
    <Card className="flex flex-col h-[25rem] max-h-[26rem] w-full p-3 justify-center bg-accent shadow-lg ">
      <div className="flex flex-row justify-between border-muted-foreground/20  border-b items-center text-xs px-1">
        {props.assessmentName}
        <Badge className="text-[8px] h-4 mb-1">
          {formatDate(props.assessmentDate, "dd MMM yyyy")}
        </Badge>
      </div>
      <div className="flex flex-row gap-2 p-2">
        <div className="flex flex-row w-3/5 border border-muted-foreground/50 rounded-md p-4">
          <div className="flex flex-col justify-between text-[10px] w-full gap-4">
            Total Participants
            <div className="flex">
              <Users2 className="h-3 w-3" />
            </div>
          </div>
          <div className="flex flex-col h-full  justify-end  items-end text-md">
            {props.totalParticipants}
          </div>
        </div>
        <div className="flex flex-col w-2/5 border border-muted-foreground/50 rounded-md  items-center justify-center text-3xl">
          {props.totalMarks}
          <Badge className="text-[8px] h-4" variant={"outline"}>
            Total Marks
          </Badge>
        </div>
      </div>
      <div className="flex flex-col p-2 items-center justify-center gap-4">
        <Separator className="bg-muted-foreground/20" />
        <Badge className="text-[8px]">Avg Score {props.averageMarks}</Badge>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-5xl text-muted-foreground">
            {props.averageMarksPercentage.toFixed(2)}%
          </p>
          <p className="text-[8px] p-1   border-b border-muted-foreground/50">
            Overall Average percentage
          </p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between my-1">
            <Badge
              className="text-[8px] border-muted-foreground/50"
              variant={"outline"}
            >
              {props.assessmentId}
            </Badge>
            <Badge
              className="text-[8px] border-muted-foreground/50"
              variant={"outline"}
            >
              unpublished
            </Badge>
          </div>
          <Separator className="bg-muted-foreground/20" />
        </div>
      </div>
      <div className="flex p-2">
        <ViewReportDialogBox
          assessmentId={props.assessmentId}
          data={{ ...props }}
        />
      </div>
    </Card>
  );
};

export default AllReportsSingleCard;
