// interface for Create User props
export interface RegisterUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleId: string;
}

// interface for create user response
export interface RegisterUserResponse {
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

// interface for Bulk User
export interface SingleUser {
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
export interface GetUsersResponse {
  message: string;
  data: {
    users: SingleUser[];
    totalPages: number;
  };
}

// interface for get user props
export interface BulkUserProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

// interface for get user by ID props
export interface UpdateUserProps {
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
export interface UpdateUserResponse {
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
  }

}

// interface for delete user props
export interface DeleteUsersProps {
  userIds: string[];
}

// interface for delete user response
export interface DeleteUsersResponse {
  message: string;
}

export interface fetchUsersProps {

}