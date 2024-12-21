import {
  GetMyResultsProps,
  GetMyResultsResponse,
  GetAssessmentResultsProps,
  GetAssessmentResultsResponse,
  GetAssessmentAnalyticsResponse,
  GetAnalyticsChartProps,
  GetAnalyticsChartResponse,
  AssessmentResult,
  GetReportsByAssessmentIdResponse,
  GetReportsByAssessmentIdProps,
  GetAllReportsByGroupProps,
  GroupReportResult,
  GetAllReportGroupsResponse,
  publishReportsProps,
  publishReportsResponse,
} from "@/lib/types/reportTypes";
import { ApiError } from "@/lib/api/apiError";
import { getAssessmentAnalyticsChart,  getMyResults,
  getAssessmentResults,
  getAssessmentAnalytics,
  getReportsByAssessmentId,
  getAllReportsInAGroup,
  getAllReportGroups,
  publishResults, } from "@/lib/services/reports/reports-service";
import { GetGroupsProps } from "@/lib/types/groupTypes";

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


  // Hook Method to get assessment analytics chart data
  const fetchReportByAssessmentId = async (params: GetReportsByAssessmentIdProps): Promise<GetReportsByAssessmentIdResponse> => {
    try {
      const response: GetReportsByAssessmentIdResponse = await getReportsByAssessmentId(params);
      return response; // Return the chart data directly
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

    // Hook Method to get assessment analytics chart data
    const fetchAllReportGroups = async (params: GetGroupsProps): Promise<GetAllReportGroupsResponse['data']['groups']> => {
      try {
        const response: GetAllReportGroupsResponse = await getAllReportGroups(params);
        return response.data.groups; // Return the chart data directly
      } catch (err) {
        if (err instanceof ApiError) {
          throw err; // Rethrow the ApiError for handling at a higher level
        } else {
          throw new Error('An unexpected error occurred');
        }
      }
    };


  const fetchAllReportsByGroup = async (params: GetAllReportsByGroupProps): Promise<GroupReportResult[]> => {
    try {
      const response = await getAllReportsInAGroup(params);
      if (response.data && response.data.results) {
        console.log(response.data.results);
        return response.data.results; // Return the results array
      } else {
        throw new Error("No results found in the response.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  const fetchAllAssessmentsReportsData = async (params: GetAllReportsByGroupProps): Promise<GroupReportResult[]> => {
    try {
      const response = await getAllReportsInAGroup(params);
      if (response.data && response.data.results) {
        console.log(response.data.results);
        return response.data.results; // Return the results array
      } else {
        throw new Error("No results found in the response.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };


  const publishAssessmentReport = async (params: publishReportsProps): Promise<publishReportsResponse> => {
    try {
      const response = await publishResults(params);
      if (response && response) {
        return response;
      } else {
        throw new Error("No results found in the response.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  // Return the hook methods
  return {
    fetchReportByAssessmentId,
    fetchAllReportsByGroup,
    fetchAllReportGroups,
    fetchMyResults,
    fetchAssessmentResults,
    fetchAssessmentAnalytics,
    fetchAssessmentAnalyticsChart,
    fetchAllAssessmentsReportsData,
    publishAssessmentReport,
  };
};
