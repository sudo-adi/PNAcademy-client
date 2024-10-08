import {
  RegisterUserProps,
  RegisterUserResponse,
  BulkUserProps,
  GetUsersResponse,
  UpdateUserProps,
  UpdateUserResponse,
  DeleteUsersProps,
  DeleteUsersResponse,
  SingleUser,
  GetUsersByRoleIdResponse,
  GetUsersByRoleIdProps,
} from '@/lib/types/userTypes';
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUsers,
  importUsers,
  getUsersByRoleId,
} from '@/lib/services/user-service/user-service';
import { ApiError } from '@/lib/api/apiError';

// Hook to manage users
export const useUsers = () => {

  // Hook Method to create a user
  const addUser = async (data: RegisterUserProps): Promise<SingleUser> => {
    try {
      const response: RegisterUserResponse = await registerUser(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {

    }
  };

  // Hook Method to fetch users
  const fetchUsers = async (params: BulkUserProps): Promise<GetUsersResponse['data']> => {
    try {
      const response: GetUsersResponse = await getUsers(params);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {

    }
  };

  // Hook Method to fetch users by role ID
  const fetchUsersByRoleId = async (data: GetUsersByRoleIdProps): Promise<SingleUser[]> => {
    try {
      const response: GetUsersByRoleIdResponse = await getUsersByRoleId(data);
      return response.data; // Return the users array from the response
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
      // You can perform cleanup actions here if needed
    }
  };

  // Hook Method to update a user
  const editUser = async (data: UpdateUserProps): Promise<SingleUser> => {
    try {
      const response: UpdateUserResponse = await updateUser(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
    }
  };

  // Hook Method to delete users
  const removeUsers = async (data: DeleteUsersProps): Promise<String> => {
    try {
      const response: DeleteUsersResponse = await deleteUsers(data);
      return response.message;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {

    }
  };

  interface ImportUsersFromCSVProps {
    users: File;
    updateExisting: boolean;
  }

  const importUsersFromCSV = async ({ users, updateExisting }: ImportUsersFromCSVProps) => {
    try {
      const response = await importUsers({ users, updateExisting });
      if (response) {
      }
    } catch (err) {
      if (err instanceof ApiError) {
      } else {
      }
    } finally {

    }
  };

  return {
    addUser,
    fetchUsers,
    fetchUsersByRoleId,
    editUser,
    removeUsers,
    importUsersFromCSV,
  };
};
