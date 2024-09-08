import axiosInstance from '@/lib/api/axiosInstance';
import { DeleteSectionProps, DeleteSectionResponse } from '@/lib/types/sectionTypes';
import { AxiosError } from 'axios';

// Define types for the request and response

// Custom error class for API errors
class ApiError extends Error {
  status: number;
  data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const deleteSection = async (data: DeleteSectionProps): Promise<DeleteSectionResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteSectionResponse>('/v1/assessment/section', { data });

    if (response.status === 200) {
      console.info('Section deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid parameters', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', data);
        case 404:
          throw new ApiError(status, 'Not Found: The specified section or assessment does not exist', data);
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
