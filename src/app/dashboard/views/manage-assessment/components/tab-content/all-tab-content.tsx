import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React, { use, useCallback, useEffect, useState } from "react";
import useAssessmentsTableStore from "@/lib/stores/manage-assessment-store/assessments-table";
import { Assessment } from "@/lib/types/assessmentTypes";
import { ApiError } from "@/lib/api/apiError";
import Row from "../table/row";
import Schema from "../table/schema";
import { Button } from "@/components/ui/button";

interface AllTabContentProps {
  assessments: Assessment[];
  loadingAssessments: boolean;
  errorAssessments: ApiError | Error | undefined;
  toggleSorting: (field: keyof Assessment) => void;
  refreshAssessments: () => void;
  totalPages: number;
}

const PaginationHandlers = ({ totalPages }: { totalPages: number }) => {
  const { activePageIndex, setActivePageIndex } = useAssessmentsTableStore();

  const handleNavigateToNextPage = useCallback(() => {
    // Since we're starting from 0 in our store, we need to check against totalPages - 1
    if (activePageIndex < totalPages - 1) {
      console.log("Current page:", activePageIndex);
      const nextPage = activePageIndex + 1;
      console.log("Navigating to page:", nextPage);
      setActivePageIndex(nextPage);
    }
  }, [activePageIndex, totalPages, setActivePageIndex]);

  const handleNavigateToPreviousPage = useCallback(() => {
    if (activePageIndex > 0) {
      console.log("Current page:", activePageIndex);
      const previousPage = activePageIndex - 1;
      console.log("Navigating to page:", previousPage);
      setActivePageIndex(previousPage);
    }
  }, [activePageIndex, setActivePageIndex]);

  return {
    handleNavigateToNextPage,
    handleNavigateToPreviousPage,
  };
};

const AllTabContent: React.FC<AllTabContentProps> = ({
  assessments,
  loadingAssessments,
  errorAssessments,
  toggleSorting,
  refreshAssessments,
  totalPages,
}) => {
  // all hooks here
  const { handleNavigateToNextPage, handleNavigateToPreviousPage } =
    PaginationHandlers({ totalPages });

  // global states here
  const { activePageIndex, sortBy, order, setActivePageIndex } =
    useAssessmentsTableStore();

  // local states here
  const [selectedAssessments, setSelectedAssessments] = useState<Set<string>>(
    new Set()
  );

  // local vars here
  const allAssessments: Assessment[] = assessments.filter(
    (assessment) => assessment.is_active
  );
  const loading: boolean = loadingAssessments;
  const error: ApiError | Error | undefined = errorAssessments;
  const handleRefreshAssessments = refreshAssessments;
  const handleToggleSorting = toggleSorting;
  const allSelected: boolean =
    allAssessments.length > 0 &&
    selectedAssessments.size === allAssessments.length;

  // all functions here

  // all event handlers here
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAssessments(
        new Set(allAssessments.map((assessment) => assessment.id))
      );
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

  useEffect(() => {
    console.log("error ye hai", error);
  }, [error]);

  useEffect(() => {
    console.log("activePageIndex", activePageIndex);
  }, [activePageIndex]);

  return (
    <>
      <Card className="my-2 h-[calc(100vh-17rem)] w-full flex flex-col">
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
                {allAssessments.map((assessment) => (
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
        <Label>{allAssessments.length} Assessments</Label>
        {/* <div className="flex flex-row gap-2 items-center justify-center text-xs font-bold">
          <div className="flex p-2 rounded-xl border">
            {activePageIndex + 1} / {totalPages}
          </div>
          <Button variant={"outline"} size="sm" onClick={handleNavigateToPreviousPage}>
            Previous
          </Button>
          <Button size="sm" onClick={handleNavigateToNextPage}>
            Next Page
          </Button>
        </div> */}
      </div>
    </>
  );
};

export default AllTabContent;
