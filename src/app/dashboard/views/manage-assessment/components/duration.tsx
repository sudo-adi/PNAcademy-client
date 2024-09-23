import { Input } from '@/components/ui/input';
import useCreateAssessmentDetailsStore from '@/lib/stores/manage-assessment-store/assessment-details';
import React, { useState, useEffect } from 'react';

const AssessmentDuration = () => {
  const { duration, setDuration } = useCreateAssessmentDetailsStore();
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    const durationInMilliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
    setDuration(durationInMilliseconds);
    console.log(duration);
  }, [hours, minutes, setDuration]);

  return (
    <>
      <p className='p-2'>
        Duration:
      </p>
      <div className='flex flex-row items-start justify-start w-full gap-2'>
        <div className="flex flex-col items-center justify-start w-full">
          <p className='w-full px-2 text-[12px]'>
            HH
          </p>
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
        <div>

        </div>
        <div className="flex flex-col items-center justify-start w-full">

          <p className='w-full px-2 text-[12px]'>
            MM
          </p>
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
}

export default AssessmentDuration;
