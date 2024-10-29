import React, { useState } from "react";
import Image from "next/image";
import { CircleDot, Clock, Hourglass, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Assessment } from "@/lib/types/assessmentTypes";
import {
  formatDateInIST,
  millisecondsToMinutes,
} from "@/lib/helpers/time-converter";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface AssessmentCardProps {
  assessment: Assessment;
  state: "s" | "o" | "p";
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  state,
}) => {
  const router = useRouter();
  const getIndicatorColor = (startedAt: string, endedAt: string): string => {
    const currentTime = new Date();
    const startTime = new Date(startedAt);
    const endTime = new Date(endedAt);

    if (currentTime >= startTime && currentTime <= endTime) {
      return "text-green-500";
    } else if (startTime > currentTime) {
      return "text-yellow-500";
    } else {
      return "text-red-500";
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleJoinAssessment = () => {
    try {
      setIsLoading(true);
      router.push(`/verification/`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="flex flex-col max-h-[30rem]">
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
          <CardTitle className="text-lg font-semibold line-clamp-1 w-4/5">
            {assessment.name}
          </CardTitle>
          <CircleDot
            className={`h-4 w-4 ${getIndicatorColor(
              assessment.start_at,
              assessment.end_at
            )}`}
          />
        </div>
        <p className="text-xs text-gray-600 mb-4 line-clamp-3">
          {assessment.description}
        </p>
      </CardContent>
      <CardFooter className="p-3 pt-0 bg-muted rounded-b-lg">
        <div className="flex justify-between items-center w-full pt-2">
          <div className="flex flex-col gap-2 items-start">
            <div className="flex items-center gap-2">
              <Hourglass className="h-4 w-4" />
              <span className="text-md">
                {millisecondsToMinutes(assessment.duration)} Minutes
              </span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <span className="text-md">
                <Badge className="flex flex-row gap-2">
                  <Clock className="h-4 w-4" />
                  {state === "s"
                    ? `Starting at ${formatDateInIST(assessment.start_at)}`
                    : state === "o"
                    ? `Ending at ${formatDateInIST(assessment.end_at)}`
                    : `Ended at ${formatDateInIST(assessment.end_at)}`}
                </Badge>
              </span>
            </div>
          </div>
          {state === "o" && (
            <Button
              size="sm"
              className="rounded-xl text-xs px-4"
              onClick={handleJoinAssessment}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                "Start"
              )}
            </Button>
          )}
          {state === "s" && (
            <div className="flex flex-row items text-yellow-500 items-center gap-2">
              <Clock className="text-yellow-500 h-4 w-4" />
              Scheduled
            </div>
          )}
          {state === "p" && (
            <div className="text-red-500 text-lg flex flex-row items-center gap-2">
              <CircleDot className="text-red-500 h-4 w-4" />
              Ended
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssessmentCard;
