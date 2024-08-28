import { Button } from '@/components/ui/button'
import { ArrowLeft, FilePen, HamIcon, Menu } from 'lucide-react'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SideBar from './sidebar'

interface HeaderProps {
  assessmentId: string;
}

const Header = ({ assessmentId }: HeaderProps) => {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6">
      <div className="w-full flex flex-row items-center gap-2">
        <Button variant="secondary">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <FilePen className="w-4 h-4" />
        Create Assessment
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
