import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import React from 'react'


interface RoleBadgeProps {
  text?: string;
  icon: React.ReactElement;
  onClick?: () => void;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ text, icon, onClick }) => {

  const iconWithClass = React.cloneElement(icon, {
    className: `${icon.props.className || ''} h-4 w-4`
  });


  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <>
                <DialogTrigger asChild>
                  <button >
                    <Badge className='flex gap-2'>
                      {iconWithClass}
                      {text}
                    </Badge>
                  </button>
                </DialogTrigger>
                <DialogContent className="w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </>
            </DialogTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </Dialog>
  )
}

export default RoleBadge