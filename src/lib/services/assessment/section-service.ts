import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { retry } from '@/lib/api/retryApiCalls';
import { DeleteSectionProps, DeleteSectionResponse } from '@/lib/types/sectionTypes';
import { AxiosError } from 'axios';

// Define types for the request and response
export const deleteSection = async (data: DeleteSectionProps): Promise<DeleteSectionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteSectionResponse>('/v1/assessment/section', { data });

      if (response.status === 200) {
        console.info('Section deleted successfully', response.data);
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid parameters', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: The specified section or assessment does not exist', errorData);
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
    }
  });
};
