import React from "react";
import TickComponent from "../../components/timer";
import { Clock } from "lucide-react";

const AttemptionViewSideBar = () => {
  return (
    <div className="flex flex-col items-center gap-4 border border-r-2 p-10 min-w-[19rem] w-[20rem]">
      <div className="flex bg-secondary/30 border-2  h-[6rem] w-full  rounded-full items-center text-4xl flex-col font-black justify-center">
        <TickComponent />
        <div className="flex flex-row items-center gap-1 text-xs text-foreground/50 font-light mt-1">
          <Clock className="h-3 w-3" /> Time Remaining
        </div>
      </div>
    </div>
  );
};

export default AttemptionViewSideBar;
