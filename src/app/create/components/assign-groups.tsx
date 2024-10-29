import { useAssessment } from "@/app/dashboard/views/manage-assessment/hooks/useAssessment";
import { useGroups } from "@/app/dashboard/views/manage-groups/hooks/useGroups";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { ApiError } from "@/lib/api/apiError";
import useGroupsTableStore from "@/lib/stores/manage-groups-store/groups-table-store";
import { AssignedGroup, Group } from "@/lib/types/groupTypes";
import { Loader, Plus, Users, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface AssignedGroupsCardProps {
  assessmentId: string;
}

const AssignedGroupsCard: React.FC<AssignedGroupsCardProps> = ({
  assessmentId,
}) => {
  // all hooks here
  const { fetchGroups, fetchAssignedGroups } = useGroups();
  const { assignAssessmentToGroup, removeAssessmentFromGroup } =
    useAssessment();

  // global states here
  const { sortBy, order, setSortBy, setOrder } = useGroupsTableStore();

  // local states here
  const [groups, setGroups] = useState<Group[]>([]);
  const [assignedGroups, setAssignedGroups] = useState<AssignedGroup[]>([]);

  // loading states here
  const [fetchingGroups, setFetchingGroups] = useState<boolean>(false);
  const [fetchingAssignedGroups, setFetchingAssignedGroups] =
    useState<boolean>(false);
  const [loadingGroupIds, setLoadingGroupIds] = useState<Set<string>>(
    new Set()
  );
  const [assigningGroup, setAssigningGroup] = useState<boolean>(false);
  const [removingGroup, setRemovingGroup] = useState<boolean>(false);

  // local vars here
  const groupList = (groups as Group[]) ?? [];
  const unassignedGroups = groupList.filter(
    (group) =>
      !assignedGroups.some((assignedGroup) => assignedGroup.id === group.id)
  );

  // all functions here

  const fetchGroupsList = useCallback(async () => {
    try {
      const response = await fetchGroups({
        page: 1,
        pageSize: 999,
        sortBy,
        order,
      });
      if (response) {
        setGroups(response.groups);
      } else {
        throw new Error("Failed to fetch groups");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while fetching groups ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while fetching group ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    }
  }, [sortBy, order]);

  const fetchAssignedGroupsList = useCallback(async () => {
    try {
      setFetchingAssignedGroups(true);
      const response = await fetchAssignedGroups({ id: assessmentId });
      if (response) {
        setAssignedGroups(response);
      } else {
        throw new Error("Failed to fetch assigned groups");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while fetching groups ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while fetching group ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    } finally {
      setFetchingAssignedGroups(false);
    }
  }, [assessmentId]);

  const refreshGroups = () => {
    fetchGroupsList();
    fetchAssignedGroupsList();
  };

  // handlers here

  const handleToggleSorting = (field: keyof Group) => {
    if (sortBy === field) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setOrder("ASC");
    }
  };

  const handleRemoveAssessmentFromGroup = async (groupId: string) => {
    try {
      setLoadingGroupIds((prev) => new Set(prev).add(groupId));
      const response = await removeAssessmentFromGroup({
        assessmentId,
        groupId,
      });
      if (!response) {
        throw new Error("Failed to remove assessment from group");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `Error removing assessment from group: ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `Error removing assessment from group: ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    } finally {
      setLoadingGroupIds((prev) => {
        const updated = new Set(prev);
        updated.delete(groupId);
        return updated;
      });
      refreshGroups();
    }
  };

  const handleAssignAssessmentToGroup = async (groupId: string) => {
    try {
      setLoadingGroupIds((prev) => new Set(prev).add(groupId));
      const response = await assignAssessmentToGroup({ assessmentId, groupId });
      if (!response) {
        throw new Error("Failed to assign assessment to group");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `Error assigning assessment to group: ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `Error assigning assessment to group: ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    } finally {
      setLoadingGroupIds((prev) => {
        const updated = new Set(prev);
        updated.delete(groupId);
        return updated;
      });
      refreshGroups();
    }
  };

  // all use effects here
  useEffect(() => {
    fetchGroupsList();
  }, [fetchGroupsList]);

  useEffect(() => {
    fetchAssignedGroupsList();
  }, [fetchAssignedGroupsList]);

  return (
    <>
      <Card className="min-h-[14rem] flex flex-col scrollbar-none">
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-auto scrollbar-none">
            <table className="w-full scrollbar-none">
              <thead className="sticky bg-background top-0 z-10">
                <Schema
                  toggleSorting={handleToggleSorting}
                  sortBy={sortBy}
                  order={order}
                />
              </thead>
              <tbody>
                {unassignedGroups.length === 0 && !fetchingGroups ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No unassigned groups found
                    </TableCell>
                  </TableRow>
                ) : (
                  unassignedGroups.map((group: Group) => (
                    <Row
                      key={group.id}
                      group={group}
                      add={() => handleAssignAssessmentToGroup(group.id)}
                      refreshGroups={refreshGroups}
                      loading={fetchingGroups}
                      isActionLoading={loadingGroupIds.has(group.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <Card className="min-h-[10rem] w-full px-2 pt-2">
        <div className="flex h-[2rem] border-b-2 border-secondary p-2">
          Selected Groups
        </div>
        <div className="flex flex-wrap gap-2 px-2 pt-2 overflow-y-scroll scrollbar-none max-h-[12rem] overflow-hidden">
          {assignedGroups.length === 0 && !fetchingAssignedGroups ? (
            <div className="w-full text-center py-8 text-muted-foreground">
              No groups assigned to this assessment
            </div>
          ) : (
            assignedGroups.map((group) => (
              <AssignGroupBadge
                key={group.id}
                group={group}
                removeAssessmentFromGroup={() =>
                  handleRemoveAssessmentFromGroup(group.id)
                }
                removingGroup={loadingGroupIds.has(group.id)}
              />
            ))
          )}
        </div>
      </Card>
    </>
  );
};

interface SchemaProps {
  toggleSorting: (field: keyof Group) => void;
  sortBy: keyof Group;
  order: "ASC" | "DESC";
}

const Schema: React.FC<SchemaProps> = ({ toggleSorting, sortBy, order }) => (
  <TableRow>
    <TableHead
      onClick={() => toggleSorting("name")}
      className="max-w-[8rem] lg:w-full"
    >
      <div className="flex gap-2 items-center cursor-pointer text-[10px] w-36">
        <Users className="h-3 w-3" />
        Name {sortBy === "name" && (order === "ASC" ? "↓" : "↑")}
      </div>
    </TableHead>
    <TableHead
      onClick={() => toggleSorting("createdAt")}
      className="hidden md:table-cell"
    >
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Plus className="h-3 w-3" />
        Add
      </div>
    </TableHead>
  </TableRow>
);

interface AssignGroupBadgeProps {
  group: AssignedGroup;
  removingGroup: boolean;
  removeAssessmentFromGroup: () => void;
}

const AssignGroupBadge: React.FC<AssignGroupBadgeProps> = ({
  group,
  removeAssessmentFromGroup,
  removingGroup,
}) => {
  return (
    <Badge
      className={`flex gap-2 cursor-pointer hover:scale-105 transition-all duration-300 ${
        removingGroup ? "opacity-50" : ""
      }`}
    >
      {group.name}
      <button
        onClick={removeAssessmentFromGroup}
        disabled={removingGroup}
        className="disabled:cursor-not-allowed"
      >
        {removingGroup ? (
          <Loader className="h-4 w-4 rounded-full" />
        ) : (
          <X className="h-4 w-4 hover:scale-125 transition-all duration-300 hover:border rounded-full" />
        )}
      </button>
    </Badge>
  );
};

interface RowProps {
  group: Group;
  add: () => void;
  refreshGroups: () => void;
  loading: boolean;
  isActionLoading: boolean;
}

const Row: React.FC<RowProps> = ({ group, loading, add, isActionLoading }) => (
  <TableRow>
    <TableCell className="font-medium text-left text-xs">
      {loading ? <Skeleton className="w-32 h-4" /> : group.name}
    </TableCell>
    <TableCell>
      <button
        onClick={add}
        disabled={isActionLoading}
        className="disabled:cursor-not-allowed"
      >
        <Badge
          className={`cursor-pointer ${isActionLoading ? "opacity-50" : ""}`}
        >
          {isActionLoading ? <Loader className="h-4 w-4" /> : "+"}
        </Badge>
      </button>
    </TableCell>
  </TableRow>
);

export default AssignedGroupsCard;
