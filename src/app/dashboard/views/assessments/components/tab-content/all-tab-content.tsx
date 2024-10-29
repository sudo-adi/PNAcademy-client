import React, { FC } from "react";
import { Card } from "@/components/ui/card";
import { Assessment } from "@/lib/types/assessmentTypes";
import AssessmentCard from "../cards/assessment-card";
import { Label } from "@/components/ui/label";

interface AllTabContentProps {
  assessments: Assessment[];
}

const AllTabContent: FC<AllTabContentProps> = ({ assessments }) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <Card className="border-dashed h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] w-full p-4 overflow-y-auto scrollbar-none bg-transparent">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <Label>{assessments.length} Assessments</Label>
    </div>
  );
};

export default AllTabContent;
