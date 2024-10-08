import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { retry } from '@/lib/api/retryApiCalls';
import { AddToGroupProps, AddToGroupResponse, CreateGroupProps, CreateGroupResponse, DeleteGroupsProps, DeleteGroupsResponse, GetAssignedGroupsProps, GetAssignedGroupsResponse, GetGroupsProps, GetGroupsResponse, GetUsersByGroupIdProps, GetUsersByGroupIdResponse, RemoveFromGroupProps, RemoveFromGroupResponse, UpdateGroupProps, UpdateGroupResponse } from '@/lib/types/groupTypes';
import { AxiosError } from 'axios';

// Service to Create a Group
export const createGroup = async (data: CreateGroupProps): Promise<CreateGroupResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<CreateGroupResponse>('/v1/create-group', data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
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
  });
};

// Function to get all groups
export const getGroups = async (data: GetGroupsProps): Promise<GetGroupsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetGroupsResponse>('/v1/groups', { params: data });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
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
  });
};

// Function to update a Group
export const updateGroup = async (data: UpdateGroupProps): Promise<UpdateGroupResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateGroupResponse>('/v1/group', data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
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
  });
};

// Function to delete Groups
export const deleteGroups = async ({ groupIds }: DeleteGroupsProps): Promise<DeleteGroupsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteGroupsResponse>('/v1/groups', { data: { groupIds } });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
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
  });
};

// Function to add users to a group
export const addUsersToGroup = async (data: AddToGroupProps): Promise<AddToGroupResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<AddToGroupResponse>('/v1/user/add-to-group', data);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
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
  });
};

// Function to remove users from group
export const removeUsersFromGroup = async (data: RemoveFromGroupProps): Promise<RemoveFromGroupResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<RemoveFromGroupResponse>('/v1/user/remove-from-group', { data });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
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
  });
};

// Function to get assigned groups for an assessment
export const getAssignedGroups = async ({ id }: GetAssignedGroupsProps): Promise<GetAssignedGroupsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAssignedGroupsResponse>(`/v1/assessment/group`, {
        params: { id },
      });
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { status, data } = error.response || {};
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid UUID format', data);
          case 401:
            throw new ApiError(status, 'Unauthorized: User doesn\'t have the required permissions', data);
          case 404:
            throw new ApiError(status, 'Not Found: No assigned groups found for the given assessment', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status || 500, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'An unexpected error occurred', error);
      }
    }
  });
};
