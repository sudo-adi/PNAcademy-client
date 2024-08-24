import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { CreateOptionProps, CreateOptionResponse, DeleteOptionProps, DeleteOptionResponse, UpdateOptionProps, UpdateOptionResponse } from '@/lib/types/optionTypes';

// Function to Create an option
export const createOption = async (data: CreateOptionProps): Promise<CreateOptionResponse | null> => {
  try {
    const response = await axiosInstance.post<CreateOptionResponse>('/v1/assessment/option', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Option created successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
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


// Function to update an option
export const updateOption = async (data: UpdateOptionProps): Promise<UpdateOptionResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateOptionResponse>('/v1/assessment/option', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Option updated successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Option not found', data);
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

// Fucntion to delete an option
export const deleteOption = async ({ id }: DeleteOptionProps): Promise<DeleteOptionResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteOptionResponse>('/v1/assessment/option', {
      data: { id },
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Option deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Option not found', data);
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