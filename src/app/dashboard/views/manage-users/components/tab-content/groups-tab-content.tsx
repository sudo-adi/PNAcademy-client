import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileDownIcon, FileUpIcon, Plus } from 'lucide-react'
import React from 'react'

const GroupsTabContent = () => {
  return (
    <Card className='flex flex-row w-full p-2 justify-between border-dashed'>
      <div className="flex gap-2">
        <Button variant="default">
          <Plus className='h-4 w-4 mr-2' />
          Create
        </Button>
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
  )
}

export default GroupsTabContent