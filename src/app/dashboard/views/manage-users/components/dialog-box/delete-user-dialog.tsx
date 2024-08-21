"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, Loader2 } from 'lucide-react';
import React from 'react';
import { useUsers } from '../../hooks/useUsers';
import { DeleteUsersProps } from '@/lib/types/userTypes';

interface DeleteUserDialogProps {
  refreshUsers: () => void;
  userId: string;
}

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({ refreshUsers, userId }) => {
  const { error, handleDeleteUsers } = useUsers();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const closeDialogs = () => {
    setDialogOpen(false);
    setStatusDialogOpen(false);
  };

  const onSubmit = async (data: DeleteUsersProps) => {
    setLoading(true);
    try {
      await handleDeleteUsers(data);
      setStatusDialogOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      refreshUsers();
    }
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Trash2 className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => onSubmit({ userIds: [userId] })}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button variant="outline" onClick={closeDialogs}>Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{error ? error.status : "Success"}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{error ? error.message : "User Deleted Successfully"}</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default" onClick={closeDialogs}>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteUserDialog;
