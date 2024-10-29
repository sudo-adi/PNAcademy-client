import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Card } from "@/components/ui/card";
import { Bell, DownloadIcon, FileTextIcon, Trash2 } from "lucide-react";
import { SingleNotification } from "@/lib/types/notifications";

interface DeleteNotificationDialogProps {
  notification: SingleNotification;
  removeNotification: () => void;
}

const DeleteNotificationDialog = ({
  notification,
  removeNotification,
}: DeleteNotificationDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            <Trash2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className=" max-w-[800px] max-h-[calc(100vh-10rem)]  overflow-y-scroll scrollbar-none [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center gap-2 my-2">
              <Bell className="h-4 w-4" />
              Delete Notification
            </DialogTitle>
            <DialogTitle>
              <div className="p-2 border rounded-xl border-dashed flex flex-col gap-2 items-start text-xs font-normal text-muted-foreground">
                {notification.title}
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </div>
              <Button variant="default" onClick={removeNotification}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteNotificationDialog;
