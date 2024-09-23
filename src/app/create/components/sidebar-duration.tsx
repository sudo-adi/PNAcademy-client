import { Input } from '@/components/ui/input';
import { GetAssessmentByIdData, UpdateAssessmentProps } from '@/lib/types/assessmentTypes';
import React, { useState, useEffect } from 'react';

interface SideBarAssessmentDurationProps {
  assessment: GetAssessmentByIdData;
  patchAssessment: (data: UpdateAssessmentProps) => Promise<void>;
}

const SideBarAssessmentDuration: React.FC<SideBarAssessmentDurationProps> = ({ assessment, patchAssessment }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  // Effect to update the duration in milliseconds whenever hours or minutes change
  useEffect(() => {
    const durationInMilliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    patchAssessment({ ...assessment, duration: durationInMilliseconds });
  }, [hours, minutes, assessment]); // Add missing dependencies

  // Effect to initialize hours and minutes from assessment.duration
  useEffect(() => {
    setHours(Math.floor(assessment.duration / (60 * 60 * 1000)));
    setMinutes(Math.floor((assessment.duration % (60 * 60 * 1000)) / (60 * 1000)));
  }, [assessment.duration]); // Ensure it only runs when assessment.duration changes

  return (
    <>
      <p className='p-2'>Duration:</p>
      <div className='flex flex-row items-start justify-start w-full gap-2'>
        <div className="flex flex-col items-center justify-start w-full">
          <p className='w-full px-2 text-[12px]'>HH</p>
          <Input
            className='w-full'
            placeholder='HH'
            type='number'
            min={0}
            max={23}
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="flex flex-col items-center justify-start w-full">
          <p className='w-full px-2 text-[12px]'>MM</p>
          <Input
            className='w-full'
            placeholder='MM'
            type='number'
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    </>
  );
};

export default SideBarAssessmentDuration;
