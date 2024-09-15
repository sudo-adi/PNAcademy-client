import { useState } from 'react';
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
  RemoveFromGroupResponse,
  GetUsersByGroupIdProps,
  GetUsersByGroupIdResponse,
  Group,
  AddToGroupProps,
  AssignedGroup,
  GetAssignedGroupsResponse,
  GetAssignedGroupsProps,
} from '@/lib/types/groupTypes';
import {
  createGroup,
  getGroups,
  updateGroup,
  deleteGroups,
  addUsersToGroup,
  removeUsersFromGroup,
  GetUsersByGroupId,
  getAssignedGroups,
} from '@/lib/services/user-service/group-service';
import { ApiError } from '@/lib/api/apiError';

export const useGroups = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);
  const [createdGroupRes, setCreatedGroupRes] = useState<CreateGroupResponse | null>(null);
  const [fetchedGroupsRes, setFetchedGroupsRes] = useState<GetGroupsResponse | null>(null);
  const [updatedGroupRes, setUpdatedGroupRes] = useState<UpdateGroupResponse | null>(null);
  const [deletedGroupsRes, setDeletedGroupsRes] = useState<DeleteGroupsResponse | null>(null);
  const [groupUsersRes, setGroupUsersRes] = useState<GetUsersByGroupIdResponse | null>(null);
  const [addedUsersRes, setAddedUsersRes] = useState<AddToGroupResponse | null>(null);
  const [removedUsersRes] = useState<RemoveFromGroupResponse | null>(null);
  const [assignedGroups, setAssignedGroups] = useState<AssignedGroup[]>([]);
  // Function to create a group
  const addGroup = async (data: CreateGroupProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: CreateGroupResponse | null = await createGroup(data);
      if (response) {
        console.info('Group created:', response);
        setCreatedGroupRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch groups
  const fetchGroups = async (params: GetGroupsProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GetGroupsResponse | null = await getGroups(params);
      if (response) {
        setGroups(response.data.groups);
        setFetchedGroupsRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to update a group
  const editGroup = async (data: UpdateGroupProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: UpdateGroupResponse | null = await updateGroup(data);
      if (response) {
        console.info('Group updated:', response);
        setUpdatedGroupRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to delete groups
  const removeGroups = async (data: DeleteGroupsProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: DeleteGroupsResponse | null = await deleteGroups(data);
      if (response) {
        console.info('Groups deleted:', response);
        setDeletedGroupsRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to add users to a group
  const addUsersInGroup = async (data: AddToGroupProps) => {
    console.log(data);
    setLoading(true);
    setError(null);
    try {
      const response: AddToGroupResponse | null = await addUsersToGroup(data);
      if (response) {
        console.info('Users added to group:', response);
        setAddedUsersRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to get users by group ID
  const fetchGroupUsers = async (params: GetUsersByGroupIdProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GetUsersByGroupIdResponse | null = await GetUsersByGroupId(params);
      if (response) {
        setGroupUsersRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch assigned groups
  const fetchAssignedGroups = async ({ id }: GetAssignedGroupsProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GetAssignedGroupsResponse | null = await getAssignedGroups({ id });
      if (response) {
        setAssignedGroups(response.data);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };






  return {
    assignedGroups,
    fetchAssignedGroups,
    groups,
    loading,
    error,
    createdGroupRes,
    fetchedGroupsRes,
    updatedGroupRes,
    deletedGroupsRes,
    groupUsersRes,
    addedUsersRes,
    removedUsersRes,
    addGroup,
    addUsersInGroup,
    fetchGroups,
    editGroup,
    removeGroups,
    addUsersToGroup,
    removeUsersFromGroup,
    fetchGroupUsers,
  };
};
