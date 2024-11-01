import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { GenerateQuestionsProps, GenerateQuestionsResponse, SaveAiGeneratedAssessmentProps, SaveAiGeneratedAssessmentResponse } from '@/lib/types/ai-assessment';

export const generateQuestions = async (
  data: GenerateQuestionsProps
): Promise<GenerateQuestionsResponse> => {
  try {
    const response = await axiosInstance.post<GenerateQuestionsResponse>(
      '/v1/assessment/generate',
      data
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    // If we get here, the response was not successful
    throw new ApiError(response.status, 'Unexpected response status', response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid input parameters', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', data);
        case 403:
          throw new ApiError(status, 'Forbidden: User does not have the required permissions', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// Interfaces for the payload and response types
export interface AssessmentOption {
  description: string;
  isCorrect: boolean;
}

// Function to generate and save assessment
export const saveAiGeneratedAssessment = async (
  data: SaveAiGeneratedAssessmentProps
): Promise<SaveAiGeneratedAssessmentResponse> => {
  try {
    const response = await axiosInstance.post<SaveAiGeneratedAssessmentResponse>(
      '/v1/assessment/generate/save',
      data
    );
    if (response.status === 200 || 201) {
      return response.data;
    }
    throw new ApiError(response.status, 'Unexpected response status', response.data);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid input parameters', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', data);
        case 403:
          throw new ApiError(status, 'Forbidden: User does not have the required permissions', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};
