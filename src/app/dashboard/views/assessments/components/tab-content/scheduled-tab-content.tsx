import React from 'react';
import { Assessment } from '@/lib/types/assessmentTypes';
import AssessmentCard from '../cards/assessment-card';
import { Card } from '@/components/ui/card';

interface ScheduledTabContentProps {
  assessments: Assessment[];
}

const ScheduledTabContent = ({ assessments }: ScheduledTabContentProps) => {

  const scheduledAssessments = assessments.filter(assessment => assessment.start_at && new Date(assessment.start_at) > new Date());

  return (
    <Card className="border-dashed h-[calc(100vh-21rem)] md:h-[calc(100vh-14rem)] w-full p-4 overflow-y-auto scrollbar-none bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {scheduledAssessments.map((assessment) => (
          <AssessmentCard
            assessment={assessment}
            key={assessment.id}
            state={'s'} />
        ))}
      </div>
    </Card>
  );
};

export default ScheduledTabContent;