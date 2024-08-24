import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useCallback, useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { Car, Loader2, Trash2, } from 'lucide-react'
import { useRoles } from '../../hooks/useRoles'
import { Role } from '@/lib/types/roleTypes'
import { Bell, BellPlus, Calendar, Clock, Copy, Edit, FileCog, FilePen, FilePieChart, MousePointer2, PieChart, Scroll, ScrollText, User, UserCog, Users } from 'lucide-react';
import RoleBadge from '../role-badge'



interface DeleteRoleDialogProps {
  refreshRoles: () => void;
  role: Role;
}

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({ refreshRoles, role }) => {
  const { error, removeRoles } = useRoles();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const onSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await removeRoles({ roleIds: [{ roleId: role.id }] });
      setStatusDialogOpen(true);
    } catch (err) {
      console.error('Error deleting user:', err);
    } finally {
      setLoading(false);
      refreshRoles();
    }
  }, [removeRoles, role.id]);

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
            <DialogTitle>Do you want to Delete this Role?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Role? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <Card className='p-5 flex flex-col gap-2'>
            <CardTitle>Role: {role.name}</CardTitle>
            <CardDescription>
              Permissions for this role:
            </CardDescription>
            <div className='hidden md:flex gap-2 md:flex-wrap'>
              {role.canManageAssessment && <RoleBadge text={'Manage Assessments'} icon={<FileCog />} />}
              {role.canManageUser && <RoleBadge text={'Manage Users'} icon={<UserCog />} />}
              {role.canManageRole && <RoleBadge text={'Manage Roles'} icon={<Scroll />} />}
              {role.canManageLocalGroup && <RoleBadge text={'Manage Local Groups'} icon={<Users />} />}
              {role.canManageReports && <RoleBadge text={'Manage Reports'} icon={<PieChart />} />}
              {role.canManageNotification && <RoleBadge text={'Manage Notifications'} icon={<BellPlus />} />}
              {role.canAttemptAssessment && <RoleBadge text={'Attempt Assessments'} icon={<Scroll />} />}
              {role.canViewReport && <RoleBadge text={'View Reports'} icon={<FilePieChart />} />}
              {role.canViewNotification && <RoleBadge text={'Get Notifications'} icon={<Bell />} />}
              {role.canManageMyAccount && <RoleBadge text={'Manage My Account'} icon={<User />} />}
            </div>
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

export default DeleteRoleDialog