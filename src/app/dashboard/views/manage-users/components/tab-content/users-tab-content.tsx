import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { BoxSelectIcon, Calendar, Clock, Copy, Edit, FileDownIcon, FileUpIcon, Mail, Plus, Trash2, User, UserPlus } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import EditRoleDialog from '../dialog-box/edit-role-dialog'
import DeleteRoleDialog from '../dialog-box/delete-role-dialog'

const UsersTabContent = () => {
  return (
    <>
      <Card className='flex flex-row w-full p-2 justify-between border-dashed'>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                <UserPlus className='h-4 w-4 mr-2' />
                Create
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileUpIcon className='h-4 w-4 mr-2' />
            Import as CSV
          </Button>
          <Button variant="outline">
            <FileDownIcon className='h-4 w-4 mr-2' />
            Export as CSV
          </Button>
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


  )
}


// User Table Schema
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
          <User className='h-4 w-4' />
          User Name
        </div>
      </TableHead>
      <TableHead>
        <div className="flex flex-row gap-2 items-center">
          <Mail className='h-4 w-4' />
          Email
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
      <TableCell className="font-medium text-left w-[350px]">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            Admin
          </div>
          <div className="flex">
            <button className='px-2 py-1 rounded-sm border-2 border-dashed flex gap-2 text-xs italic hover:bg-muted' onClick={() => console.log("me here")}>
              b9f49f4f-4790-4edd-a833-a426f301c804
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <Badge variant="outline" className='hover:bg-secondary'>
                  sudo.aditya@gmail.com
                </Badge>
              </button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-40' />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-40' />
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

export default UsersTabContent