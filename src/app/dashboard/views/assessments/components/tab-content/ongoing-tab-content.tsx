import React from 'react';
import { Card } from '@/components/ui/card';
import AssessmentCard from '../cards/assessment-card';
import { Assessment } from '@/lib/types/assessmentTypes';

interface ScheduledTabContentProps {
  assessments: Assessment[];
}



const OnGoingTabContent = ({ assessments }: ScheduledTabContentProps) => {

  const ongoingAssessments = assessments.filter(assessment => assessment.start_at && assessment.end_at && new Date(assessment.start_at) < new Date() && new Date(assessment.end_at) > new Date());

  return (
    <Card className="border-dashed h-[calc(100vh-21rem)] md:h-[calc(100vh-14rem)] w-full p-4 overflow-y-auto scrollbar-none bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ongoingAssessments.map((assessment) => (
          <AssessmentCard
            assessment={assessment}
            key={assessment.id}
            state={'o'} />
        ))}
      </div>
    </Card>
  );
};

export default OnGoingTabContent;