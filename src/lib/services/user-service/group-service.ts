
import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AddToGroupProps, AddToGroupResponse, CreateGroupProps, CreateGroupResponse, DeleteGroupsProps, DeleteGroupsResponse, GetGroupsProps, GetGroupsResponse, GetUsersByGroupIdProps, GetUsersByGroupIdResponse, RemoveFromGroupProps, RemoveFromGroupResponse, UpdateGroupProps, UpdateGroupResponse } from '@/lib/types/groupTypes';
import { AxiosError } from 'axios';


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
        case 409:
          throw new ApiError(status, 'Conflict: Group Already Exists', data);
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


export const GetUsersByGroupId = async (data: GetUsersByGroupIdProps): Promise<GetUsersByGroupIdResponse | null> => {
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