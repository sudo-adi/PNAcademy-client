import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Eye, Trash2, } from 'lucide-react'

const ViewNotificationDialog = () => {
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
            <DialogTitle>Do you want to Delete this Role?</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, quia?
            </DialogDescription>
          </DialogHeader>
          <Card className='p-10'>
            <CardTitle>Role: Student</CardTitle>
          </Card>
          <DialogFooter>
            <div className="flex w-full justify-between gap-2">
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="outline">Clear Selection</Button>
              </div>
              <Button variant="default">
                <Trash2 className='h-4 w-4 mr-2' />
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ViewNotificationDialog