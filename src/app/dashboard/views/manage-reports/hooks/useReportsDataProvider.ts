import {
  assessmentReport,
  AssessmentResult,
  GetAssessmentResultsProps,
} from "@/lib/types/reportTypes";
import { ApiError } from "next/dist/server/api-utils";
import { useManageReports } from "./useManageReports";
import { useGroups } from "../../manage-groups/hooks/useGroups";
import { useState } from "react";



export const useReportDataProviders = () => {
  const { fetchAssessmentResults } = useManageReports();
  const { fetchAssignedGroups } = useGroups();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllAssessmentsReportsData = async (
    data: GetAssessmentResultsProps
  ): Promise<assessmentReport[]> => {
    try {
      const response: AssessmentResult[] = await fetchAssessmentResults(data);
      const formattedResponse: assessmentReport[] = response.map((result) => ({
        assessmentName: result.assessment.name,
        assessmentId: result.assessment_id,
        assessmentDate: result.createdAt,
        totalParticipants: result.total_participants,
        totalMarks: result.total_marks,
        averageMarks: result.average_marks,
        averageMarksPercentage: result.average_marks_percentage,
      }));
      return formattedResponse;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  const fetchOverViewData = async (assessmentId: string, data: assessmentReport) => {
    console.log(data);
    try {
      const response = await fetchAssignedGroups({ id: assessmentId });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    fetchAllAssessmentsReportsData,
    fetchOverViewData,
  };
};
