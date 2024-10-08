import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { retry } from '@/lib/api/retryApiCalls';
import {
  AddTagToQuestionProps,
  AddTagToQuestionResponse,
  CreateQuestionProps,
  CreateQuestionResponse,
  DeleteQuestionProps,
  DeleteQuestionResponse,
  GetQuestionByIdProps,
  GetQuestionResponse,
  RemoveTagFromQuestionProps,
  RemoveTagFromQuestionResponse,
  UpdateQuestionProps,
  UpdateQuestionResponse
} from '@/lib/types/questionTypes';
import { AxiosError } from 'axios';

export const createQuestion = async (data: CreateQuestionProps): Promise<CreateQuestionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<CreateQuestionResponse>('/v1/assessment/question', data);
      if (response.status === 200 || response.status === 201) {
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
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
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


export const getQuestionById = async ({ id }: GetQuestionByIdProps): Promise<GetQuestionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetQuestionResponse>('/v1/assessment/question', {
        params: { id },
      });
      if (response.status === 200 || response.status === 201) {
        console.info('Question fetched successfully', response.data);
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
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Question not found', errorData);
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


// Function to update question
export const updateQuestion = async (data: UpdateQuestionProps): Promise<UpdateQuestionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateQuestionResponse>('/v1/assessment/question', data);
      if (response.status === 200 || response.status === 201) {
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
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Question not found', errorData);
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


// Function to delete question by ID
export const deleteQuestion = async ({ id }: DeleteQuestionProps): Promise<DeleteQuestionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteQuestionResponse>('/v1/assessment/question', {
        data: { id },
      });
      if (response.status === 200 || response.status === 201) {
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
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Question not found', errorData);
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


// Function to add tag to question
export const addTagToQuestion = async (data: AddTagToQuestionProps): Promise<AddTagToQuestionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<AddTagToQuestionResponse>('/v1/assessment/question/addTag', data);
      if (response.status === 200 || response.status === 201) {
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
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Question or Tag not found', errorData);
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


// Function to remove tag from question
export const removeTagFromQuestion = async (data: RemoveTagFromQuestionProps): Promise<RemoveTagFromQuestionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<RemoveTagFromQuestionResponse>('/v1/assessment/question/removeTag', {
        data
      });
      if (response.status === 200 || response.status === 201) {
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
            throw new ApiError(status, 'Bad Request: Invalid ID format or missing parameters', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized', errorData);
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
