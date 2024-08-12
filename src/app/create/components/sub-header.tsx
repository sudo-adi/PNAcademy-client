import { Button } from '@/components/ui/button'
import { Timer, Upload } from 'lucide-react'
import React from 'react'

const SubHeader = () => {
  return (
    <div className="flex flex-row justify-evenly gap-2 h-14 items-center border-t border px-4 lg:h-[60px] lg:px-6">
      <Button variant="secondary" className="w-full">
        <Timer className="h-4 w-4 mr-2" />
        Draft
      </Button>
      <Button className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        Publish
      </Button>
    </div>
  )
}

export default SubHeader