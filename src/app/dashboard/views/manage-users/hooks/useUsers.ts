import { useState } from 'react';
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
  ImportUsersResponse,
} from '@/lib/types/userTypes';
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUsers,
  importUsers,
} from '@/lib/services/user-service/user-service';
import { ApiError } from '@/lib/api/apiError';
export const useUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [users, setUsers] = useState<SingleUser[]>([]);
  const [createdUserRes, setCreatedUserRes] = useState<RegisterUserResponse | null>(null);
  const [fetchedUsersRes, setFetchedUsersRes] = useState<GetUsersResponse | null>(null);
  const [updatedUserRes, setUpdatedUserRes] = useState<UpdateUserResponse | null>(null);
  const [deletedUsersRes, setDeletedUsersRes] = useState<DeleteUsersResponse | null>(null);

  // Function to create a user
  const addUser = async (data: RegisterUserProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: RegisterUserResponse | null = await registerUser(data);
      if (response) {
        console.info('User created:', response);
        setCreatedUserRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch users
  const fetchUsers = async (params: BulkUserProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GetUsersResponse | null = await getUsers(params);
      if (response) {
        setUsers(response.data.users);
        setFetchedUsersRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to update a user
  const editUser = async (data: UpdateUserProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: UpdateUserResponse | null = await updateUser(data);
      if (response) {
        console.info('User updated:', response);
        setUpdatedUserRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to delete users
  const removeUsers = async (data: DeleteUsersProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: DeleteUsersResponse | null = await deleteUsers(data);
      if (response) {
        console.info('Users deleted:', response);
        setDeletedUsersRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };


  interface ImportUsersFromCSVProps {
    users: File;
    updateExisting: boolean;
  }

  const importUsersFromCSV = async ({ users, updateExisting }: ImportUsersFromCSVProps) => {
    setLoading(true);
    setError(null);
    try {
      const response = await importUsers({ users, updateExisting });
      if (response) {
        console.info('Users imported:', response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };


  return {
    users,
    loading,
    error,
    createdUserRes,
    fetchedUsersRes,
    updatedUserRes,
    deletedUsersRes,
    importUsersFromCSV,
    addUser,
    fetchUsers,
    editUser,
    removeUsers,
  };
};
