import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { retry } from '@/lib/api/retryApiCalls';
import {
  CreateTagProps,
  CreateTagResponse,
  DeleteTagProps,
  DeleteTagResponse,
  GetTagByIdResponse,
  GetTagProps,
  GetTagsProps,
  GetTagsResponse,
  UpdateTagProps,
  UpdateTagResponse
} from '@/lib/types/tagTypes';
import { AxiosError } from 'axios';

// Function to Create a Tag
export const createTag = async (data: CreateTagProps): Promise<CreateTagResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<CreateTagResponse>('/v1/assessment/tag', data);
      if (response.status === 200 || response.status === 201) {
        console.info('Tag created successfully', response.data);
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


// Function to get a Tag by ID
export const getTagById = async ({ id }: GetTagProps): Promise<GetTagByIdResponse | null> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetTagByIdResponse>(`/v1/assessment/tag?id=${id}`);
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
            throw new ApiError(status, 'Not Found: Tag not found', errorData);
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



export const getTags = async (params: GetTagsProps): Promise<GetTagsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetTagsResponse>('/v1/assessment/tags', { params });
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
            throw new ApiError(status, 'Tags not found', errorData);
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


// Function to update a Tag
export const updateTag = async (data: UpdateTagProps): Promise<UpdateTagResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateTagResponse>('/v1/assessment/tag', data);
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
            throw new ApiError(status, 'Not Found: Tag not found', errorData);
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

// Function to delete a Tag
export const deleteTag = async ({ id }: DeleteTagProps): Promise<DeleteTagResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteTagResponse>('/v1/assessment/tag', {
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
            throw new ApiError(status, 'Not Found: Tag not found', errorData);
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