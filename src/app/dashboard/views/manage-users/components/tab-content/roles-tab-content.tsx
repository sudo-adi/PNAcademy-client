import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import CreateRoleDialog from "../dialog-box/create-role-dialog";
import { Label } from "@radix-ui/react-label";
import { useRoles } from "../../hooks/useRoles";
import useRolesTableStore from "@/lib/stores/manage-users-store/roles-table-store";
import { Role, ToggleSortingProps } from "@/lib/types/roleTypes";
import { ApiError } from "@/lib/api/apiError";
import RolesTableRow from "../table/roles-table-row";
import RolesTableSchema from "../table/roles-table-schema";

// global props

const RolesTabContent = () => {
  // all hooks here
  const { fetchRoles, removeRoles } = useRoles();

  // global states here
  const {
    activePageIndex,
    displayNumberOfRows,
    sortBy,
    order,
    setOrder,
    setSortBy,
  } = useRolesTableStore();

  // local states here
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());

  const [loadingRoles, setLaoadingRoles] = useState<boolean>(true);

  // local vars here
  const allSelected = roles.length > 0 && selectedRoles.size === roles.length;

  // local functions here
  const fetchRolesData = useCallback(async () => {
    try {
      setLaoadingRoles(true);
      const response = await fetchRoles({
        page: activePageIndex,
        pageSize: displayNumberOfRows,
        sortBy,
        order,
      });
      setRoles(response);
    } catch (err) {
      if (err instanceof ApiError) {
      } else {
      }
    } finally {
      setLaoadingRoles(false);
    }
  }, [sortBy, order]);

  const refreshRoles = () => {
    fetchRolesData();
  };

  // handlers here
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRoles(new Set(roles.map((user) => user.id)));
    } else {
      setSelectedRoles(new Set());
    }
  };

  const handleSelectRole = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedRoles);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedRoles(updatedSelectedUsers);
  };

  const handleDeleteSelected = async () => {
    await removeRoles({
      roleIds: Array.from(selectedRoles).map((roleId) => ({ roleId })),
    });
    console.log(Array.from(selectedRoles));
    setSelectedRoles(new Set());
    refreshRoles();
  };

  const handleToggleSorting = ({ field }: ToggleSortingProps) => {
    if (sortBy === field) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setOrder("ASC");
    }
  };

  // useEffects here
  useEffect(() => {
    fetchRolesData();
  }, [fetchRolesData]);

  return (
    <>
      <Card className="flex flex-row w-full gap-2 p-1 justify-between border-dashed">
        <div className="flex gap-2">
          <CreateRoleDialog refreshRoles={refreshRoles} />
          {selectedRoles.size > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDeleteSelected}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
        </div>
      </Card>
      <Card className="my-2 h-[calc(100vh-18rem)] flex flex-col">
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-auto scrollbar-thin">
            <table className="w-full">
              <thead className="sticky bg-background top-0 z-10">
                <RolesTableSchema
                  toggleSorting={handleToggleSorting}
                  sortBy={sortBy}
                  order={order}
                  allSelected={allSelected}
                  onSelectAll={handleSelectAll}
                />
              </thead>
              <tbody>
                {roles.map((role: Role) => (
                  <RolesTableRow
                    key={role.id}
                    role={role}
                    selected={selectedRoles.has(role.id)}
                    onSelectRole={handleSelectRole}
                    refreshRoles={refreshRoles}
                    loading={loadingRoles}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className=" text-[10px]"> {roles.length} Roles</Label>
        {/* <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div> */}
      </div>
    </>
  );
};

export default RolesTabContent;
