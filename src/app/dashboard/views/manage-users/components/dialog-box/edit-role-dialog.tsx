import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, BellPlus, Edit, FileCog, FilePen, FilePieChart, PieChart, ScrollText, User, UserCog, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRoles } from '../../hooks/useRoles';
import { RolePermissions } from '@/lib/types/roleTypes';
import { Role } from '@/lib/types/role';


interface EditRoleDialogProps {

  refreshRoles: () => void;
}

const EditRoleDialog: React.FC<EditRoleDialogProps> = ({ refreshRoles }) => {
  const [roleName, setRoleName] = React.useState<string>('');
  const [permissions, setPermissions] = React.useState<RolePermissions>({
    canManageAssessment: false,
    canManageUser: false,
    canManageRole: false,
    canManageNotification: false,
    canManageLocalGroup: false,
    canManageReports: false,
    canAttemptAssessment: false,
    canViewReport: false,
    canManageMyAccount: false,
    canViewNotification: false,
  });
  const { addedRoleRes, addRole } = useRoles();
  const [loading, setLoading] = useState<boolean>(false);
  const [saveRoleDisable, setSaveRoleDisable] = useState<boolean>(false)

  const handleSaveRole = async () => {
    try {
      await addRole({ name: roleName, permissions });
    } catch (error) {
      console.log(error);
    }
  }

  const handlePermissionChange = (permission: keyof RolePermissions, value: boolean) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: value,
    }));
  }

  useEffect(() => {
    if (roleName === '') {
      setSaveRoleDisable(true)
    } else {
      setSaveRoleDisable(false)
    }
  }, [roleName]);

  const handleClearSelections = () => {
    setPermissions({
      canManageAssessment: false,
      canManageUser: false,
      canManageRole: false,
      canManageNotification: false,
      canManageLocalGroup: false,
      canManageReports: false,
      canAttemptAssessment: false,
      canViewReport: false,
      canManageMyAccount: false,
      canViewNotification: false,
    })
  }

  const managingPermissions = [
    {
      label: 'Manage Assessments',
      icon: FileCog,
      permission: 'canManageAssessment',
      description: 'Allows the user to create, update, and delete assessments, as well as manage assessment-related settings.'
    },
    {
      label: 'Manage Users',
      icon: UserCog,
      permission: 'canManageUser',
      description: 'Grants the user the ability to add, remove, and modify user accounts and their related settings.'
    },
    {
      label: 'Manage Roles',
      icon: FileCog,
      permission: 'canManageRole',
      description: 'Enables the user to create, edit, or delete user roles and assign different permissions to them.'
    },
    {
      label: 'Manage Notifications',
      icon: BellPlus,
      permission: 'canManageNotification',
      description: 'Allows the user to create and manage notifications for all users within the system.'
    },
    {
      label: 'Manage Reports',
      icon: PieChart,
      permission: 'canManageReports',
      description: 'Provides the user access to generate, modify, and manage reports related to user activities, assessments, and performance.'
    },
    {
      label: 'Manage Groups',
      icon: Users,
      permission: 'canManageLocalGroup',
      description: 'Grants the ability to create and manage groups or teams within the system, including adding or removing group members.'
    }
  ];

  const accessibilityPermissions = [
    {
      label: 'Attempt Assessments',
      icon: FilePen,
      permission: 'canAttemptAssessment',
      description: 'Allows users to take and submit assessments.'
    },
    {
      label: 'View Reports',
      icon: FilePieChart,
      permission: 'canViewReport',
      description: 'Allows users to view generated reports and analytics.'
    },
    {
      label: 'View Notifications',
      icon: Bell,
      permission: 'canViewNotification',
      description: 'Allows users to view and manage notifications.'
    },
    {
      label: 'Manage Account',
      icon: User,
      permission: 'canManageMyAccount',
      description: 'Allows users to manage their personal account settings.'
    }
  ];


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={true} variant="outline" className='bg-transparent'>
            <Edit className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full min-w-[100px] max-w-[600px] min-h-[400px] max-h-[800px] overflow-hidden overflow-y-scroll scrollbar-none">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Create a New Role</DialogTitle>
            <DialogDescription>
              Assign permissions to the new role.
            </DialogDescription>
            <div className="py-4">
              <Label htmlFor='name' className='ml-1'>Role Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. student..."
                onChange={(e) => setRoleName(e.target.value)}
                required
                className="mt-2"
              />
            </div>
          </DialogHeader>
          <Card className="min-h-[200px] max-h-[400px]  min-w-[100px] max-w-[600px] overflow-y-auto bg-transparent border border-muted scrollbar-none">
            <CardContent className='scrollbar-none'>
              <Table className='scrollbar-none'>
                <TableHeader>
                  <TableRow>
                    <TableHead>Managing Permissions</TableHead>
                    <TableHead className="text-right">Toggle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managingPermissions.map(({ label, icon: Icon, permission, description }) => (
                    <TableRow key={permission}>
                      <TableCell>
                        <div className="flex items-start justify-center flex-col">
                          <div className="flex flex-row gap-2">
                            <Icon className='h-4 w-4' />
                            <span className="font-medium">{label}</span>
                          </div>
                          <div className="flex  text-muted-foreground">
                            {description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions[permission as keyof RolePermissions]}
                          onCheckedChange={(value) => handlePermissionChange(permission as keyof RolePermissions, value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>


                {/* Accessibility Permissions */}
                <TableHeader className='border-t'>
                  <TableRow>
                    <TableHead>Accessibility Permissions</TableHead>
                    <TableHead className="text-right">Toggle</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessibilityPermissions.map(({ label, icon: Icon, permission, description }) => (
                    <TableRow key={permission}>
                      <TableCell>
                        <div className="flex items-start justify-center flex-col">
                          <div className="flex flex-row gap-2">
                            <Icon className='h-4 w-4' />
                            <span className="font-medium">{label}</span>
                          </div>
                          <div className="flex text-muted-foreground">
                            {description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions[permission as keyof RolePermissions]}
                          onCheckedChange={(value) => handlePermissionChange(permission as keyof RolePermissions, value)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <DialogFooter className="sm:justify-end">
            <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-2 sm:w-auto w-full">
                <DialogClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                </DialogClose>
                <Button
                  variant="outline"
                  onClick={() => handleClearSelections()}
                  className="w-full sm:w-auto"
                >
                  Clear Selection
                </Button>
              </div>
              <Button
                disabled={saveRoleDisable}
                variant="default"
                onClick={handleSaveRole}
                className="w-full sm:w-auto"
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditRoleDialog;
