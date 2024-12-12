import React, { useCallback, useEffect, useState } from "react";
import { FileDownIcon, Trash2 } from "lucide-react";
import { useUsers } from "../../hooks/useUsers";
import { SingleUser } from "@/lib/types/userTypes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CreateUserDialog from "../dialog-box/create-user-dialog";
import ImportCsvDialog from "../dialog-box/import-users-csv-dialog";
import useUserTableStore from "@/lib/stores/manage-users-store/user-table-store";
import { ApiError } from "@/lib/api/apiError";
import UserTable from "../table/user-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const UsersTabContent: React.FC = () => {
  // Toast hook
  const { toast } = useToast();

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // all hooks here
  const { fetchUsers, removeUsers } = useUsers();

  // global states here
  const {
    activePageIndex,
    displayNumberOfRows,
    sortBy,
    order,
    setOrder,
    setSortBy,
  } = useUserTableStore();

  // local states here
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [users, setUsers] = useState<SingleUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);

  // local vars here
  const allSelected = users.length > 0 && selectedUsers.size === users.length;

  // local functions here
  const fetchUsersData = useCallback(async () => {
    const payload = {
      page: activePageIndex,
      pageSize: displayNumberOfRows,
      sortBy,
      order,
    };
    try {
      setLoadingUsers(true);
      const response = await fetchUsers(payload);
      setUsers(response.users);
    } catch (err) {
      toast({
        title: "Error Fetching Users",
        description:
          err instanceof ApiError ? err.message : "Unable to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoadingUsers(false);
    }
  }, [sortBy, order]);

  const refreshUsers = () => {
    fetchUsersData();
  };

  // handlers here
  const handleToggleSorting = (field: keyof SingleUser) => {
    if (sortBy === field) {
      setOrder(order === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(field);
      setOrder("ASC");
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(users.map((user) => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (checked) {
      updatedSelectedUsers.add(userId);
    } else {
      updatedSelectedUsers.delete(userId);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleDeleteSelected = async () => {
    try {
      setDeleting(true);
      await removeUsers({ userIds: Array.from(selectedUsers) });

      // Success toast
      toast({
        title: "Users Deleted",
        description: `${selectedUsers.size} user(s) have been deleted successfully.`,
        variant: "default",
      });

      setSelectedUsers(new Set());
      refreshUsers();
    } catch (err) {
      // Error toast
      toast({
        title: "Error Deleting Users",
        description:
          err instanceof ApiError
            ? err.message
            : "Unable to delete selected users",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setShowDeleteConfirmation(false);
    }
  };

  // useEffects here
  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  return (
    <>
      <Card className="flex flex-row w-full gap-2 p-1 justify-between border-dashed">
        <div className="flex flex-row items-center gap-2">
          <CreateUserDialog refreshUsers={refreshUsers} />
          {selectedUsers.size > 0 && (
            <Button
              size={"sm"}
              variant="destructive"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          )}
        </div>
        <div className="flex gap-1">
          <ImportCsvDialog />
          <Button size="sm" variant="outline">
            <FileDownIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </Card>

      <UserTable
        toggleSorting={handleToggleSorting}
        sortBy={sortBy}
        order={order}
        allSelected={allSelected}
        users={users}
        selectedUsers={selectedUsers}
        loadingUsers={loadingUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
        refreshUsers={refreshUsers}
      />

      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className="text-[10px]"> {users.length} users</Label>
        <div className="flex gap-2">{/* Pagination placeholders */}</div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirmation}
        onOpenChange={setShowDeleteConfirmation}
      >
        <DialogContent
          className={`
            ${isMobile ? "min-w-[95%] max-w-[95%] rounded-lg" : "max-w-[500px]"}
          `}
        >
          <DialogHeader>
            <DialogTitle
              className={`
                ${isMobile ? "text-lg" : "text-xl"}
              `}
            >
              Confirm Delete
            </DialogTitle>
            <DialogDescription
              className={`
                ${isMobile ? "text-xs" : ""}
              `}
            >
              Are you sure you want to delete {selectedUsers.size} selected
              user(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div
              className={`
                flex
                ${isMobile ? "flex-col" : "flex-row"}
                w-full
                justify-between
                ${isMobile ? "gap-2" : "gap-4"}
              `}
            >
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className={`
                    ${isMobile ? "w-full text-xs h-8" : ""}
                  `}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDeleteSelected}
                disabled={deleting}
                className={`
                  ${isMobile ? "w-full text-xs h-8" : ""}
                  flex items-center
                `}
              >
                {deleting ? (
                  <>
                    <Trash2
                      className={`
                      animate-spin
                      ${isMobile ? "h-4 w-4 mr-2" : "h-4 w-4 mr-2"}
                    `}
                    />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2
                      className={`
                      ${isMobile ? "h-4 w-4 mr-2" : "h-4 w-4 mr-2"}
                    `}
                    />
                    Delete
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UsersTabContent;
