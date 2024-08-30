import { Button } from '@/components/ui/button'
import { ArrowLeft, FilePen, Menu } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import SideBar from './sidebar'

interface HeaderProps {
  assessmentId: string;
}


const Header = ({ assessmentId }: HeaderProps) => {

  const [assessmentName, setAssessmentName] = React.useState<string>('Assessment');

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6">
      <button className="text-[10px] border p-2 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center">
        <ArrowLeft className="h-3 w-3" />
      </button>
      <div className="w-full flex flex-row items-center gap-2">
        <FilePen className="w-4 h-4" />
        <input
          value={assessmentName}
          className='bg-transparent border-none focus:outline-none'
          onChange={(e) => { setAssessmentName(e.target.value) }}
        />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className='md:hidden'>
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className='p-0'>
          <SideBar assessmentId={assessmentId} />
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
