import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Bell, BellPlus, BoxSelectIcon, Calendar, Clock, Copy, Edit, FileCog, FilePen, FilePieChart, PieChart, Scroll, ScrollText, Trash2, User, UserCog, Users } from 'lucide-react';
import React from 'react';
import CreateRoleDialog from '../dialog-box/create-role-dialog';
import ImportCsvDialog from '../dialog-box/import-csv-dialog';
import ExportCsvDialog from '../dialog-box/export-csv-dialog';
import EditRoleDialog from '../dialog-box/edit-role-dialog';
import DeleteRoleDialog from '../dialog-box/delete-role-dialog';
import RoleBadge from '../role-badge';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Label } from '@radix-ui/react-label';

const RolesTabContent = () => {
  return (
    <>
      <Card className='flex flex-row gap-4 w-full p-2 justify-between border-dashed'>
        <div className="flex gap-2">
          <CreateRoleDialog />
        </div>
        <div className="flex gap-2">
          <ImportCsvDialog />
          <ExportCsvDialog />
        </div>
      </Card>
      <Card className='my-2 h-[calc(100vh-18rem)] flex flex-col'>
        <Table>
          <TableHeader >
            <Schema />
          </TableHeader>
          <TableBody>
            {Array.from({ length: 20 }).map((_, index) => (
              <Row key={index} />
            ))}
          </TableBody>
        </Table>
      </Card >
      <div className="flex h-[calc(4rem-6px)] items-center justify-between gap-2">
        <Label className='text-xs'>
          Showing <strong>1-10</strong> of <strong>32</strong>{" "}
          Roles
        </Label>
        <div className="flex gap-2">
          <Button variant="outline">
            Previous
          </Button>
          <Button>
            Next
          </Button>
        </div>
      </div>

    </>
  );
};



// Table schema
const Schema = () => {
  return (
    <TableRow>
      <TableHead className="hidden w-[100px] sm:table-cell">
        <div className="flex items-center gap-2 flex-row">
          <BoxSelectIcon className='h-4 w-4' />
          Select
        </div>
      </TableHead>
      <TableHead>
        <div className="flex flex-row gap-2 items-center">
          <ScrollText className='h-4 w-4' />
          Role Name
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Calendar className='h-4 w-4' />
          Created At
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Clock className='h-4 w-4' />
          Updated At
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Copy className='h-4 w-4' />
          Copy
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Edit className='h-4 w-4' />
          Edit
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Trash2 className='h-4 w-4' />
          Delete
        </div>
      </TableHead>
    </TableRow>
  );
};

// Single table row
const Row = () => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Checkbox />
      </TableCell>
      <TableCell className="font-medium text-left w-[500px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            Admin
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button onClick={() => console.log("me here")}>
                    <Badge variant="outline" className='border-dashed border-2 italic'>b9f49f4f-4790-4edd-a833-a426f301c804</Badge>
                  </button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='hidden md:flex gap-2 md:flex-wrap'>
            <RoleBadge text={'Manage Assessments'} icon={<FileCog />} />
            <RoleBadge text={'Manage Users'} icon={<UserCog />} />
            <RoleBadge text={'Manage Roles'} icon={<Scroll />} />
            <RoleBadge text={'Manage Groups'} icon={<Users />} />
            <RoleBadge text={'Manage Reports'} icon={<PieChart />} />
            <RoleBadge text={'Manage Notifications'} icon={<BellPlus />} />
            <RoleBadge text={'Attempt Assessments'} icon={<FilePen />} />
            <RoleBadge text={'View Reports'} icon={<FilePieChart />} />
            <RoleBadge text={'Get Notifications'} icon={<Bell />} />
            <RoleBadge text={'Manage My Account'} icon={<User />} />
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-50' />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-50' />
      </TableCell>
      <TableCell>
        <Button variant="outline" className='bg-transparent'>
          <Copy className='h-4 w-4' />
        </Button>
      </TableCell>
      <TableCell>
        <EditRoleDialog />
      </TableCell>
      <TableCell>
        <DeleteRoleDialog />
      </TableCell>
    </TableRow>
  );
};

export default RolesTabContent;
