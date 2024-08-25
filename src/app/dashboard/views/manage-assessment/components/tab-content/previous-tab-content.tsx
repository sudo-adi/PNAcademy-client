import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BoxSelectIcon, Calendar, CircleDot, CircleDotDashed, CirclePlay, CircleStop, Clock, Copy, Edit, Link, Trash2, User } from 'lucide-react'
import React from 'react'

const PreviousTabContent = () => {
  return (
    <>
      <Card className='my-2 max-h-[calc(100vh-18rem)] w-full flex flex-col'>
        <Table>
          <TableHeader >
            <Schema />
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
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
          Assessment Name
        </div>
      </TableHead>
      <TableHead>
        <div className="flex flex-row gap-2 items-center">
          <CirclePlay className='h-4 w-4' />
          Started at
        </div>
      </TableHead>
      <TableHead>
        <div className="flex flex-row gap-2 items-center">
          <CircleStop className='h-4 w-4' />
          Ended at
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Calendar className='h-4 w-4' />
          Created at
        </div>
      </TableHead>
      <TableHead className="hidden md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Clock className='h-4 w-4' />
          Updated at
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <CircleDotDashed className='h-4 w-4' />
          Status
        </div>
      </TableHead>
      <TableHead className="md:table-cell">
        <div className="flex flex-row gap-2 items-center">
          <Link className='h-4 w-4' />
          Link
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
            Aws Assessment 2
          </div>
          <div className="flex">
            <button className='px-2 py-1 rounded-sm border-2 border-dashed flex gap-2 text-xs italic hover:bg-muted' onClick={() => console.log("me here")}>
              b9f49f4f-4790-4edd-a833-a426f301c804
            </button>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-40' />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-40' />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-40' />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Skeleton className='h-5 w-40' />
      </TableCell>
      <TableCell>
        <Button variant="ghost" className='hover:bg-transparent'>
          <CircleDot className='h-4 w-4 text-red-500' />
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outline" className='bg-transparent'>
          <Link className='h-4 w-4' />
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="outline" className='bg-transparent'>
          <Copy className='h-4 w-4' />
        </Button>
      </TableCell>
      <TableCell>
      </TableCell>
      <TableCell>
      </TableCell>
    </TableRow>
  );
};

export default PreviousTabContent