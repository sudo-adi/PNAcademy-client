import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  BellPlus,
  FileTextIcon,
  FileUp,
  FileX,
  ImageOff,
  Images,
  Loader,
} from "lucide-react";
import useNotificationStore from "@/lib/stores/manage-notification-store/create-notification-store";
import { z } from "zod";
import { Group } from "@/lib/types/groupTypes";
import SendNotificationDialog from "./send-notification-dialog";
import { useNotifications } from "../hooks/useNotifications";

const notificationSchema = z.object({
  title: z
    .string()
    .max(255, "Title must be at most 100 characters long")
    .min(2, "Title must be at least 2 words")
    .refine((value) => value.split(" ").length >= 1, {
      message: "Title must be at least 3 words long",
    }),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
});

interface CreateNotificationDialogProps {
  refreshNotifications: () => void;
}

const CreateNotificationDialog = ({
  refreshNotifications,
}: CreateNotificationDialogProps) => {
  // all hooks here
  const { createNotification } = useNotifications();

  // global states here
  const {
    notificationName,
    notificationDescription,
    notificationFile,
    notificationImage,
    setNotificationImage,
    setNotificationFile,
    setNotificationName,
    setNotificationDescription,
  } = useNotificationStore();

  // local states here
  const [isFormValid, setIsFormValid] = useState(false);
  const [notificationId, setNotificationId] = useState<string | null>(null);
  const [isSendNotificationDialogOpen, setIsSendNotificationDialogOpen] =
    useState<boolean>(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [groups, setGroups] = useState<Group[]>([]);

  // loading states here
  const [creatingNotification, setCreatingNotification] = useState(false);

  // local vars here
  const groupList = (groups as Group[]) ?? [];

  // local functions here
  const validateForm = () => {
    try {
      notificationSchema.parse({
        title: notificationName,
        description: notificationDescription,
      });
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  // handlers here
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;
    setNotificationImage(selectedImage || undefined);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setNotificationFile(selectedFile || undefined);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.slice(0, 255);
    validateForm();
    setNotificationName(input);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const input = e.target.value.slice(0, 2000);
    validateForm();
    setNotificationDescription(input);
  };

  const handleCreateNotification = async () => {
    const payload = {
      title: notificationName,
      description: notificationDescription,
      image: notificationImage,
      file: notificationFile,
    };
    if (isFormValid) {
      try {
        setCreatingNotification(true);
        const response = await createNotification(payload);
        setNotificationId(response.data.id);
        setNotificationFile(undefined);
        setNotificationImage(undefined);
        setNotificationName("");
        setNotificationDescription("");
      } catch (error) {
        console.error(error);
      } finally {
        setCreatingNotification(false);
        setIsSendNotificationDialogOpen(true);
        refreshNotifications();
      }
    }
  };

  // use Effects here
  useEffect(() => {
    validateForm();
  }, [notificationName, notificationDescription]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <BellPlus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Notification</DialogTitle>
          <DialogDescription>
            Create a new notification using a title, description, with optional
            (image and file).
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label className="w-full flex flex-col gap-2">
            <div className="flex justify-between ml-1 text-xs">
              <span>Title</span>
              <span>{notificationName.length}/255 characters</span>
            </div>
            <Input
              type="text"
              value={notificationName}
              onChange={handleTitleChange}
              placeholder="Give notification title at least 3 words long..."
              className="w-full"
            />
          </Label>
          <Label className="w-full flex flex-col gap-2">
            <div className="flex justify-between ml-2 text-xs">
              <span>Description</span>
              <span>{notificationDescription.length}/2000 chars</span>
            </div>
            <Textarea
              value={notificationDescription}
              onChange={handleDescriptionChange}
              placeholder="Give notification a description at least 10 characters long..."
              className="w-full max-h-[10rem]"
            />
          </Label>
          {notificationImage && (
            <div className="flex w-full items-center justify-center h-full max-h-[15rem]">
              <img
                src={
                  notificationImage
                    ? URL.createObjectURL(notificationImage)
                    : ""
                }
                alt="Notification Image"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
          {notificationFile && (
            <div className="flex w-full rounded-xl border border-secondary p-2 items-center justify-start text-xs">
              <FileTextIcon className="h-4 w-4 mr-2 " />
              {notificationFile?.name || "No file selected"}
            </div>
          )}
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full gap-1">
              {!notificationImage && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => imageInputRef.current?.click()}
                >
                  <Images className="h-4 w-4 mr-2" />
                  Add Image
                </Button>
              )}
              {notificationImage && (
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => setNotificationImage(undefined)}
                >
                  <ImageOff className="h-4 w-4 mr-2" />
                  Remove Image
                </Button>
              )}
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              {!notificationFile && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Add File
                </Button>
              )}
              {notificationFile && (
                <Button
                  variant="link"
                  className="w-full"
                  onClick={() => setNotificationFile(undefined)}
                >
                  <FileX className="h-4 w-4 mr-2" />
                  Remove File
                </Button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.zip"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateNotification}
            disabled={!isFormValid || creatingNotification}
          >
            {creatingNotification ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Creating Notification
              </>
            ) : (
              <>
                <BellPlus className="h-4 w-4 mr-2" />
                Create
              </>
            )}
          </Button>
          {notificationId && (
            <SendNotificationDialog
              notificationId={notificationId}
              refreshNotifications={() => {}}
              isSendNotificationDialogOpen={isSendNotificationDialogOpen}
              setIsSendNotificationDialogOpen={setIsSendNotificationDialogOpen}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotificationDialog;
