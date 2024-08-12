import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { FileUpIcon } from 'lucide-react'
import React from 'react'

const ImportCsvDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileUpIcon className='h-4 w-4 mr-2' />
          Import as CSV
        </Button>
      </DialogTrigger>
      
    </Dialog>
  )
}

export default ImportCsvDialog