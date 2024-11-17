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
  ChangeUserPasswordProps,
  ChangeUserPasswordResponse,
} from '@/lib/types/userTypes';
import {
  registerUser,
  getUsers,
  updateUser,
  deleteUsers,
  importUsers,
  getUsersByRoleId,
  changeUserPassword,
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


    // Hook Method to delete users
    const changePassword = async (data: ChangeUserPasswordProps): Promise<String> => {
      try {
        const response: ChangeUserPasswordResponse = await changeUserPassword(data);
        console.log("this is resposne", response);
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

  // const importUsersFromCSV = async ({ users, updateExisting }: ImportUsersFromCSVProps) => {
  //   try {
  //     // Validate file type
  //     if (!users.name.toLowerCase().endsWith('.csv')) {
  //       throw new ApiError(400, 'Invalid file type. Please upload a CSV file.', null);
  //     }

  //     // Validate file size (e.g., 10MB limit)
  //     const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  //     if (users.size > MAX_FILE_SIZE) {
  //       throw new ApiError(413, 'File too large. Maximum size is 10MB.', null);
  //     }

  //     const response = await importUsers({ users, updateExisting });

  //     // Handle successful response
  //     if (response) {
  //       // You might want to add success toast or notification here
  //       console.log('Users imported successfully:', response.message);
  //       return response;
  //     }
  //   } catch (err) {
  //     if (err instanceof ApiError) {
  //       // Handle specific API errors
  //       switch (err.status) {
  //         case 400:
  //           console.error('Invalid file or parameters:', err.message);
  //           // Add user notification for invalid file
  //           break;
  //         case 413:
  //           console.error('File too large:', err.message);
  //           // Add user notification for file size
  //           break;
  //         case 415:
  //           console.error('Unsupported file type:', err.message);
  //           // Add user notification for file type
  //           break;
  //         default:
  //           console.error('Error importing users:', err.message);
  //           // Add generic error notification
  //       }
  //       throw err;
  //     } else {
  //       console.error('Unexpected error:', err);
  //       throw new ApiError(500, 'An unexpected error occurred while importing users', null);
  //     }
  //   }
  // };

  const importUsersFromCSV = async ({ users, updateExisting }: ImportUsersFromCSVProps) => {
    try {
      // Validate file type
      if (!users.name.toLowerCase().endsWith('.csv')) {
        throw new ApiError(400, 'Invalid file type. Please upload a CSV file.', null);
      }

      // Validate file size (e.g., 10MB limit)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
      if (users.size > MAX_FILE_SIZE) {
        throw new ApiError(413, 'File too large. Maximum size is 10MB.', null);
      }

      const response = await importUsers({ users, updateExisting });

      // Handle successful response
      if (response) {
        console.log('Users imported successfully:', response.message);
        return response;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        // Handle specific API errors
        console.error('API Error:', err.message);
        throw err;
      } else {
        console.error('Unexpected error:', err);
        throw new ApiError(500, 'An unexpected error occurred while importing users', null);
      }
    }
  };


  return {
    addUser,
    fetchUsers,
    fetchUsersByRoleId,
    editUser,
    removeUsers,
    importUsersFromCSV,
    changePassword,
  };
};
