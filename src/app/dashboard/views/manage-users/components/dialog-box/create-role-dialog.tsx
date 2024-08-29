import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollText, } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useRoles } from '../../hooks/useRoles';
import { RolePermissions } from '@/lib/types/roleTypes';
import { boolean } from 'zod';

const CreateRoleDialog = () => {

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
  const handleCreateRole = async () => {

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

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">
            <ScrollText className='h-4 w-4 mr-2' />
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Create a New Role</DialogTitle>
            <DialogDescription>
              Assign permissions to the new role.
            </DialogDescription>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor='name' className='ml-1'>Role Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="manager..."
                onChange={(e) => setRoleName(e.target.value)}
                required
              />
            </div>
            <Card className="xl:col-span-2 h-[400px] overflow-y-auto bg-transparent">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permission</TableHead>
                      <TableHead className="text-right">Toggle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Manage Assessments</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canManageAssessment}
                          onCheckedChange={(value) => handlePermissionChange('canManageAssessment', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manage Users</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canManageUser}
                          onCheckedChange={(value) => handlePermissionChange('canManageUser', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manage Roles</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canManageRole}
                          onCheckedChange={(value) => handlePermissionChange('canManageRole', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manage Notifications</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canManageNotification}
                          onCheckedChange={(value) => handlePermissionChange('canManageNotification', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manage Reports</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canManageReports}
                          onCheckedChange={(value) => handlePermissionChange('canManageReports', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Attempt Assessments</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canAttemptAssessment}
                          onCheckedChange={(value) => handlePermissionChange('canAttemptAssessment', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>View Reports</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canViewReport}
                          onCheckedChange={(value) => handlePermissionChange('canViewReport', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>View Notifications</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canViewNotification}
                          onCheckedChange={(value) => handlePermissionChange('canViewNotification', value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Manage Account</TableCell>
                      <TableCell className="text-right">
                        <Switch
                          checked={permissions.canManageMyAccount}
                          onCheckedChange={(value) => handlePermissionChange('canManageMyAccount', value)}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </DialogHeader>
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="outline">Clear Selection</Button>
              </div>
              <Button variant="default" onClick={handleCreateRole}>Create Role</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateRoleDialog;
