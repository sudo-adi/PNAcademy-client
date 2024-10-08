import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { CreateOptionProps, CreateOptionResponse, DeleteOptionProps, DeleteOptionResponse, UpdateOptionProps, UpdateOptionResponse } from '@/lib/types/optionTypes';
import { retry } from '@/lib/api/retryApiCalls';

// Function to Create an option
export const createOption = async (data: CreateOptionProps): Promise<CreateOptionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<CreateOptionResponse>('/v1/assessment/option', data);

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

// Function to update an option
export const updateOption = async (data: UpdateOptionProps): Promise<UpdateOptionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateOptionResponse>('/v1/assessment/option', data);

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
            throw new ApiError(status, 'Not Found: Option not found', errorData);
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


// Function to delete an option
export const deleteOption = async ({ id }: DeleteOptionProps): Promise<DeleteOptionResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteOptionResponse>('/v1/assessment/option', {
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
            throw new ApiError(status, 'Not Found: Option not found', errorData);
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
