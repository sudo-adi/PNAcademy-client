import { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SingleUser } from '@/lib/types/userTypes'; // Adjust the import path as needed
import { Card } from '@/components/ui/card';

interface ViewRoleDialogProps {
  user: SingleUser;
}

const ViewUserDialog: React.FC<ViewRoleDialogProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-transparent">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[500px]">
          <DialogHeader>
            <DialogTitle>View User Details</DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4 mt-4">
            <Card className="p-4">
              <div className="font-semibold">User ID:</div>
              <div>{user.id}</div>
            </Card>
            <Card className="p-4  ">
              <div className="font-semibold">Role:</div>
              <div>{user.role_id}</div>
            </Card>
            <Card className="p-4  ">
              <div className="font-semibold">Name:</div>
              <div>{user.first_name} {user.last_name}</div>
            </Card>
            <Card className="p-4  ">
              <div className="font-semibold">Email:</div>
              <div>{user.email}</div>
            </Card>
            <Card className="p-4  ">
              <div className="font-semibold">Phone:</div>
              <div>{user.phone}</div>
            </Card>
            <Card className="p-4  ">
              <div className="font-semibold">Created At:</div>
              <div>{user.createdAt}</div>
            </Card>
            <Card className="p-4  ">
              <div className="font-semibold">Updated At:</div>
              <div>{user.updatedAt}</div>
            </Card>
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewUserDialog;
