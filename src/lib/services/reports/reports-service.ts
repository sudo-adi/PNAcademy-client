import { ApiError } from "@/lib/api/apiError";
import axiosInstance from "@/lib/api/axiosInstance";
import { retry } from "@/lib/api/retryApiCalls";
import {  ExplainAnswerProps, ExplainAnswerResponse, GetAnswerKeyProps, GetAnswerKeyResponse } from "@/lib/types/answer-keyTypes";
import { GetGroupsProps } from "@/lib/types/groupTypes";
import {
  GetAllReportGroupsResponse,
  GetAllReportsByGroupProps,
  GetAnalyticsChartProps,
  GetAnalyticsChartResponse,
  GetAssessmentAnalyticsResponse,
  GetAssessmentResponsesProps,
  GetAssessmentResultsProps,
  GetAssessmentResultsResponse,
  GetMyResultsProps,
  GetMyResultsResponse,
  GetReportsByAssessmentIdProps,
  GetReportsByAssessmentIdResponse,
  GetReportsByGroupResponse,
  publishReportsProps,
  publishReportsResponse
} from "@/lib/types/reportTypes";
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


// Function to get user assessment responses for a specific assessment and user
export const getAssessmentUserResponses = async (params: GetAnswerKeyProps): Promise<GetAnswerKeyResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAnswerKeyResponse>(`/v1/assessment/${params.assessmentId}/${params.userId}/responses`, { params });
      console.log("response", response);
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
            throw new ApiError(status, 'Bad Request: Invalid parameters provided', data);
          case 404:
            throw new ApiError(status, 'Assessment or user not found', data);
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

// Function to get user responses for a specific assessment
export const getMyResponses = async (params: GetAnswerKeyProps): Promise<GetAnswerKeyResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAnswerKeyResponse>(`/v1/assessment/${params.assessmentId}/my-responses`, { params });
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
            throw new ApiError(status, 'Bad Request: Invalid parameters provided', data);
          case 404:
            throw new ApiError(status, 'Assessment not found', data);
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

// Function to get reports by assessment ID
export const getReportsByAssessmentId = async (
  params: GetReportsByAssessmentIdProps
): Promise<GetReportsByAssessmentIdResponse> => {
  return retry(async () => {
    try {
      // Endpoint template
      const endpoint = `/v1/assessment/${params.assessmentId}/results`;

      // Remove `assessmentId` from params as it will be included in the path
      const { assessmentId, ...queryParameters } = params;

      // Make the API call
      const response = await axiosInstance.get<GetReportsByAssessmentIdResponse>(endpoint, {
        params: queryParameters,
      });

      // Return the response data if successful
      if (response.status === 200) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, "Bad Request: Invalid parameters provided", data);
          case 404:
            throw new ApiError(status, "Assessment not found", data);
          case 500:
            throw new ApiError(status, "Internal Server Error", data);
          default:
            throw new ApiError(status || 500, "An unexpected error occurred", data);
        }
      } else {
        throw new ApiError(500, "An unexpected error occurred", error);
      }
    }
  });
};



// Function to get reports by assessment ID
export const getAllReportGroups = async (
  params: GetGroupsProps
): Promise<GetAllReportGroupsResponse> => {
  return retry(async () => {
    try {
      // Endpoint template
      const endpoint = `/v1/assessment/groups/`;

      // Remove `assessmentId` from params as it will be included in the path
      const { ...queryParameters } = params;

      // Make the API call
      const response = await axiosInstance.get<GetAllReportGroupsResponse>(endpoint, {
        params: queryParameters,
      });

      // Return the response data if successful
      if (response.status === 200) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, "Bad Request: Invalid parameters provided", data);
          case 404:
            throw new ApiError(status, "Groups not found", data);
          case 500:
            throw new ApiError(status, "Internal Server Error", data);
          default:
            throw new ApiError(status || 500, "An unexpected error occurred", data);
        }
      } else {
        throw new ApiError(500, "An unexpected error occurred", error);
      }
    }
  });
};



// Function to get all reports in a group
export const getAllReportsInAGroup = async (
  params: GetAllReportsByGroupProps
): Promise<GetReportsByGroupResponse> => {
  return retry(async () => {
    try {
      // Extract groupId from params and use it in the endpoint path
      const { groupId, ...queryParameters } = params;

      // Endpoint template
      const endpoint = `/v1/assessment/${groupId}/assessment-results`;

      // Make the API call
      const response = await axiosInstance.get<GetReportsByGroupResponse>(endpoint, {
        params: queryParameters,
      });

      // Return the response data if successful
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, "Bad Request: Invalid parameters provided", data);
          case 404:
            throw new ApiError(status, "Assessment results not found", data);
          case 500:
            throw new ApiError(status, "Internal Server Error", data);
          default:
            throw new ApiError(status || 500, "An unexpected error occurred", data);
        }
      } else {
        throw new ApiError(500, "An unexpected error occurred", error);
      }
    }
  });
};


// Function to add users to a group
export const publishResults = async (data: publishReportsProps): Promise<publishReportsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<publishReportsResponse>('/v1/assessment/result/publish', data);
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
            throw new ApiError(status, 'Invalid assessment ID or publish flag', data);
          case 403:
            throw new ApiError(status, 'Not authorized to publish/unpublish this assessment result', data);
          case 404:
            throw new ApiError(status, 'Assessment with this ID does not exist', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status!, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};

// Function to add users to a group
export const explainAnswer = async (data: ExplainAnswerProps): Promise<ExplainAnswerResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<ExplainAnswerResponse>(`/v1/assessment/${data.questionId}/explain`);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 404:
            throw new ApiError(status, 'Question not found', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status!, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};
