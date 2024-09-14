import { Card } from '@/components/ui/card'
import { ArchiveIcon, CircleDot, CircleIcon, FilePen, FileText } from 'lucide-react'
import React from 'react'

const OverView = () => {
  return (
    <div className='flex flex-col h-full gap-4'>
      <div className="flex gap-4 overflow-x-hidden">
        <Card className='flex flex-col p-4 w-full h-[10rem] cursor-pointer'>
          <div className="flex items-center justify-between">
            <h1 className='text-sm font-bold text-muted-foreground'>Total<br /> Assessments</h1>
          </div>
          <div className="flex flex-row items-end justify-between h-full">
            <CircleDot className='h-6 w-6 text-primary' />
            <h1 className='text-6xl font-bold text-primary'>
              234
            </h1>
          </div>
        </Card>
        <Card className='flex flex-col p-4 w-full h-[10rem] cursor-pointer'>
          <h1 className='text-sm font-bold text-muted-foreground'>Ongoing<br /> Assessments</h1>
          <div className="flex flex-row items-end justify-between h-full">
            <div className="relative">
              <CircleIcon className="absolute h-6 w-6 text-green-500 dark:text-green-700 animate-ping" />
              <CircleDot className="h-6 w-6 text-green-500 dark:text-green-700" />
            </div>
            <h1 className='text-6xl font-bold text-green-500 dark:text-green-700'>
              23
            </h1>
          </div>
        </Card>
      </div>
      <div className="flex gap-4 overflow-x-hidden">
        <Card className='flex flex-col p-4 w-full h-[10rem]  cursor-pointer'>
          <h1 className='text-sm font-bold text-muted-foreground'>Scheduled<br /> Assessments</h1>
          <div className="flex flex-row items-end justify-between h-full">
            <CircleDot className='h-6 w-6 text-yellow-500 dark:text-yellow-600' />
            <h1 className='text-6xl font-bold text-yellow-500 dark:text-yellow-600'>
              67
            </h1>
          </div>
        </Card>
        <Card className='flex flex-col p-4 w-full h-[10rem]  cursor-pointer'>
          <h1 className='text-sm font-bold text-muted-foreground '>Past<br /> Assessments</h1>
          <div className="flex flex-row items-end justify-between h-full">
            <CircleDot className='h-6 w-6 text-red-500 dark:text-red-700' />
            <h1 className='text-6xl font-bold text-red-500 dark:text-red-700'>
              192
            </h1>
          </div>
        </Card>
        <Card className='flex flex-col p-4 w-full h-[10rem]  cursor-pointer'>
          <h1 className='text-sm font-bold text-muted-foreground '>Drafts</h1>
          <div className="flex flex-row items-end justify-between h-full">
            <ArchiveIcon className='h-6 w-6' />
            <h1 className='text-6xl font-bold '>
              29
            </h1>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default OverView