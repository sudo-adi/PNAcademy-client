import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator';
import { X as Cross, Plus, Users as Users } from 'lucide-react'
import React, { useState } from 'react'
import AddGroup from './add-group';
import useCreateAssessmentDetailsStore from '@/lib/stores/manage-assessment-store/assessment-details';

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

  const { assignedGroups, setAssignedGroups } = useCreateAssessmentDetailsStore();

  const handleRemoveGroup = () => {
    const prev = assignedGroups;
    setAssignedGroups(prev.filter((id) => id !== assessmentId));
  }
  return (
    <Card className='bg-transparent p-2 overflow-hidden max-h-[20rem] min-h-[10rem]'>
      <CardTitle className='text-sm p-2 flex flex-row justify-between items-center w-full'>
        <div className="flex">
          <Users className='h-4 w-4 mr-1' />
          Select Groups
        </div>
        <button className='flex flex-row items-center'>
          <AddGroup assessmentId={assessmentId} />
        </button>
      </CardTitle>
      <Separator />
      <CardContent className='flex p-2 overflow-hidden w-full'>
        <div className='gap-2 h-full overflow-y-scroll scrollbar-none w-full'>
          {
            assignedGroups.map((group, index) => (
              <GroupBadge key={index} label={group} onRemove={handleRemoveGroup} />
            ))
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default AssignedGroupsCard
