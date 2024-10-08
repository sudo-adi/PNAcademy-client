import { Group } from '@/lib/types/groupTypes';
import React, { useCallback, useState } from 'react'
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import { useGroups } from '../../hooks/useGroups';

interface DeleteGroupDialogprops {
  group: Group;
  refreshGroups: () => void;

}

const DeleteGroupDialog: React.FC<DeleteGroupDialogprops> = ({ group, refreshGroups }) => {

  // all hooks here
  const { removeGroups } = useGroups();

  // global states here
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await removeGroups({ groupIds: [group.id] });
    } catch (err) {
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
      toast({
        title: `${group.name} Group deleted successfully`,
        action: (
          <ToastAction altText="Success">Ok</ToastAction>
        ),
      })
      refreshGroups();
    }
  }, [removeGroups, group.id]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Trash2 className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Do you want to Delete this Group?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Group? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <Card className='p-5 flex flex-col gap-2'>
            <CardTitle>Group: {group.name}</CardTitle>
          </Card>
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
              </div>
              <Button
                variant="default"
                onClick={onSubmit}
                disabled={loading}
              >
                <Trash2 className='h-4 w-4 mr-2' />
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Delete"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteGroupDialog