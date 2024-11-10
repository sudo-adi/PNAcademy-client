import { ApiError } from "@/lib/api/apiError";
import axiosInstance from "@/lib/api/axiosInstance";
import { retry } from "@/lib/api/retryApiCalls";
import { GetAnalyticsChartProps, GetAnalyticsChartResponse, GetAssessmentAnalyticsResponse, GetAssessmentAnalyticsResponseError, GetAssessmentAnalyticsResponseSuccess, GetAssessmentResultsProps, GetAssessmentResultsResponse, GetMyResultsProps, GetMyResultsResponse } from "@/lib/types/reportTypes";
import { AxiosError } from "axios";

// Function to get user assessment results
export const getMyResults = async (params: GetMyResultsProps): Promise<GetMyResultsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetMyResultsResponse>('/v1/assessment/my-results', { params });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid query parameters', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status || 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};

// Function to get assessment results
export const getAssessmentResults = async (data: GetAssessmentResultsProps): Promise<GetAssessmentResultsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAssessmentResultsResponse>('/v1/assessment/results', { params: data });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid query parameters', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status || 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};


// Function to get assessment analytics
export const getAssessmentAnalytics = async (assessmentId: string): Promise<GetAssessmentAnalyticsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAssessmentAnalyticsResponse>(
        `/v1/assessment/${assessmentId}/analytics`
      );
      if (response.status === 200  || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid assessment ID', data);
          case 404:
            throw new ApiError(status, 'Not Found: Assessment with this ID does not exist', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status || 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};



// Function to get assessment analytics chart data
export const getAssessmentAnalyticsChart = async (params: GetAnalyticsChartProps): Promise<GetAnalyticsChartResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAnalyticsChartResponse>(
        '/v1/assessment/analytics/chart',
        { params }
      );
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid input data', data);
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied', data);
          default:
            throw new ApiError(status || 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};