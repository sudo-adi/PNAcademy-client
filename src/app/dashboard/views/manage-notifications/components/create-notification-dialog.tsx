import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BellPlus, FileUp, Images, Users } from 'lucide-react'
import { DialogClose } from '@radix-ui/react-dialog'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableHead, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import useNotificationStore from '@/lib/stores/manage-notification-store/create-notification-store'
import { z } from 'zod'

const notificationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 words").refine(value => value.split(' ').length >= 3, {
    message: "Title must be at least 3 words long"
  }),
  description: z.string().min(10, "Description must be at least 10 characters long")
});

const CreateNotificationDialog = () => {
  const [image, setImage] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    notificationName,
    notificationDescription,
    notificationFile,
    notificationImage,
    setNotificationImage,
    setNotificationFile,
    setNotificationName,
    setNotificationDescription
  } = useNotificationStore();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;
    setNotificationImage(selectedImage || undefined);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setNotificationFile(selectedFile || undefined);
  };

  const validateForm = () => {
    try {
      notificationSchema.parse({ title: notificationName, description: notificationDescription });
      setIsFormValid(true);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [notificationName, notificationDescription]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.split(' ').slice(0, 25).join(' ');
    setNotificationName(input);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value.slice(0, 2000);
    setNotificationDescription(input);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log({ notificationName, notificationDescription, notificationFile, image });
    }
  };

  const handleSendNotification = () => {
    if (isFormValid) {
      // Implementation for sending the notification
    }
  };

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
            Create a new notification with a title, description, and optional image.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label className="w-full flex flex-col gap-2">
            <div className="flex justify-between ml-1 text-xs">
              <span>Title</span>
              <span>{notificationName.split(' ').length}/25 words</span>
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
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full gap-1">
              <p className='text-[9px] ml-1'>optional</p>
              <Button variant="secondary" className='w-full' onClick={() => imageInputRef.current?.click()}>
                <Images className='h-4 w-4 mr-2' />
                Add Image
              </Button>
              <input
                type="file"
                ref={imageInputRef}
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </div>
            <div className="flex flex-col w-full gap-1">
              <p className='text-[9px] ml-1'>optional</p>
              <Button variant="secondary" className='w-full' onClick={() => fileInputRef.current?.click()}>
                <FileUp className='h-4 w-4 mr-2' />
                Add File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="submit" onClick={handleSubmit} disabled={!isFormValid}>Send Notification</Button>
            </DialogTrigger>
            <DialogContent className='w-[425px] maxh-[500px]'>
              <DialogHeader>
                <DialogTitle>Select Groups and Send Notifications</DialogTitle>
                <DialogDescription>
                  Select the groups you want to send the notification to...
                </DialogDescription>
                <div className='flex h-[30rem]'>
                  <div className="relative flex-grow overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 overflow-auto scrollbar-none">
                      <table className="w-full">
                        <thead className="sticky bg-background top-0 z-10">
                          <Schema />
                        </thead>
                        <tbody>
                          <Row />
                          <Row />
                          <Row />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSendNotification} variant="default" disabled={!isFormValid}>Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Row = () => {
  return (
    <TableRow>
      <TableCell>
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium text-left w-[500px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 items-start text-[10px]">
            Group Name
          </div>
          <div className='text-[10px] text-secondary-foreground font-thin text flex flex-wrap gap-2'>
            <Badge className='text-[8px]'>
              Hello there
            </Badge>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

const Schema = () => {
  return (
    <TableRow className='bg-secondary'>
      <TableHead className="hidden sm:table-cell">
        <div className="flex items-center gap-2 flex-row text-[10px]">
          <Checkbox />
        </div>
      </TableHead>
      <TableHead className='cursor-default'>
        <div className="flex flex-row gap-2 items-center text-[10px]">
          <Users className='h-3 w-3' />
          Groups
        </div>
      </TableHead>
    </TableRow>
  );
};

export default CreateNotificationDialog
