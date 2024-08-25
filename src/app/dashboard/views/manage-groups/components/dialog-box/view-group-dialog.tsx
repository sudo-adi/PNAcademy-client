import { Group } from '@/lib/types/groupTypes';
import React, { useCallback, useState } from 'react'
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, } from 'lucide-react';


interface EditUserDialogProps {
  refreshGroups: () => void;
  group: Group;
}

const ViewGroupDialog: React.FC<EditUserDialogProps> = ({ refreshGroups, group }) => {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Eye className='h-4 w-4' />
          </Button>
        </DialogTrigger>
      </Dialog>
    </>
  )
}

export default ViewGroupDialog