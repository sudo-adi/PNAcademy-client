import { Card } from "@/components/ui/card";
import React from "react";
import AssessmentCard from "../cards/assessment-card";
import { Assessment, AssignedAssessment } from "@/lib/types/assessmentTypes";

interface PreviousTabContentProps {
  assessments: AssignedAssessment[];
}

const PreviousTabContent = ({ assessments }: PreviousTabContentProps) => {
  const previousAssessments = assessments.filter(
    (assessment) =>
      assessment.end_at && new Date(assessment.end_at) < new Date()
  );

  return (
    <Card className="border-dashed h-[calc(100vh-21rem)] md:h-[calc(100vh-14rem)] w-full p-4 overflow-y-auto scrollbar-none bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {previousAssessments.map((assessment) => (
          <AssessmentCard
            assessment={assessment}
            key={assessment.id}
            state={"p"}
          />
        ))}
      </div>
    </Card>
  );
};

export default PreviousTabContent;
