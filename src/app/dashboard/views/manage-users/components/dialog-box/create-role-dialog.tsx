import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, BellPlus, FileCog, FilePen, FilePieChart, Loader2, PieChart, ScrollText, User, UserCog, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRoles } from '../../hooks/useRoles';
import { RolePermissions } from '@/lib/types/roleTypes';
import { ApiError } from '@/lib/api/apiError';
import { Badge } from '@/components/ui/badge';
import { formatDateInIST } from '@/lib/helpers/time-converter';
import { Separator } from '@/components/ui/separator';


interface CreateRoleDialogProps {
  refreshRoles: () => void;
}

const CreateRoleDialog: React.FC<CreateRoleDialogProps> = ({ refreshRoles }) => {

  // constants here
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

  // all hooks here
  const { addRole } = useRoles();

  // global state here

  // local state here
  const [roleName, setRoleName] = useState<string>('');
  const [createdRole, setCreatedRole] = useState<any>();
  const [permissions, setPermissions] = useState<RolePermissions>({
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

  // loading states
  const [creatingRole, setCreatingRole] = useState<boolean>(false);

  // error states
  const [createRoleError, setCreateRoleError] = useState<Error | ApiError>();

  // dialog states
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  // disable states
  const [createRoleDisable, setCreteRoleDisable] = useState<boolean>(false);

  // handlers here
  const handleCreateRole = async () => {
    try {
      setStatusDialogOpen(true);
      setCreatingRole(true);
      await addRole({ name: roleName, permissions });
    } catch (err) {
      if (err instanceof ApiError) {
        setCreateRoleError(err);
      } else {
        setCreateRoleError(err as Error);
      }
    } finally {
      setCreatingRole(false);
      setRoleName('');
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
      });
      refreshRoles();
    }
  }

  const handlePermissionChange = (permission: keyof RolePermissions, value: boolean) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: value,
    }));
  }

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

  // useEffects here
  useEffect(() => {
    if (roleName.length < 3) {
      setCreteRoleDisable(true)
    } else {
      setCreteRoleDisable(false)
    }
  }, [roleName]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="flex items-center gap-2">
            <ScrollText className='h-4 w-4' />
            Create Role
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
                value={roleName}
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
                disabled={createRoleDisable}
                variant="default"
                onClick={handleCreateRole}
                className="w-full sm:w-auto"
              >
                Create Role
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{createRoleError ? 'Error' : 'Success'} </DialogTitle>
          </DialogHeader>
          <DialogDescription className='flex flex-row justify-between w-full'>
            <div>
              {creatingRole ?
                <Loader2 className='h-4 w-4 animate-spin' />
                : createRoleError ? createRoleError.message
                  : 'Role Created Successfully'}
            </div>

            <Badge>
              {createdRole?.createdAt ? formatDateInIST(createdRole.createdAt) : ""}
            </Badge>

          </DialogDescription>
          <Card className='flex flex-col gap-2 w-full p-4'>
            Role Created
          </Card>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateRoleDialog;
