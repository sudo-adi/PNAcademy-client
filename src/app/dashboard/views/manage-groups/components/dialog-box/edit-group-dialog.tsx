import { Group } from '@/lib/types/groupTypes';
import React, { useCallback, useState } from 'react'
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, Loader2, Trash2 } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import { useGroups } from '../../hooks/useGroups';


interface EditUserDialogProps {
  refreshGroups: () => void;
  group: Group;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ refreshGroups, group }) => {
  const { error, editGroup } = useGroups();
  const [loading, setLoading] = useState(false);
  const [updatedGroupData, setUpdatedGroupData] = useState<Group | null>(null);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Edit className='h-4 w-4' />
          </Button>
        </DialogTrigger>
      </Dialog>
    </>
  )
}

export default EditUserDialog