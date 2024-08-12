import { createRole, getRoleDetails, getRoles } from "@/lib/services/user-service/role-service";
import { Permission } from "@/lib/types/permissions";
import { Role } from "@/lib/types/role";
import { useState, useEffect } from "react";

export const useRoleDetails = () => {
  const [permissions, setPermissions] = useState<Permission>();
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const permissions = await getRoleDetails();
        setPermissions(permissions);
      } catch (err) {
        setError(err);
      }
    };

    fetchRoleDetails();
  }, []);

  return { permissions, error };
};


export const useCreateRole = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createNewRole = async (roleName: string, permissions: Permission) => {
    try {
      setLoading(true);
      const data = await createRole(roleName, permissions);
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, createNewRole };
};


export const useRoles = (page: number, pageSize: number) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const roles = await getRoles(page, pageSize);
        setRoles(roles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [page, pageSize]);

  return { roles, error, loading };
};


export const useDeleteRole = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteRole = async (roleIds: string[]) => {
    const requestBody = {
      roleIds: roleIds.map(id => ({ roleId: id })),
    };

    try {
      setLoading(true);
      // const data = await deleteRole();
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, deleteRole };
};
