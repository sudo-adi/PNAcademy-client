// interface for createGroup props
export interface CreateGroupProps {
  name: string;
}

// interface for createGroup response
export interface CreateGroupResponse {
  message: string;
  data: {
    name: string;
    id: string;
    updatedAt: string;
    createdAt: string;
  };
}

export interface Group {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}


// interface for getGroups props
export interface GetGroupsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

// interface for getGroups response
export interface GetGroupsResponse {
  message: string;
  data: {
    groups: Group[];
    totalPages: number;
  };
}


// interface for getGroupById props
export interface UpdateGroupProps {
  id: string;
  name: string;
}

// interface for getGroupById response
export interface UpdateGroupResponse {
  message: string;
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// interface for deleteGroup props
export interface DeleteGroupsProps {
  groupIds: string[];
}

// interface for deleteGroup response
export interface DeleteGroupsResponse {
  message: string;
}



// interface for get user by ID props
export interface AddToGroupProps {
  userIds: string[];
  groupId: string;
}

// interface for get user by ID response
export interface AddToGroupResponse {
  status: string;
  message: string;
}

// interface for remove users by IDs props
export interface RemoveFromGroupProps {
  userIds: string[];
  groupId: string;
}

// interface for remove users by IDs response
export interface RemoveFromGroupResponse {
  status: string;
  message: string;
}


export interface GetUsersByGroupIdProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
  groupId: string;
}

export interface User {
  id: string;
  role_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  // Add other properties of a user if needed
}

export interface GetUsersByGroupIdResponse {
  status: string;
  data: {
    users: User[];
    totalPages: number;
  };
}





export interface GetAssignedGroupsProps {
  id: string;
}

export interface AssignedGroup {
  id: string;
}

export interface GetAssignedGroupsResponse {
  status: 'success';
  data: AssignedGroup[];
}