import { GetAssessmentTimeDetailsResponse } from "@/lib/types/attemptionTypes";
import { millisecondsToMinutes } from "date-fns";
import React from "react";
import TickComponent from "./timer";

interface TopBarProps {
  timeDetails?: GetAssessmentTimeDetailsResponse["data"];
}

const TopBar: React.FC<TopBarProps> = ({ timeDetails }) => {
  return (
    <div className="flex h-[2rem] w-full items-center text-sm justify-between border border-b-1 px-10">
      <div className="flex">FullScreen: {true}</div>
      <div className="flex">Assessment Overview</div>
      <div className="flex">
        Duration: {millisecondsToMinutes(timeDetails?.duration || 0)} Minutes
      </div>
    </div>
  );
};

export default TopBar;
