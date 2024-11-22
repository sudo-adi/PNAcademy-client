import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClipboardList, User, Users, Users2 } from "lucide-react";
import ViewReportDialogBox from "../dialogs/view-report-dialog-box";
import { Card } from "@/components/ui/card";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";

interface ReportGroupCardProps {
  groupId: string;
  groupName: string;
  // groupUsers: User[];
  // groupAssessments: number;
}

const ReportGroupCard = (props: ReportGroupCardProps) => {
  return (
    <Card className="flex flex-col h-[17rem] max-h-[26rem] w-[20rem] p-3 justify-start bg-accent shadow-lg ">
      <div className="flex flex-row p-2 items-center gap-2 justify-between">
        New GRoup 01
        <div className="flex  border border-white p-1 rounded-full">
          <Users className="h-4 w-4" />
        </div>
      </div>
      <Separator className="bg-muted-foreground/20" />
      <div className="flex flex-col text-xs w-full items-center justify-start gap-1 p-2">
        <Card className="flex flex-row items-center justify-between w-full gap-2 rounded-md bg-card/40 p-4">
          <div className="flex gap-2 items-center justify-center flex-row">
            <ClipboardList className="h-4 w-4" />
            <p>Assessments</p>
          </div>
          <p>20</p>
        </Card>
        {/* <div className="flex flex-wrap gap-2 p-2">
          <div className="flex">
            <Badge className="text-[10px]">english</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">maths</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">hindi</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">science</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">...</Badge>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col text-xs w-full items-center justify-start gap-1 p-2">
        <Card className="flex flex-row items-center justify-between w-full gap-2 rounded-md bg-card/40 p-4">
          <div className="flex gap-2 items-center justify-center flex-row">
            <User className="h-4 w-4" />
            <p>Users</p>
          </div>
          <p>100</p>
        </Card>{" "}
        {/* <div className="flex flex-wrap gap-2 p-2">
          <div className="flex">
            <Badge className="text-[10px]">english</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">maths</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">hindi</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">science</Badge>
          </div>
          <div className="flex">
            <Badge className="text-[10px]">...</Badge>
          </div>
        </div> */}
      </div>
      <div className="flex p-2">
        <Separator className="bg-muted-foreground/20" />
      </div>
      <Button>View</Button>
    </Card>
  );
};

export default ReportGroupCard;
