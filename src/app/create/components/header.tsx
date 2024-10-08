import { Button } from '@/components/ui/button'
import { ArrowLeft, FilePen, Menu } from 'lucide-react'
import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import SideBar from './sidebar'
import useCreateAssessmentStore from '@/lib/stores/manage-assessment-store/assessment-create'

const Header = () => {

  // all hooks here

  // global states here
  const {
    currentMarks,
    setCurrentMarks,

    currentSectionIndex,
  } = useCreateAssessmentStore();

  const [assessmentName, setAssessmentName] = React.useState<string>('Assessment');
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6">
      <div className="flex gap-2">
        <button className="text-[10px] border p-2 text-xs rounded-[8px] hover:bg-secondary flex items-center justify-center">
          <ArrowLeft className="h-3 w-3" />
        </button>
        <div className="flex flex-row items-center gap-2">
          <FilePen className="w-4 h-4" />
          <input
            value={assessmentName}
            className='bg-transparent border-none focus:outline-none'
            onChange={(e) => { setAssessmentName(e.target.value) }}
          />
        </div>
      </div>
      <div className="sm:mr-52 md:mr-56">
        Section {currentSectionIndex + 1}
      </div>
      <div className="flex flex-row items-center border-dashed border-primary rounded-xl border gap-2">
        <input
          className="bg-transparent border-none text-[24px] max-w-14 text-center outline-none"
          value={currentMarks}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value)) {
              value = 0;
            } else {
              value = Math.max(0, Math.min(100, value)); // Clamp value between 0 and 100
            }
            setCurrentMarks(value);
          }}
        />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className='md:hidden'>
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className='p-0'>
          {/* <SideBar assessmentId={assessmentId} /> */}
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
