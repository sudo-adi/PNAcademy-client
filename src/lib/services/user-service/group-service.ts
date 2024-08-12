
import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AxiosError } from 'axios';


// interface for createGroup props
interface CreateGroupProps {
  name: string;
}

// interface for createGroup response
interface CreateGroupResponse {
  message: string;
  data: {
    name: string;
    id: string;
    updatedAt: string;
    createdAt: string;
  };
}


// Function to Create a Group
export const createGroup = async (data: CreateGroupProps): Promise<CreateGroupResponse | null> => {
  try {
    const response = await axiosInstance.post<CreateGroupResponse>('v1/create-group', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Group created successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
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


// interface for getGroups props
interface GetGroupsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

// interface for getGroups response
interface GetGroupsResponse {
  message: string;
  data: {
    groups: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    }[];
    totalPages: number;
  };
}

// Function to get all groups
export const getGroups = async (data: GetGroupsProps): Promise<GetGroupsResponse | null> => {
  try {
    const response = await axiosInstance.get<GetGroupsResponse>(`/v1/groups`, {
      params: data,
    });
    if (response.status === 200 || response.status === 201) {
      console.info('Groups retrieved successfully', response.data);
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
          throw new ApiError(status, 'Unauthorized', data);
        case 404:
          throw new ApiError(status, 'Not Found: Groups not found', data);
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


// interface for getGroupById props
interface UpdateGroupProps {
  id: string;
  name: string;
}

// interface for getGroupById response
interface UpdateGroupResponse {
  message: string;
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}


// Function to get a Group by ID
export const updateGroup = async (data: UpdateGroupProps): Promise<UpdateGroupResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateGroupResponse>('/v1/group', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Group updated successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
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


// interface for deleteGroup props
interface DeleteGroupsProps {
  groupIds: string[];
}

// interface for deleteGroup response
interface DeleteGroupsResponse {
  message: string;
}



// Function to delete a Group
export const deleteGroups = async ({ groupIds }: DeleteGroupsProps): Promise<DeleteGroupsResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteGroupsResponse>('/v1/groups', {
      data: { groupIds },
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Groups deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Group(s) not found', data);
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


// interface for get user by ID props
interface AddToGroupProps {
  userIds: string[];
  groupId: string;
}

// interface for get user by ID response
interface AddToGroupResponse {
  status: string;
  message: string;
}

// Function to add users to a group
export const addUsersToGroup = async (data: AddToGroupProps): Promise<AddToGroupResponse | null> => {
  try {
    const response = await axiosInstance.post<AddToGroupResponse>('/v1/user/add-to-group', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Users added successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid request body or parameters', data);
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

// interface for remove users by IDs props
interface RemoveFromGroupProps {
  userIds: string[];
  groupId: string;
}

// interface for remove users by IDs response
interface RemoveFromGroupResponse {
  status: string;
  message: string;
}

// Function to remove users from group
export const removeUsersFromGroup = async (data: RemoveFromGroupProps): Promise<RemoveFromGroupResponse | null> => {
  try {
    const response = await axiosInstance.delete<RemoveFromGroupResponse>('/v1/user/remove-from-group', {
      data
    });
    if (response.status === 200 || response.status === 201) {
      console.info('Users removed successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid request body or parameters', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: Access is denied due to invalid credentials', data);
        case 404:
          throw new ApiError(status, 'Not Found: Group or user(s) not found', data);
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

interface GetUsersByGroupIdProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "first_name" | "last_name" | "email" | "phone" | "role_id" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
  groupId: string;
}

interface User {
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

interface GetUsersByGroupIdResponse {
  status: string;
  data: {
    users: User[];
    totalPages: number;
  };
}

export const GetUsersByGroupId = async (
  data: GetUsersByGroupIdProps
): Promise<GetUsersByGroupIdResponse | null> => {
  try {
    const response = await axiosInstance.get<GetUsersByGroupIdResponse>('/v1/user/by-group', {
      params: data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Users fetched successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 401:
          throw new ApiError(status, 'Unauthorized', data);
        case 500:
          throw new ApiError(status, 'Internal server error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};