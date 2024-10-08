import {
  CreateGroupProps,
  CreateGroupResponse,
  GetGroupsProps,
  GetGroupsResponse,
  UpdateGroupProps,
  UpdateGroupResponse,
  DeleteGroupsProps,
  DeleteGroupsResponse,
  AddToGroupResponse,
  GetUsersByGroupIdProps,
  GetUsersByGroupIdResponse,
  AddToGroupProps,
  GetAssignedGroupsResponse,
  GetAssignedGroupsProps,
  AssignedGroup,
  RemoveFromGroupProps,
  RemoveFromGroupResponse,
} from '@/lib/types/groupTypes';
import {
  createGroup,
  getGroups,
  updateGroup,
  deleteGroups,
  addUsersToGroup,
  removeUsersFromGroup,
  getAssignedGroups,
} from '@/lib/services/user-service/group-service';
import { ApiError } from '@/lib/api/apiError';
import { getUsersByGroupId } from '@/lib/services/user-service/user-service';
import { SingleUser } from '@/lib/types/userTypes';


export const useGroups = () => {
  // Hook Method to create a group
  const addGroup = async (data: CreateGroupProps): Promise<CreateGroupResponse['data']> => {
    try {
      const response: CreateGroupResponse = await createGroup(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {

    }
  };

  // Hook Method to fetch groups
  const fetchGroups = async (params: GetGroupsProps): Promise<GetGroupsResponse['data']> => {
    try {
      const response: GetGroupsResponse = await getGroups(params);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to update a group
  const editGroup = async (data: UpdateGroupProps): Promise<string> => {
    try {
      const response: UpdateGroupResponse = await updateGroup(data);
      return response.message;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to delete groups
  const removeGroups = async (data: DeleteGroupsProps): Promise<string> => {
    try {
      const response: DeleteGroupsResponse = await deleteGroups(data);
      return response.message;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to add users to a group
  const addUsersInGroup = async (data: AddToGroupProps): Promise<string> => {
    try {
      const response: AddToGroupResponse = await addUsersToGroup(data);
      return response.message;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  const removeUsersInGroup = async (data: RemoveFromGroupProps): Promise<string> => {
    try {
      const response: RemoveFromGroupResponse = await removeUsersFromGroup(data);
      return response.message;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  }

  // Hook Method to get users by group ID
  const fetchGroupUsers = async (params: GetUsersByGroupIdProps): Promise<SingleUser[]> => {
    try {
      const response: GetUsersByGroupIdResponse = await getUsersByGroupId(params);
      return response.data.users;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Hook Method to fetch assigned groups
  const fetchAssignedGroups = async ({ id }: GetAssignedGroupsProps): Promise<AssignedGroup[]> => {
    try {
      const response: GetAssignedGroupsResponse = await getAssignedGroups({ id });
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };



  return {
    fetchAssignedGroups,
    addGroup,
    addUsersInGroup,
    removeUsersInGroup,
    fetchGroups,
    editGroup,
    removeGroups,
    fetchGroupUsers,
  };
};