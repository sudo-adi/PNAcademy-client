import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AxiosError } from 'axios';

// interface for Create User props
interface RegisterUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleId: string;
}

//  interface for create user response
interface RegisterUserResponse {
  message: string;
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    role_id: string | null;
    updatedAt: string;
    createdAt: string;
  };
}

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

// interface for Bulk User
interface BulkUser {
  id: string;
  role_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

// interface for get user response
interface GetUsersResponse {
  message: string;
  data: {
    users: BulkUser[];
    totalPages: number;
  };
}

// interface for get user props
interface BulkUserProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

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

// interface for get user by ID props
interface UpdateUserProps {
  id: string;
  dataToUpdate: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    role_id?: string;
  };
}

// interface for update user response
interface UpdateUserResponse {
  id: string;
  dataToUpdate: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    role_id?: string;
  };
}

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

// interface for delete user props
interface DeleteUsersProps {
  userIds: string[];
}

// interface for delete user response
interface DeleteUsersResponse {
  message: string;
}

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
