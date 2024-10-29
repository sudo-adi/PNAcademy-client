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
import {
  Bell,
  DownloadIcon,
  Eye,
  FileTextIcon,
  ImageDown,
  Trash2,
} from "lucide-react";
import { SingleNotification } from "@/lib/types/notifications";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NotificationDialogProps {
  notification: SingleNotification;
}

const NotificationDialog = ({ notification }: NotificationDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[800px] max-h-[calc(100vh-10rem)] [&>button]:hidden overflow-y-scroll scrollbar-none">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-4">
              <div className="flex flex-row gap-2 text-primary">
                <Bell className="h-5 w-5" />
                Notification
              </div>
              <Separator />
            </DialogTitle>
            <DialogTitle>
              {
                <div className="flex flex-col gap-2 items-start text-sm">
                  {notification.title}
                </div>
              }
            </DialogTitle>
          </DialogHeader>
          {notification.image_url && (
            <div className="flex flex-col w-full gap-2">
              <img
                src={notification.image_url}
                alt={notification.title}
                className="w-full h-72 object-cover rounded-md"
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs flex flex-row items-center"
                href={notification.image_url}
                download
              >
                <Card className="w-full bg-secondary hover:scale-105 duration-500 transition-all">
                  <div className="flex w-full flex-row items-center justify-center p-2">
                    <div className="flex items-center justify-center text-xs">
                      <ImageDown className="h-4 w-4 mr-2" />
                      Download Image
                    </div>
                  </div>
                </Card>
              </a>
            </div>
          )}
          <Card className="p-3 border-dashed text-xs max-h-[20rem] overflow-y-scroll ">
            {notification.description}
          </Card>
          {notification.file_url && (
            <a
              target="_blank"
              className="text-xs flex flex-row items-center"
              href={notification.file_url}
            >
              <Card className="w-full  bg-secondary hover:scale-105 duration-500  transition-all">
                <div className="flex w-full flex-row items-center justify-between p-2">
                  <div className="flex items-center text-xs">
                    <FileTextIcon className="h-4 w-4 mr-2" />
                    Attachment
                  </div>

                  <DownloadIcon className="h-4 w-4 mr-2 hover:scale-125 duration-500 transition-all" />
                </div>
              </Card>
            </a>
          )}
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <div className="flex gap-2 items-center">
                <div>
                  <Badge variant={"outline"}>
                    {formatDate(
                      new Date(notification.createdAt),
                      "do MMMM yyyy, hh:mm a"
                    )}
                  </Badge>
                </div>
              </div>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationDialog;
