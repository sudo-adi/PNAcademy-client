import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Bell, Calendar, Eye, Trash2 } from "lucide-react";
import React from "react";
import ViewNotificationDialog from "../dialog-box/view-notification-dialog";

const AllTabContent = () => {
  return (
    <>
      <Card className="flex flex-row w-full p-2 justify-between border-dashed">
        <div className="flex gap-2">{/* <CreateNotificationDialog /> */}</div>
        <div className="flex gap-2"></div>
      </Card>
      <Card className="my-2 h-[calc(100vh-18rem)] flex flex-col">
        <div className="relative flex-grow overflow-hidden rounded-2xl scrollbar-none">
          <div className="absolute inset-0 overflow-auto">
            <table className="w-full">
              <thead className="sticky bg-background top-0 z-10">
                <Schema />
              </thead>
              <tbody>
                <Row />
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className="text-xs">
          Showing <strong>1-10</strong> of <strong>32</strong> Roles
        </Label>
        <div className="flex gap-2">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
    </>
  );
};

// User Table Schema
const Schema = () => {
  return (
    <TableRow>
      <TableHead className="hidden sm:table-cell">
        <div className="flex items-center gap-2 flex-row text-[10px]">
          <Checkbox />
        </div>
      </TableHead>
      <TableHead className="cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Bell className="h-3 w-3" />
          Notifications
        </div>
      </TableHead>
      <TableHead>
        <div className="flex flex-row gap-2 items-center text-[10px] cursor-pointer">
          <Calendar className="h-3 w-3" />
          Created At
        </div>
      </TableHead>
      <TableHead className="md:table-cell cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Eye className="h-3 w-3" />
          View
        </div>
      </TableHead>
      <TableHead className="md:table-cell cursor-default">
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Trash2 className="h-3 w-3" />
          Delete
        </div>
      </TableHead>
    </TableRow>
  );
};

// Single table row
const Row = () => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium text-left w-[500px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-start">Admin</div>
          <div className="text-[10px] text-secondary-foreground font-thin text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
            consequuntur animi cupiditate vero! Aut nostrum doloremque autem,
            officiis aperiam est quasi adipisci nemo aspernatur velit unde
            dolore maiores alias ab.
          </div>
        </div>
      </TableCell>
      <TableCell className="">
        <Skeleton className="h-5 w-40" />
      </TableCell>
      <TableCell>
        <ViewNotificationDialog />
      </TableCell>
      <TableCell>{/* <DeleteNotificationDialog /> */}</TableCell>
    </TableRow>
  );
};

export default AllTabContent;
