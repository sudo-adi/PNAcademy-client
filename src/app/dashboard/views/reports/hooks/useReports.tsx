import {
  GetMyResultsProps,
  GetMyResultsResponse,
} from "@/lib/types/reportTypes";
import { ApiError } from "@/lib/api/apiError";
import { getMyResults } from "@/lib/services/reports/reports-service";

// Hook to manage reports
export const useReports = () => {
  // Hook Method to get user assessment results
  const fetchMyResults = async (
    params: GetMyResultsProps
  ): Promise<GetMyResultsResponse["data"]["results"]> => {
    try {
      const response: GetMyResultsResponse = await getMyResults(params);
      return response.data.results;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  // Return the hook methods
  return {
    fetchMyResults,
  };
};
