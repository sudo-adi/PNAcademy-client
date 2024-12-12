import { Card } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";
// import CreateGroupDialog from './components/dialog-box/create-group-dialog'
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateInIST } from "@/lib/helpers/time-converter";
import { Group } from "@/lib/types/groupTypes";
import {
  Calendar,
  Clock,
  MousePointer2,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import EditGroupDialog from "./components/dialog-box/edit-group-dialog";
import ViewGroupDialog from "./components/dialog-box/view-group-dialog";
import useGroupsTableStore from "@/lib/stores/manage-groups-store/groups-table-store";
import { useGroups } from "./hooks/useGroups";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api/apiError";
import CreateGroupDialog from "./components/dialog-box/create-group-dialog";
import DeleteGroupDialog from "./components/dialog-box/delete-group-dialog";

const ManageGroups = () => {
  // all hooks here
  const { fetchGroups, removeGroups } = useGroups();

  // global states
  const {
    activePageIndex,
    displayNumberOfRows,
    sortBy,
    order,
    setSortBy,
    setOrder,
  } = useGroupsTableStore();

  // local states here
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
  const [groups, setGroups] = useState<Group[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(false);

  // local vars
  const allSelected =
    groups.length > 0 && selectedGroups.size === groups.length;

  // local functions here
  const fetchGroupsData = useCallback(async () => {
    try {
      const response = await fetchGroups({
        page: activePageIndex,
        pageSize: displayNumberOfRows,
        sortBy,
        order,
      });
      setGroups(response.groups);
      setTotalPages(response.totalPages);
    } catch (err) {
      if (err instanceof ApiError) {
      } else {
      }
    }
  }, [sortBy, order]);

  const refreshGroups = () => {
    fetchGroupsData();
  };

  // local handelers here

  const handleToggleSorting = (field: keyof Group) => {
    if (sortBy === field) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setOrder("ASC");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedGroups(new Set(groups.map((user) => user.id)));
    } else {
      setSelectedGroups(new Set());
    }
  };

  const handleSelectGroup = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedGroups);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedGroups(updatedSelectedUsers);
  };

  const handleDeleteSelected = async () => {
    await removeGroups({ groupIds: Array.from(selectedGroups) });
    console.log(Array.from(selectedGroups));
    setSelectedGroups(new Set());
    refreshGroups();
  };

  // useEffect
  useEffect(() => {
    fetchGroupsData();
  }, [fetchGroupsData]);

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-10rem)] w-full">
        <div className="flex flex-row w-full items-center justify-between border-dashed gap-2">
          <div className="flex flex-row gap-2">
            <CreateGroupDialog refreshGroups={refreshGroups} />
            {selectedGroups.size > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Groups
              </Button>
            )}
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2 p-0 max-h-[20px]">
            <Input type="email" placeholder="Search Group..." />
            <Button
              size="sm"
              type="submit"
              className="flex items-center justify-center gap-1"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
        <Card className=" h-[calc(100vh-11rem)] flex flex-col mt-2">
          <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
            <div className="absolute inset-0 overflow-auto">
              <table className="w-full">
                <thead className="sticky bg-background top-0 z-10">
                  <Schema
                    toggleSorting={handleToggleSorting}
                    sortBy={sortBy}
                    order={order}
                    allSelected={allSelected}
                    onSelectAll={handleSelectAll}
                  />
                </thead>
                <tbody>
                  {groups.map((group: Group) => (
                    <Row
                      key={group.id}
                      group={group}
                      selected={selectedGroups.has(group.id)}
                      onSelectGroup={handleSelectGroup}
                      refreshGroups={refreshGroups}
                      loading={false}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex h-[1rem] items-center justify-between gap-2">
        <Label className="text-xs">
          Showing {groups.length} of {totalPages} Pages
        </Label>
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
    </>
  );
};

interface SchemaProps {
  toggleSorting: (field: keyof Group) => void;
  sortBy: keyof Group;
  order: "ASC" | "DESC";
  allSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const Schema: React.FC<SchemaProps> = ({
  toggleSorting,
  sortBy,
  order,
  allSelected,
  onSelectAll,
}) => (
  <TableRow>
    <TableHead className="sm:table-cell">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={allSelected}
          onCheckedChange={(checked) => onSelectAll(checked as boolean)}
        />
      </div>
    </TableHead>
    <TableHead onClick={() => toggleSorting("name")}>
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
        <Calendar className="h-3 w-3" />
        Created At {sortBy === "createdAt" && (order === "ASC" ? "↓" : "↑")}
      </div>
    </TableHead>
    <TableHead
      onClick={() => toggleSorting("updatedAt")}
      className="hidden md:table-cell"
    >
      <div className="flex gap-2 items-center cursor-pointer text-[10px]">
        <Clock className="h-3 w-3" />
        Updated At {sortBy === "updatedAt" && (order === "ASC" ? "↓" : "↑")}
      </div>
    </TableHead>
    <TableHead>
      <div className="flex items-center cursor-default text-[10px]">
        <MousePointer2 className="h-3 w-3 mr-2" />
        Actions
      </div>
    </TableHead>
  </TableRow>
);

interface RowProps {
  group: Group;
  selected: boolean;
  onSelectGroup: (groupId: string, checked: boolean) => void;
  refreshGroups: () => void;
  loading: boolean;
}

const Row: React.FC<RowProps> = ({
  group,
  selected,
  onSelectGroup,
  refreshGroups,
  loading,
}) => {
  return (
    <TableRow>
      <TableCell className="fsm:table-cell">
        <Checkbox
          checked={selected}
          onCheckedChange={(checked) =>
            onSelectGroup(group.id, checked as boolean)
          }
        />
      </TableCell>
      <TableCell className="font-medium text-left text-xs">
        {loading ? <Skeleton className="w-32 h-4" /> : group.name}
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          formatDateInIST(group.createdAt)
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs">
        {loading ? (
          <Skeleton className="w-32 h-4" />
        ) : (
          formatDateInIST(group.updatedAt)
        )}
      </TableCell>
      <TableCell>
        <div className="flex gap-4 text-xs">
          {loading ? (
            <Skeleton className="w-8 h-8" />
          ) : (
            <ViewGroupDialog group={group} />
          )}
          {loading ? (
            <Skeleton className="w-8 h-8" />
          ) : (
            <EditGroupDialog group={group} refreshGroups={refreshGroups} />
          )}
          {loading ? (
            <Skeleton className="w-8 h-8" />
          ) : (
            <DeleteGroupDialog group={group} refreshGroups={refreshGroups} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ManageGroups;
