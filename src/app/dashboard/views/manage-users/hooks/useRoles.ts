// hooks/useRoles.ts
import {
  createRole,
  getRoles,
  updateRole,
  deleteRoles
} from '@/lib/services/user-service/role-service'; // Adjust the import path as needed
import { ApiError } from '@/lib/api/apiError';
import {
  CreateRoleProps,
  GetRolesProps,
  UpdateRoleProps,
  DeleteRolesProps,
  Role,
  CreateRoleResponse,
  UpdateRoleResponse,
  DeleteRoleResponse,
  GetRolesResponse
} from '@/lib/types/roleTypes';

export const useRoles = () => {

  // Function to create a role
  const addRole = async (data: CreateRoleProps): Promise<CreateRoleResponse['data']> => {
    try {
      const response: CreateRoleResponse = await createRole(data);
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

  // Function to get roles
  const fetchRoles = async (data: GetRolesProps): Promise<Role[]> => {

    try {
      const response: GetRolesResponse = await getRoles(data);
      return response.data.roles;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {

    }
  };

  // Function to update a role
  const patchRole = async (data: UpdateRoleProps): Promise<UpdateRoleResponse> => {
    try {
      const response: UpdateRoleResponse = await updateRole(data);
      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {

    }
  };

  // Function to delete roles
  const removeRoles = async (data: DeleteRolesProps): Promise<string> => {
    try {
      const response: DeleteRoleResponse = await deleteRoles(data);
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

  return {
    addRole,
    fetchRoles,
    patchRole,
    removeRoles,
  };
};
