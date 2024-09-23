import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useAssignedAssessments } from '../../hooks/useAssignedAssessments';
import { Assessment } from '@/lib/types/assessmentTypes';
import AssessmentCard from '../cards/assessment-card';

const AllTabContent = () => {
  const { fetchAssignedAssessments, fetchedAssignedAssessmentsRes } = useAssignedAssessments();
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    // Fetch all assessments
    fetchAssignedAssessments({
      page: 1,
      pageSize: 999,
      sortBy: 'id',
      order: 'ASC',
    });
  }, []);

  useEffect(() => {
    if (fetchedAssignedAssessmentsRes) {
      setAssessments(fetchedAssignedAssessmentsRes.data.assessments || []);
    }
  }, [fetchedAssignedAssessmentsRes]);

  const handleStart = (assessmentId: string) => {
    
  };
  const handleViewReport = () => {
    // Logic for viewing report
  };

  return (
    <Card className="border-dashed h-[calc(100vh-21rem)] md:h-[calc(100vh-16rem)] w-full p-4 overflow-y-auto scrollbar-none bg-transparent">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessments.map((assessment) => (
          <AssessmentCard
            assessment={assessment}
            startAssessment={() => handleStart(assessment.id)}
            viewReport={handleViewReport}
            key={assessment.id}
          />
        ))}
      </div>
    </Card>
  );
};

export default AllTabContent;
