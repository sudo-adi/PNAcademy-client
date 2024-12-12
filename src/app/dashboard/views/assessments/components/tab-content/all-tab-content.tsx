import React, { FC } from "react";
import { Card } from "@/components/ui/card";
import { AssignedAssessment } from "@/lib/types/assessmentTypes";
import AssessmentCard from "../cards/assessment-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator"; // Import from shadcn/ui

interface AllTabContentProps {
  assessments: AssignedAssessment[];
}

const AllTabContent: FC<AllTabContentProps> = ({ assessments }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Card className="border-none h-[calc(100vh-15rem)] md:h-[calc(100vh-19rem)] w-full overflow-y-auto scrollbar-none bg-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {assessments.map((assessment) => (
            <AssessmentCard
              assessment={assessment}
              key={assessment.id}
              state={
                assessment.start_at &&
                assessment.end_at &&
                new Date(assessment.start_at) < new Date() &&
                new Date(assessment.end_at) > new Date()
                  ? "o"
                  : assessment.start_at &&
                    new Date(assessment.start_at) > new Date()
                  ? "s"
                  : "p"
              }
            />
          ))}
        </div>
      </Card>
      <Separator className="w-full" />
      <Label className="text-[10px]">{assessments.length} Assessments</Label>
    </div>
  );
};

export default AllTabContent;
