import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { FileUpIcon } from 'lucide-react'
import React from 'react'

const ExportCsvDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUpIcon className='h-4 w-4 mr-2' />
          Export as CSV
        </Button>
      </DialogTrigger>
    </Dialog>
  )
}

export default ExportCsvDialog