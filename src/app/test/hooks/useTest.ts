import {
  SearchAssessmentResult,
} from "@/lib/types/assessmentTypes";
import { ApiError } from "@/lib/api/apiError";
import {  searchAssignedAssessments } from "@/lib/services/assessment/assessment-service";



export const useTest = () => {
  // Function to search assigned assessments
  const geAssignedAssessmentDetails = async (
    assessmentId: string
  ): Promise<SearchAssessmentResult> => {
    const payLoad = {
      query: assessmentId,
      page: 1,
      pageSize: 10,
      order: "ASC" as "ASC",
    }
    try {
      console.log(payLoad)
      const response = await searchAssignedAssessments(payLoad);
      console.log(response)
      return response.data.searchResults[0];
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
    geAssignedAssessmentDetails,
  };
};
