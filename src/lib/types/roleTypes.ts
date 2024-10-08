// types/roleTypes.ts

export interface RolePermissions {
  canManageAssessment: boolean;
  canManageUser: boolean;
  canManageRole: boolean;
  canManageNotification: boolean;
  canManageLocalGroup: boolean;
  canManageReports: boolean;
  canAttemptAssessment: boolean;
  canViewReport: boolean;
  canManageMyAccount: boolean;
  canViewNotification: boolean;
}

export interface CreateRoleProps {
  name: string;
  permissions: RolePermissions;
}

export interface CreateRoleResponse {
  message: string;
  data: {
    id: string;
    name: string;
    permissions: RolePermissions;
  };
}

export interface Role {
  id: string;
  name: string;
  canManageAssessment: boolean;
  canManageUser: boolean;
  canManageRole: boolean;
  canManageNotification: boolean;
  canManageLocalGroup: boolean;
  canManageReports: boolean;
  canAttemptAssessment: boolean;
  canViewReport: boolean;
  canManageMyAccount: boolean;
  canViewNotification: boolean;
  createdAt: string;
  updatedAt: string;
  role_id?: string | null;
}

export interface GetRolesProps {
  page: number;
  pageSize: number;
  sortBy:
  | "id"
  | "name"
  | "canManageAssessment"
  | "canManageUser"
  | "canManageRole"
  | "canManageNotification"
  | "canManageLocalGroup"
  | "canManageReports"
  | "canAttemptAssessment"
  | "canViewReport"
  | "canManageMyAccount"
  | "canViewNotification"
  | "createdAt"
  | "updatedAt";
  order: 'ASC' | 'DESC';
}

export interface GetRolesResponse {
  message: string;
  data: {
    roles: Role[];
  };
}

export interface UpdateRoleProps {
  roleId: string;
  name?: string;
  permissions: RolePermissions;
}
export interface UpdateRoleResponse {
  roleId: string; // UUID for the role
  name: string;   // Name of the role
  permissions: RolePermissions; // Permissions associated with the role
}

export interface DeleteRolesProps {
  roleIds: { roleId: string }[];
}

export interface DeleteRoleResponse {
  message: string;
}

export interface DeleteRoleDialogProps {
  refreshRoles: () => void;
  role: Role;
}
