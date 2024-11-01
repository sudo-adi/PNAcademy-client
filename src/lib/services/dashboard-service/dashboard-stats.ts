import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { retry } from '@/lib/api/retryApiCalls';
import { DraftAssessmentsResponse, OngoingAssessmentsResponse, PastAssessmentsResponse, ScheduledAssessmentsResponse, TotalAssessmentsResponse } from '@/lib/types/dashboard-statsTypes';


// Function to get total number of assessments
export const getTotalAssessments = async (): Promise<number> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<TotalAssessmentsResponse>('/v1/assessment/total');

      if (response.status === 200 && typeof response.data.totalAssessments === 'number') {
        return response.data.totalAssessments;
      } else {
        throw new ApiError(response.status, `Unexpected response status or data: ${response.status}`, response.data);
      }
    } catch (error) {
      throw handleApiError(error);
    }
  });
};

// Function to get count of ongoing assessments
export const getOngoingAssessmentsCount = async (): Promise<number> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<OngoingAssessmentsResponse>('/v1/assessment/ongoing');

      if (response.status === 200 && typeof response.data.totalAssessments === 'number') {
        return response.data.totalAssessments;
      } else {
        throw new ApiError(response.status, `Unexpected response status or data: ${response.status}`, response.data);
      }
    } catch (error) {
      throw handleApiError(error);
    }
  });
};

// Function to get count of scheduled assessments
export const getScheduledAssessmentsCount = async (): Promise<number> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<ScheduledAssessmentsResponse>('/v1/assessment/scheduled');

      if (response.status === 200 && typeof response.data.totalAssessments === 'number') {
        return response.data.totalAssessments;
      } else {
        throw new ApiError(response.status, `Unexpected response status or data: ${response.status}`, response.data);
      }
    } catch (error) {
      throw handleApiError(error);
    }
  });
};

// Function to get count of past assessments
export const getPastAssessmentsCount = async (): Promise<number> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<PastAssessmentsResponse>('/v1/assessment/past');

      if (response.status === 200 && typeof response.data.totalAssessments === 'number') {
        return response.data.totalAssessments;
      } else {
        throw new ApiError(response.status, `Unexpected response status or data: ${response.status}`, response.data);
      }
    } catch (error) {
      throw handleApiError(error);
    }
  });
};

// Function to get count of draft assessments
export const getDraftAssessmentsCount = async (): Promise<number> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<DraftAssessmentsResponse>('/v1/assessment/draft');

      if (response.status === 200 && typeof response.data.totalAssessments === 'number') {
        return response.data.totalAssessments;
      } else {
        throw new ApiError(response.status, `Unexpected response status or data: ${response.status}`, response.data);
      }
    } catch (error) {
      throw handleApiError(error);
    }
  });
};

// Helper function to handle API errors
const handleApiError = (error: unknown): never => {
  if (error instanceof AxiosError) {
    const { response } = error;
    const status = response?.status ?? 500;
    const errorData = response?.data;

    switch (status) {
      case 401:
        throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', errorData);
      case 500:
        throw new ApiError(status, 'Internal Server Error', errorData);
      default:
        throw new ApiError(status, `HTTP Error: ${status}`, errorData);
    }
  } else if (error instanceof Error) {
    throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
  } else {
    throw new ApiError(500, 'An unknown error occurred', error);
  }
};