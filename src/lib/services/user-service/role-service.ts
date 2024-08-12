import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AxiosError } from 'axios';


// interface for RolePermissions
interface RolePermissions {
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

// interface for createRole props
interface CreateRoleProps {
  name: string;
  permissions: RolePermissions;
}

// interface for createRole response
interface CreateRoleResponse {
  message: string;
  data: {
    id: string;
    name: string;
    permissions: RolePermissions;
  };
}

// Function to create role
export const createRole = async (data: CreateRoleProps): Promise<CreateRoleResponse | null> => {
  try {
    const response = await axiosInstance.post<CreateRoleResponse>('/v1/user/role', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Role created successfully', response.data);
      return response.data;
    }
    return null
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 409:
          throw new ApiError(status, 'Conflict: Role already exists', data);
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


// interface for Role
interface Role {
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
  role_id: string | null;
}

// interface for getRoles response
interface GetRolesResponse {
  message: string;
  data: {
    roles: Role[];
  };
}

// interface for getRoles props
interface getRolesProps {
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
  | "updatedAt"; order: 'ASC' | 'DESC';
}

// Function to get rolesx
export const getRoles = async (data: getRolesProps): Promise<Role[] | null> => {
  try {
    const response = await axiosInstance.get<GetRolesResponse>('/v1/user/roles', {
      params: data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Roles fetched successfully', response.data);
      return response.data.data.roles;
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

// interface for updateRole props
interface UpdateRoleProps {
  roleId: string;
  name?: string;
  canManageAssessment?: boolean;
  canManageUser?: boolean;
  canManageRole?: boolean;
  canManageNotification?: boolean;
  canManageLocalGroup?: boolean;
  canManageReports?: boolean;
  canAttemptAssessment?: boolean;
  canViewReport?: boolean;
  canManageMyAccount?: boolean;
  canViewNotification?: boolean;
}

// interface for updateRole response
interface UpdateRoleResponse {
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role_id: string;
    updatedAt: string;
    createdAt: string;
  };
}


// Function to update role
export const updateRole = async (data: UpdateRoleProps): Promise<UpdateRoleResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateRoleResponse>('/v1/user/role', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Role updated successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
        case 403:
          throw new ApiError(status, 'Forbidden: You do not have permission to update this role', data);
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

// interface for deleteRoles props
interface DeleteRolesProps {
  roleIds: { roleId: string }[];
}

// interface for deleteRoles response
interface DeleteRoleResponse {
  message: string;
}

// Function to delete roles
export const deleteRoles = async (data: DeleteRolesProps): Promise<DeleteRoleResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteRoleResponse>('/v1/user/role', { data });
    if (response.status === 200 || response.status === 201) {
      console.info('Roles deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
        case 403:
          throw new ApiError(status, 'Forbidden: You do not have permission to delete these roles', data);
        case 404:
          throw new ApiError(status, 'Role Not Found: The role does not exist', data);
        case 405:
          throw new ApiError(status, 'Method Not Allowed: The HTTP method is not supported', data);
        case 406:
          throw new ApiError(status, 'Not Acceptable: The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request', data);
        case 408:
          throw new ApiError(status, 'Request Timeout: The server timed out waiting for the request', data);
        case 409:
          throw new ApiError(status, 'Conflict: Data conflict encountered', data);
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
