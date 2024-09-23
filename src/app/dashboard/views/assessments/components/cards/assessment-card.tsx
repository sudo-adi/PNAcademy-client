import React from 'react';
import Image from 'next/image';
import { CircleDot, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Assessment } from '@/lib/types/assessmentTypes';
import { millisecondsToMinutes } from '@/lib/helpers/time-converter';
import { useRouter } from 'next/navigation';

interface AssessmentCardProps {
  assessment: Assessment;
  startAssessment: () => void;
  viewReport: () => void;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ assessment, startAssessment }) => {
  const router = useRouter();
  const getIndicatorColor = (startedAt: string, endedAt: string): string => {
    const currentTime = new Date();
    const startTime = new Date(startedAt);
    const endTime = new Date(endedAt);

    if (currentTime >= startTime && currentTime <= endTime) {
      return 'text-green-500';
    } else if (startTime > currentTime) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  };

  return (
    <Card className="flex flex-col h-80">
      <CardHeader className="p-0">
        <div className="relative w-full h-32">
          <Image
            src="/logo-dark.png"
            alt="Assessment image"
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg bg-muted p-10"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg font-semibold">
            {assessment.name}
          </CardTitle>
          <CircleDot className={`h-4 w-4 ${getIndicatorColor(assessment.start_at, assessment.end_at)}`} />
        </div>
        <p className="text-xs text-gray-600 mb-4 line-clamp-3">
          {assessment.description}
        </p>
      </CardContent>
      <CardFooter className="p-3 pt-0 bg-muted rounded-b-lg">
        <div className="flex justify-between items-center w-full pt-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs">
              {millisecondsToMinutes(assessment.duration)} minutes
            </span>
          </div>
          <Button
            size="sm"
            className="rounded-xl text-xs px-4"
            onClick={startAssessment}
            onClickCapture={() => router.push(`/verification/${assessment.id}`)}
          >
            Start
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;