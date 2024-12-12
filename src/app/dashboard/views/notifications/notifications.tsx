"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Bell, CalendarDays, Eye, RotateCw } from "lucide-react";
import useNotificationTableStore from "@/lib/stores/manage-notification-store/notifications-table-store";
import { SingleNotification } from "@/lib/types/notifications";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "date-fns";
import NotificationDialog from "../manage-notifications/components/notification-dialog";
import { useNotifications } from "../manage-notifications/hooks/useNotifications";
import { truncateText } from "@/lib/helpers/truncate-text";

const ManageNotifications = () => {
  // all hooks here
  const { getAssignedNotifications } = useNotifications();

  // local states here
  const [notifications, setNotifications] = useState<SingleNotification[]>([]);
  const [refreshingNotifications, setRefreshingNotifications] =
    useState<boolean>(false);

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
      const response = await getAssignedNotifications(payload);
      if (response) {
        setNotifications(response.data.notifications);
      }
    } catch {}
  };

  const refreshNotifications = async () => {
    setRefreshingNotifications(true);
    await fetchNotifications();
    setRefreshingNotifications(false);
  };

  // useEffects here
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex">
          <Button
            onClick={refreshNotifications}
            disabled={refreshingNotifications}
            className="dark:text-black text-white"
          >
            <RotateCw
              className={`h-4 w-4 mr-2 ${
                refreshingNotifications && "animate-spin clock"
              }`}
            />
            Refresh{" "}
          </Button>
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
                    <Row key={notification.id} notification={notification} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
        {/* <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
          <Label className="text-xs">
            Showing <strong>1-10</strong> of <strong>32</strong> Roles
          </Label>    <div className="flex gap-2">
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
      <TableHead className="cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Bell className="h-3 w-3" />
          Notifications
        </div>
      </TableHead>
      <TableHead>
        <div className="flex flex-row gap-2 items-center text-[10px] cursor-pointer">
          <CalendarDays className="h-3 w-3" />
          Received At
        </div>
      </TableHead>
      <TableHead className="md:table-cell cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Eye className="h-3 w-3" />
          View
        </div>
      </TableHead>
    </TableRow>
  );
};

interface RowProps {
  notification: SingleNotification;
}

const Row = ({ notification }: RowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium text-sm text-left xl:w-[500px]">
        <div className="flex flex-col gap-2 max-w-[8rem] md:max-w-[20rem]">
          <div className="flex flex-col gap-2 items-start">
            {truncateText(notification.title, 100)}
          </div>
          <div className="text-[10px] text-secondary-foreground font-thin text line-clamp-2">
            {notification.description}
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <Badge variant={"outline"} className="text-[10px] text-center">
          {formatDate(
            new Date(notification.createdAt),
            "do MMMM yyyy, hh:mm a"
          )}
        </Badge>
      </TableCell>
      <TableCell>
        <NotificationDialog notification={notification} />
      </TableCell>
    </TableRow>
  );
};

export default ManageNotifications;
