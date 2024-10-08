import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { retry } from '@/lib/api/retryApiCalls';
import { CreateRoleProps, CreateRoleResponse, DeleteRoleResponse, DeleteRolesProps, GetRolesProps, GetRolesResponse, Role, UpdateRoleProps, UpdateRoleResponse } from '@/lib/types/roleTypes';
import { AxiosError } from 'axios';


// Function to create role
export const createRole = async (data: CreateRoleProps): Promise<CreateRoleResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<CreateRoleResponse>('/v1/user/role', data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      // Handle unexpected success status codes
      throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 409:
            throw new ApiError(status, 'Conflict: Role already exists', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status ?? 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};


// Function to get roles
export const getRoles = async (data: GetRolesProps): Promise<GetRolesResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetRolesResponse>('/v1/user/roles', {
        params: data,
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      // Handle unexpected success status codes
      throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status ?? 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};


// Function to update role
export const updateRole = async (data: UpdateRoleProps): Promise<UpdateRoleResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateRoleResponse>('/v1/user/role', data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      // Handle unexpected success status codes
      throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', data);
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
          case 403:
            throw new ApiError(status, 'Forbidden: You do not have permission to update this role', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status ?? 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};


// Function to delete roles
export const deleteRoles = async (data: DeleteRolesProps): Promise<DeleteRoleResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteRoleResponse>('/v1/user/role', { data });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      }
      // Handle unexpected success status codes
      throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', data);
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
          case 403:
            throw new ApiError(status, 'Forbidden: You do not have permission to delete these roles', data);
          case 404:
            throw new ApiError(status, 'Role Not Found: The role does not exist', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status ?? 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};
