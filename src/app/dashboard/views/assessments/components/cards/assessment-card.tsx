import React, { useState } from "react";
import Image from "next/image";
import {
  CalendarClock,
  CircleDot,
  CircleStop,
  Clock,
  Hourglass,
  Loader,
  SquareCheckBig,
  SquarePen,
  Timer,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Assessment, AssignedAssessment } from "@/lib/types/assessmentTypes";
import {
  formatDateInIST,
  millisecondsToMinutes,
} from "@/lib/helpers/time-converter";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { format, intervalToDuration, set } from "date-fns";
import { Separator } from "@radix-ui/react-separator";

interface AssessmentCardProps {
  assessment: AssignedAssessment;
  state: "s" | "o" | "p";
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  assessment,
  state,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleJoinAssessment = () => {
    try {
      setIsLoading(true);
      router.push(`/test/${assessment.id}`);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="p-2 flex flex-col justify-between gap-2 min-h-[18rem]">
        <div className="flex flex-col w-full bg-muted rounded-lg h-full justify-between">
          <div className="flex flex-row p-2  justify-between">
            <div className="flex flex-row p-1 gap-1 h-full items-start">
              <div className="flex flex-row items-center gap-3">
                <div>
                  <Badge
                    className={`text-[8px] hover:cursor-pointer ${
                      state === "s"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : state === "p"
                        ? "bg-red-400  hover:bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    <CalendarClock className={`h-3 w-3 mr-1 `} />
                    {state === "s"
                      ? `${format(
                          new Date(assessment.start_at),
                          "do MMM yyyy, hh:mm a"
                        )}`
                      : state === "o"
                      ? `${format(
                          new Date(assessment.end_at),
                          "do MMM yyyy, hh:mm a"
                        )}`
                      : `${format(
                          new Date(assessment.end_at),
                          "do MMM yyyy, hh:mm a"
                        )}`}
                  </Badge>
                </div>
              </div>
            </div>
            <img
              src="/logo.png"
              alt="logo"
              className="h-14 p-2 opacity-60 dark:invert dark:opacity-90"
            />
          </div>
          <div className="flex flex-col p-4 justify-end">
            <div className="flex flex-row items-center justify-between">
              <h1 className="text-sm line-clamp-1 w-9/10">{assessment.name}</h1>
              <Badge
                className={`${
                  state === "s"
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : state === "p"
                    ? "bg-red-400 hover:bg-red-500"
                    : "bg-green-500 hover:bg-green-600"
                } text-[8px] min-w-20 flex flex-row items-center justify-center`}
              >
                <Timer className="h-3 w-3 mr-1" />{" "}
                <div className="flex">
                  {millisecondsToMinutes(assessment.duration)} m
                </div>
              </Badge>
            </div>
            <div className="flex h-[1px] dark:bg-white/60 bg-black/20 my-1"></div>
            <p className="text-[10px] text-muted-foreground line-clamp-3">
              {assessment.description}
            </p>
          </div>
        </div>
        <div className="flex w-full">
          {state === "o" && !assessment.isSubmitted && (
            <Button
              size="sm"
              className="w-full text-xs bg-green-500 hover:bg-green-600 "
              onClick={handleJoinAssessment}
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {state === "o" && <CircleDot className="h-2 animate-ping" />}{" "}
                  Start <SquarePen className="h-3 w-3 ml-2" />
                </>
              )}
            </Button>
          )}
          {state === "o" && assessment.isSubmitted && (
            <Button
              size="sm"
              className="w-full text-xs bg-transparent text-green-500 border-green-500 border hover:bg-green-600 hover:text-white"
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Attempted <SquareCheckBig className="h-3 w-3 ml-2" />
                </>
              )}
            </Button>
          )}
          {state === "s" && (
            <Button
              size="sm"
              className="w-full text-xs bg-transparent text-yellow-500 border-yellow-500 border hover:bg-yellow-600 hover:text-white"
            >
              Scheduled <CalendarClock className="h-3 w-3 ml-2" />
            </Button>
          )}{" "}
          {state === "p" && (
            <Button
              size="sm"
              className="w-full text-xs hover:text-white bg-transparent hover:bg-red-400 text-red-400 border border-red-400"
            >
              Ended <CircleStop className="h-3 w-3 ml-2" />
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default AssessmentCard;
