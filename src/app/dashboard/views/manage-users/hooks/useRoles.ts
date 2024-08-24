// hooks/useRoles.ts
import { useState } from 'react';
import {
  createRole,
  getRoles,
  updateRole,
  deleteRoles
} from '@/lib/services/user-service/role-service'; // Adjust the import path as needed
import { ApiError } from '@/lib/api/apiError';
import { CreateRoleProps, GetRolesProps, UpdateRoleProps, DeleteRolesProps, Role, CreateRoleResponse, UpdateRoleResponse, DeleteRoleResponse, GetRolesResponse } from '@/lib/types/roleTypes';

export const useRoles = () => {
  // State for managing loading and error states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [addedRoleRes, setAddedRoleRes] = useState<CreateRoleResponse>();
  const [fetchedRoleRes, setFetchedRoleRes] = useState<GetRolesResponse>();
  const [patchedRoleRes, setPatchedRoleRes] = useState<UpdateRoleResponse>();
  const [removedRolesRes, setRemovedRolesRes] = useState<DeleteRoleResponse>();

  // Function to create a role
  const addRole = async (data: CreateRoleProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: CreateRoleResponse | null = await createRole(data);
      if (response) {
        console.info('Role created:', response);
        setAddedRoleRes(response);
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

  // Function to get roles
  const fetchRoles = async (data: GetRolesProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GetRolesResponse | null = await getRoles(data);
      if (response) {
        setRoles(response.data.roles);
        setFetchedRoleRes(response);
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

  // Function to update a role
  const patchRole = async (data: UpdateRoleProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: UpdateRoleResponse | null = await updateRole(data);
      if (response) {
        console.info('Role updated:', response);
        setPatchedRoleRes(response)
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

  // Function to delete roles
  const removeRoles = async (data: DeleteRolesProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: DeleteRoleResponse | null = await deleteRoles(data);
      if (response) {
        console.info('Roles deleted:', response);
        setRemovedRolesRes(response)
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
    roles,
    loading,
    error,
    addRole,
    fetchRoles,
    patchRole,
    removeRoles,
    addedRoleRes,
    removedRolesRes,
    fetchedRoleRes,
    patchedRoleRes
  };
};
