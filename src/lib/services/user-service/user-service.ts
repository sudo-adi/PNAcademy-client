import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { retry } from '@/lib/api/retryApiCalls';
import { GetUsersByGroupIdProps, GetUsersByGroupIdResponse } from '@/lib/types/groupTypes';
import {
  BulkUserProps,
  DeleteUsersProps,
  DeleteUsersResponse,
  GetUserInfoResponse,
  GetUsersByRoleIdProps,
  GetUsersByRoleIdResponse,
  GetUsersResponse,
  ImportUsersProps,
  ImportUsersResponse,
  RegisterUserProps,
  RegisterUserResponse,
  UpdateUserProps,
  UpdateUserResponse
} from '@/lib/types/userTypes';
import { AxiosError } from 'axios';

// Function to Register a User
export const registerUser = async (data: RegisterUserProps): Promise<RegisterUserResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<RegisterUserResponse>('/v1/user/register', data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        // Handle unexpected success status codes
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 409:
            throw new ApiError(status, 'Conflict: User already exists or data conflicts', errorData);
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

// Function to get all users
export const getUsers = async (data: BulkUserProps): Promise<GetUsersResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetUsersResponse>('/v1/user/bulk', { params: data });

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
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', errorData);
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

// Function to update a user
export const updateUser = async (data: UpdateUserProps): Promise<UpdateUserResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateUserResponse>('/v1/user/update', data);
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
          case 409:
            throw new ApiError(status, 'Conflict: Data conflicts or user update failed', errorData);
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

// Function to delete users
export const deleteUsers = async (data: DeleteUsersProps): Promise<DeleteUsersResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteUsersResponse>('/v1/user/delete', { data });

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
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', errorData);
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

// Function to get user info
export const getUserInfo = async (): Promise<GetUserInfoResponse | null> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetUserInfoResponse>('/v1/user/info');

      if (response.status === 200) {
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
          case 401:
            throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', errorData);
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

// Function to get users by Group ID
export const getUsersByGroupId = async (data: GetUsersByGroupIdProps): Promise<GetUsersByGroupIdResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetUsersByGroupIdResponse>('/v1/user/by-group', { params: data });

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
          case 401:
            throw new ApiError(status, 'Unauthorized', errorData);
          case 500:
            throw new ApiError(status, 'Internal server error', errorData);
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

// Function to import users
export const importUsers = async (data: ImportUsersProps): Promise<ImportUsersResponse> => {
  return retry(async () => {
    try {
      const formData = new FormData();
      formData.append('users', data.users);
      formData.append('updateExisiting', data.updateExisting.toString());

      const response = await axiosInstance.post<ImportUsersResponse>('/v1/user/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
          case 409:
            throw new ApiError(status, 'Conflict: Data conflicts', errorData);
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

export const getUsersByRoleId = async (data: GetUsersByRoleIdProps): Promise<GetUsersByRoleIdResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetUsersByRoleIdResponse>('/v1/user/role', { params: data });
      // Check for 200 or 201 response status
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
            throw new ApiError(status, 'Bad Request - Invalid roleId', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized - User doesn\'t have the required permissions', errorData);
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
