import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ShareIcon, Table, Users } from "lucide-react";
import { useGroups } from "../../manage-groups/hooks/useGroups";
import { Group } from "@/lib/types/groupTypes";
import { ApiError } from "@/lib/api/apiError";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useGroupsTableStore from "@/lib/stores/manage-groups-store/groups-table-store";
import { useNotifications } from "../hooks/useNotifications";

interface SendNotificationDialogProps {
  refreshNotifications: () => void;
  notificationId: string;
  isSendNotificationDialogOpen: boolean;
  setIsSendNotificationDialogOpen: (isOpen: boolean) => void;
}

const SendNotificationDialog = ({
  refreshNotifications,
  notificationId,
  isSendNotificationDialogOpen,
  setIsSendNotificationDialogOpen,
}: SendNotificationDialogProps) => {
  // all hooks here
  const { fetchGroups } = useGroups();
  const { addGroupToNotification, removeGroupFromNotification } =
    useNotifications();

  // global states here
  const { sortBy, setOrder } = useGroupsTableStore();

  // local states here
  const [groups, setGroups] = useState<Group[]>([]);

  // all functions here
  const fetchGroupsList = useCallback(async () => {
    try {
      const response = await fetchGroups({
        page: 1,
        pageSize: 999,
        sortBy,
        order: "ASC",
      });
      if (response) {
        setGroups(response.groups);
        console.log(response.groups);
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
  }, [sortBy]);

  const sendNotification = async (groupId: string) => {
    const payload = {
      notificationId,
      groupId,
    };
    try {
      await addGroupToNotification(payload);
      refreshNotifications();
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while sending notification ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while sending notification ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    }
  };

  const removeNotification = async (groupId: string) => {
    const payload = {
      notificationId,
      groupId,
    };
    try {
      await removeGroupFromNotification(payload);
      refreshNotifications();
    } catch (err) {
      if (err instanceof ApiError) {
        toast({
          title: "Error",
          description: `An error occurred while removing notification ${err.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      } else {
        const error = err as Error;
        toast({
          title: "Error",
          description: `An error occurred while removing notification ${error.message}`,
          action: <ToastAction altText="error">ok</ToastAction>,
        });
      }
    }
  };

  // useEffects here
  useEffect(() => {
    fetchGroupsList();
  }, [fetchGroupsList]);

  return (
    <main>
      <Dialog open={isSendNotificationDialogOpen}>
        <DialogContent className="w-[425px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send notification to the groups below...
            </DialogDescription>
            <div className="flex h-[20rem]">
              <div className="relative flex-grow overflow-hidden rounded-2xl  border border-secondary">
                <div className="absolute inset-0 overflow-auto scrollbar-none">
                  <table className="w-full">
                    <thead className="sticky bg-background top-0 z-10">
                      <Schema />
                    </thead>
                    <tbody>
                      {groups.map((group) => (
                        <Row
                          key={group.id}
                          groupName={group.name}
                          sendNotification={() => sendNotification(group.id)}
                          removeNotification={() =>
                            removeNotification(group.id)
                          }
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsSendNotificationDialogOpen(false)}
              variant="default"
              disabled={false}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

interface RowProps {
  groupName: string;
  sendNotification: () => void;
  removeNotification: () => void;
}

const Row = ({ groupName, sendNotification, removeNotification }: RowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium text-left w-[500px]">
        <div className="flex flex-col gap-2">{groupName}</div>
      </TableCell>
      <TableCell>
        <Button size={"sm"} onClick={sendNotification}>
          Send
        </Button>
      </TableCell>
    </TableRow>
  );
};

const Schema = () => {
  return (
    <TableRow className="bg-secondary">
      <TableHead className="cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Users className="h-3 w-3" />
          Groups
        </div>
      </TableHead>
      <TableHead className="cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <ShareIcon className="h-3 w-3" />
          Send
        </div>
      </TableHead>
    </TableRow>
  );
};

export default SendNotificationDialog;
