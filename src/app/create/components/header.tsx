import { Button } from '@/components/ui/button'
import { ArrowLeft, FilePen } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6">
      <div className="w-full flex flex-row items-center gap-2">
        <Button variant="secondary">
          <ArrowLeft className='h-4 w-4' />
        </Button>
        <FilePen className="w-4 h-4" />
        Create Assessment
      </div>
    </header>
  )
}

export default Header