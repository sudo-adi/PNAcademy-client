import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import useAssessmentsTableStore from '@/lib/stores/manage-assessment-store/assessments-table'
import { Assessment } from '@/lib/types/assessmentTypes'
import { ApiError } from '@/lib/api/apiError'
import Row from '../table/row'
import Schema from '../table/schema'


interface OnGoingTabContentProps {
  assessments: Assessment[];
  loadingAssessments: boolean;
  errorAssessments: ApiError | Error | undefined;
  toggleSorting: (field: keyof Assessment) => void;
  refreshAssessments: () => void;
}

const OnGoingTabContent: React.FC<OnGoingTabContentProps> = ({ assessments, loadingAssessments, errorAssessments, toggleSorting, refreshAssessments }) => {
  // all hooks here

  // global states here
  const { sortBy, order } = useAssessmentsTableStore();

  // local states here
  const [selectedAssessments, setSelectedAssessments] = useState<Set<string>>(new Set());

  // local vars here
  const allAssessments: Assessment[] = assessments;
  const loading: boolean = loadingAssessments;
  const error: ApiError | Error | undefined = errorAssessments;
  const handleRefreshAssessments = refreshAssessments;
  const handleToggleSorting = toggleSorting;
  const allSelected: boolean = allAssessments.length > 0 && selectedAssessments.size === allAssessments.length;
  const onGoingAssessments: Assessment[] = allAssessments.filter(assessment => assessment.is_active && assessment.start_at && assessment.end_at && new Date(assessment.start_at) < new Date() && new Date(assessment.end_at) > new Date());
  // all functions here

  // all event handlers here
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAssessments(new Set(allAssessments.map(assessment => assessment.id)));
    } else {
      setSelectedAssessments(new Set());
    }
  };

  const handleSelectAssessment = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedAssessments);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedAssessments(updatedSelectedUsers);
  };

  // all useEffects here
  useEffect(() => {
    setSelectedAssessments(new Set());
  }, [toggleSorting]);


  return (
    <>
      <Card className='my-2 h-[calc(100vh-17rem)] w-full flex flex-col'>
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-y-scroll">
            <table className="w-full">
              <thead className="sticky bg-background top-0 z-10">
                <Schema
                  toggleSorting={handleToggleSorting}
                  sortBy={sortBy}
                  order={order}
                  onSelectAll={handleSelectAll}
                  allSelected={allSelected}
                />
              </thead>
              <tbody>
                {onGoingAssessments.map(assessment => (
                  <Row
                    key={assessment.id}
                    assessment={assessment}
                    selected={selectedAssessments.has(assessment.id)}
                    onSelectAssessment={handleSelectAssessment}
                    refreshAssessments={handleRefreshAssessments}
                    loading={loading}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div className="flex h-[calc(3rem-6px)] items-center justify-between gap-2">
        <Label className='text-[10px]'>
          <strong>{onGoingAssessments.length}</strong>{" "}Assessments
        </Label>
      </div>
    </>
  )
}


export default OnGoingTabContent