import { Assessment } from '@/lib/types/assessmentTypes';
import { useEffect, useState } from 'react';


const useStatusIndicator = (assessment: Assessment) => {
  const [statusColor, setStatusColor] = useState<string>("text-red-500");

  useEffect(() => {
    const currentTime = new Date();
    const startTime = new Date(assessment.start_at);
    const endTime = new Date(assessment.end_at);

    if (currentTime > endTime) {
      setStatusColor("text-red-500");
    } else if (currentTime < startTime) {
      setStatusColor("text-yellow-500");
    } else if (currentTime >= startTime && currentTime <= endTime) {
      setStatusColor("text-green-500");
    }
  }, [assessment]);

  return statusColor;
};

export default useStatusIndicator;
