import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { GenerateQuestionsProps, GenerateQuestionsResponse } from '@/lib/types/ai-assessment';

export const generateQuestions = async (
  data: GenerateQuestionsProps
): Promise<GenerateQuestionsResponse | null> => {
  try {
    const response = await axiosInstance.post<GenerateQuestionsResponse>(
      '/v1/assessment/generate',
      data
    );

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
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
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};
