import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { X as Cross, Plus, Users as Users } from 'lucide-react'
import React, { useState } from 'react'
import AddGroup from './add-group';
import Assessment from '@/app/assessment/page';

interface GroupBadgeProps {
  label: string;
  onRemove: () => void;
}

const GroupBadge: React.FC<GroupBadgeProps> = ({ label, onRemove }) => (
  <Badge className='justify-center cursor-pointer m-1'>
    <>
      {label}
      <button onClick={onRemove}>
        <Cross className='h-4 w-4 ml-2 cursor-pointer hover:border hover:rounded-full' />
      </button>
    </>
  </Badge>
)

interface AssignedGroupsCardProps {
  assessmentId: string;
}

const AssignedGroupsCard: React.FC<AssignedGroupsCardProps> = ({ assessmentId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleRemoveGroup = () => {
    console.log('Remove Group')
  }

  return (
    <Card className='bg-transparent p-2 overflow-hidden max-h-[20rem] min-h-[10rem]'>
      <CardTitle className='text-sm p-2 flex flex-row justify-between items-center w-full'>
        <div className="flex">
          <Users className='h-4 w-4 mr-1' />
          Select Groups
        </div>
        <button className='flex flex-row items-center' onClick={() => setIsDialogOpen(isDialogOpen ? false : true)}>
          <Badge>
            <Plus className='h-4 w-4 mr-2' />
            Add
          </Badge>
          <AddGroup assessmentId={assessmentId} isDialogOpen={isDialogOpen} />
        </button>
      </CardTitle>
      <Separator />
      <CardContent className='flex p-2 overflow-hidden w-full'>
        <div className='gap-2 h-full overflow-y-scroll w-full'>
          <GroupBadge label="Group 2" onRemove={handleRemoveGroup} />
          <GroupBadge label="no" onRemove={handleRemoveGroup} />
          <GroupBadge label="no" onRemove={handleRemoveGroup} />
          <GroupBadge label="english" onRemove={handleRemoveGroup} />
          <GroupBadge label="yes" onRemove={handleRemoveGroup} />
          <GroupBadge label="Group 2" onRemove={handleRemoveGroup} />
          <GroupBadge label="Group 2" onRemove={handleRemoveGroup} />
          <GroupBadge label="Group 2" onRemove={handleRemoveGroup} />
        </div>
      </CardContent>
    </Card>
  )
}

export default AssignedGroupsCard
