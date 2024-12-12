"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Bell, Calendar, Eye, Trash2 } from "lucide-react";
import CreateNotificationDialog from "./components/create-notification-dialog";
import DeleteNotificationDialog from "./components/delete-notification-dialog";
import { useNotifications } from "./hooks/useNotifications";
import useNotificationTableStore from "@/lib/stores/manage-notification-store/notifications-table-store";
import { SingleNotification } from "@/lib/types/notifications";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";
import NotificationDialog from "./components/notification-dialog";
import { toast } from "@/components/ui/use-toast";
import { ToastClose } from "@radix-ui/react-toast";
import { truncateText } from "@/lib/helpers/truncate-text";

const ManageNotifications = () => {
  // all hooks here
  const { getNotifications, deleteNotification } = useNotifications();

  // local states here
  const [notifications, setNotifications] = useState<SingleNotification[]>([]);

  // global states here
  const { activePageIndex, displayNumberOfRows, sortBy, order } =
    useNotificationTableStore();

  // all functions here
  const fetchNotifications = async () => {
    const payload = {
      page: activePageIndex,
      pageSize: displayNumberOfRows,
      sortBy,
      order,
    };
    try {
      const response = await getNotifications(payload);
      if (response) {
        setNotifications(response.data.notifications);
      }
    } catch {
      // handle error here
    }
  };

  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  // handle delete notification
  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await deleteNotification({ id });
      if (response) {
        toast({
          title: "Notification Deleted",
          description: "Notification has been deleted successfully",
          action: <ToastClose />,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `An error occurred while deleting notification ${err}`,
        action: <ToastClose />,
      });
    } finally {
      refreshNotifications();
    }
  };

  // useEffects here
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row w-full">
          <CreateNotificationDialog
            refreshNotifications={refreshNotifications}
          />
        </div>
        <Card className="mt-2 h-[calc(100vh-11rem)] flex flex-col">
          <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
            <div className="absolute inset-0 overflow-auto">
              <table className="w-full">
                <thead className="sticky bg-background top-0 z-10">
                  <Schema />
                </thead>
                <tbody>
                  {notifications.map((notification) => (
                    <Row
                      key={notification.id}
                      notification={notification}
                      removeNotification={() =>
                        handleDeleteNotification(notification.id)
                      }
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
        {/* <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
          <Label className="text-xs">
            Showing <strong>1-10</strong> of <strong>32</strong> Roles
          </Label>
          <div className="flex gap-2">
            <Button variant="outline">Previous</Button>
            <Button>Next</Button>
          </div>
        </div> */}
      </div>
    </>
  );
};

// User Table Schema
const Schema = () => {
  return (
    <TableRow>
      <TableHead className="w-[20%] cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Bell className="h-3 w-3" />
          Notifications
        </div>
      </TableHead>
      <TableHead className="w-[25%]">
        <div className="flex flex-row gap-2 items-center text-[10px] cursor-pointer">
          <Calendar className="h-3 w-3" />
          Created At
        </div>
      </TableHead>
      <TableHead className="w-[15%] md:table-cell cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Eye className="h-3 w-3" />
          View
        </div>
      </TableHead>
      <TableHead className="w-[15%] md:table-cell cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Trash2 className="h-3 w-3" />
          Delete
        </div>
      </TableHead>
    </TableRow>
  );
};

interface RowProps {
  notification: SingleNotification;
  removeNotification: () => void;
}

const Row = ({ notification, removeNotification }: RowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium text-left max-w-[10rem]">
        <div className="flex flex-col gap-2 max-w-[8rem] md:max-w-[20rem]">
          <div className="flex flex-col gap-2 items-start text-sm">
            {truncateText(notification.title, 100)}
          </div>
          <div className="text-[10px] text-secondary-foreground font-thin text line-clamp-2">
            {notification.description}
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <Badge variant={"outline"}>
          {
            <div className="flex flex-col gap-2 items-start text-[10px]">
              {formatDate(
                new Date(notification.createdAt),
                "do MMMM yyyy, hh:mm a"
              )}
            </div>
          }
        </Badge>
      </TableCell>
      <TableCell>
        <NotificationDialog notification={notification} />
      </TableCell>
      <TableCell>
        <DeleteNotificationDialog
          notification={notification}
          removeNotification={removeNotification}
        />
      </TableCell>
    </TableRow>
  );
};

export default ManageNotifications;
