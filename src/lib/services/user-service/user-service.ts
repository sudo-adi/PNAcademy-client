import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { BulkUserProps, DeleteUsersProps, DeleteUsersResponse, GetUsersResponse, ImportUsersProps, ImportUsersResponse, RegisterUserProps, RegisterUserResponse, UpdateUserProps, UpdateUserResponse } from '@/lib/types/userTypes';
import { AxiosError } from 'axios';

// Function to Register a User
export const registerUser = async (data: RegisterUserProps): Promise<RegisterUserResponse | null> => {
  try {
    const response = await axiosInstance.post<RegisterUserResponse>('/v1/user/register', data);
    if (response.status === 200 || response.status === 201) {
      console.info('User registered successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 409:
          throw new ApiError(status, 'Conflict: User already exists or data conflicts', data);
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

// Function to get all users
export const getUsers = async (data: BulkUserProps): Promise<GetUsersResponse | null> => {
  try {
    const response = await axiosInstance.get<GetUsersResponse>('/v1/user/bulk', {
      params: data
    });
    if (response.status === 200 || response.status === 201) {
      console.info('Bulk user information retrieved successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 401:
          throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
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

// Function to update a user
export const updateUser = async (data: UpdateUserProps): Promise<UpdateUserResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateUserResponse>('/v1/user/update', data);
    if (response.status === 200 || response.status === 201) {
      console.info('User updated successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 409:
          throw new ApiError(status, 'Conflict: Data conflicts or user update failed', data);
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


// Function to delete a user
export const deleteUsers = async (data: DeleteUsersProps): Promise<DeleteUsersResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteUsersResponse>('/v1/user/delete', { data });
    if (response.status === 200 || response.status === 201) {
      console.info('Users deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 401:
          throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
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



export const importUsers = async (data: ImportUsersProps): Promise<ImportUsersResponse | null> => {
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
      console.info('Users imported successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 409:
          throw new ApiError(status, 'Conflict: Data conflicts', data);
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

