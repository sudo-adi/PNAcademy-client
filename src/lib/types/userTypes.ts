// interface for Single User
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
  data: SingleUser;
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
  sortBy:
  | "id"
  | "role_id"
  | "first_name"
  | "last_name"
  | "email"
  | "phone"
  | "role_id"
  | "createdAt"
  | "updatedAt";
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

export interface GetUsersByRoleIdProps {
  roleId: string; // UUID format for the role ID
}

// Define the shape of the response data when fetching users by role ID
export interface GetUsersByRoleIdResponse {
  data: SingleUser[]; // An array of user objects
  status: string; // The status of the response
}


// interface for update user response
export interface UpdateUserResponse {
  message: string;
  data: SingleUser;
}

// interface for delete user props
export interface DeleteUsersProps {
  userIds: string[];
}

// interface for delete user response
export interface DeleteUsersResponse {
  message: string;
}


export interface DeleteUsersDialogProps {
  refreshUsers: () => void;
  user: SingleUser;
}
export interface ImportUsersProps {
  users: File;
  updateExisting: boolean;
}

export interface ImportUsersResponse {
  message: string;
}


export interface GetUserInfoResponse {
  message: string;
  data: SingleUser;
}



export interface ChangeUserPasswordProps {
  userId?: string;
  password: string;
}


export interface ChangeUserPasswordResponse {
  status: string;
  message: string;
}


export interface UserTableSchemaProps {
  toggleSorting: (field: keyof SingleUser) => void;
  sortBy: keyof SingleUser;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}


export interface UserTableRowProps {
  user: SingleUser;
  selected: boolean;
  onSelectUser: (userId: string, checked: boolean) => void;
  refreshUsers: () => void;
  loading: boolean;
}
