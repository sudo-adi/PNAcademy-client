import {
  GetMyResultsProps,
  GetMyResultsResponse,
  GetAssessmentResultsProps,
  GetAssessmentResultsResponse,
  GetAssessmentAnalyticsResponse,
  GetAnalyticsChartProps,
  GetAnalyticsChartResponse,
  AssessmentResult,
} from "@/lib/types/reportTypes";
import { ApiError } from "@/lib/api/apiError";
import { getAssessmentAnalyticsChart,  getMyResults,
  getAssessmentResults,
  getAssessmentAnalytics, } from "@/lib/services/reports/reports-service";

// Hook to manage reports
export const useManageReports = () => {

  // Hook Method to get user assessment results
  const fetchMyResults = async (params: GetMyResultsProps): Promise<GetMyResultsResponse> => {
    try {
      const response: GetMyResultsResponse = await getMyResults(params);
      return response; // Return the results directly
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to get assessment results
  const fetchAssessmentResults = async (data: GetAssessmentResultsProps): Promise<AssessmentResult[]> => {
    try {
      const response: GetAssessmentResultsResponse = await getAssessmentResults(data);
      return response.data.results; // Return the results directly
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to get assessment analytics
  const fetchAssessmentAnalytics = async (assessmentId: string): Promise<GetAssessmentAnalyticsResponse> => {
    try {
      const response: GetAssessmentAnalyticsResponse = await getAssessmentAnalytics(assessmentId);
      return response; // Return the analytics directly
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to get assessment analytics chart data
  const fetchAssessmentAnalyticsChart = async (params: GetAnalyticsChartProps): Promise<GetAnalyticsChartResponse> => {
    try {
      const response: GetAnalyticsChartResponse = await getAssessmentAnalyticsChart(params);
      return response; // Return the chart data directly
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };



  // Return the hook methods
  return {
    fetchMyResults,
    fetchAssessmentResults,
    fetchAssessmentAnalytics,
    fetchAssessmentAnalyticsChart,
  };
};
