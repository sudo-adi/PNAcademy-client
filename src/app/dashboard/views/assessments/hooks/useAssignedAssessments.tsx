import {
  GetAssignedAssessmentsProps,
  GetAssignedAssessmentsResponse,
  AssignedAssessment,
  SearchAssessmentsResponse,
  SearchAssessmentsProps,
} from "@/lib/types/assessmentTypes";
import { ApiError } from "@/lib/api/apiError";
import { getAssignedAssessments } from "@/lib/services/assessment/assessment-service";

export const useAssignedAssessments = () => {
  // Function to fetch assigned assessments
  const fetchAssignedAssessments = async (
    payload: GetAssignedAssessmentsProps
  ): Promise<AssignedAssessment[]> => {
    try {
      const response: GetAssignedAssessmentsResponse =
        await getAssignedAssessments(payload);
      if (response.data.assessments) {
        return response.data.assessments;
      } else {
        throw new Error("Failed to fetch assigned assessments");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        console.error("API Error:", err.message);
        throw err;
      } else {
        console.error("Error:", err);
        throw err;
      }
    } finally {
      // Cleanup if needed
    }
  };

  // Function to search assigned assessments
  const searchAssignedAssessments = async (
    searchPayload: SearchAssessmentsProps
  ): Promise<SearchAssessmentsResponse> => {
    try {
      const response = await searchAssignedAssessments(searchPayload);
      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        console.error("API Error:", err.message);
        throw err;
      } else {
        console.error("Error:", err);
        throw new ApiError(
          500,
          "An unexpected error occurred while searching assessments",
          err
        );
      }
    }
  };

  return {
    fetchAssignedAssessments,
    searchAssignedAssessments,
  };
};
