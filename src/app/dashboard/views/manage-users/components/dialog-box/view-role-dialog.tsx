import { Role } from '@/lib/types/roleTypes';
import React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Bell, BellPlus, Edit, Eye, FileCog, FilePen, FilePieChart, PieChart, User, UserCog, Users } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface ViewRoleDialogProps {
  role: Role;
}

const ViewRoleDialog: React.FC<ViewRoleDialogProps> = ({ role }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className='bg-transparent'>
            <Eye className='h-4 w-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Create a New Role</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quia?
            </DialogDescription>
            <div className="flex flex-col gap-2 py-4">
              <Label htmlFor='name' className='ml-1'>Role Name</Label>
              <Input
                id="name"
                type="email"
                placeholder="manager..."
                // onChange={(e) => setUsername(e.target.value)}
                required />
            </div>

            <Card
              className="xl:col-span-2 h-[400px] overflow-y-auto bg-transparent" x-chunk="dashboard-01-chunk-4"
            >
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Managing Permissions</TableHead>
                      <TableHead className="hidden xl:table-column">
                      </TableHead>
                      <TableHead className="text-right">Toggle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <FileCog className='h-4 w-4 mr-2' />
                          Manage Assessments
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <UserCog className='h-4 w-4 mr-2' />
                          Manage Users
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <FileCog className='h-4 w-4 mr-2' />
                          Manage Roles
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <BellPlus className='h-4 w-4 mr-2' />
                          Manage Notifications
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <PieChart className='h-4 w-4 mr-2' />
                          Manage Reports
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <Users className='h-4 w-4 mr-2' />
                          Manage Groups
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableHeader className='border-t'>
                    <TableRow>
                      <TableHead>Accessability Permissions</TableHead>
                      <TableHead className="hidden xl:table-column">
                      </TableHead>
                      <TableHead className="text-right">Toggle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <FilePen className='h-4 w-4 mr-2' />
                          Attempt Assessments
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <FilePieChart className='h-4 w-4 mr-2' />
                          View Reports
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <Bell className='h-4 w-4 mr-2' />
                          View Notifications
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex flex-row items-center justify-start font-medium py-2">
                          <User className='h-4 w-4 mr-2' />
                          Manage Account
                        </div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, deserunt?
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                      </TableCell>
                      <TableCell className="text-right">
                        <Switch />
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
              <Button variant="default">Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewRoleDialog