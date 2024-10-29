import { LockKeyhole } from "lucide-react";
import React from "react";

interface LockedSectionProps {
  section: number;
}

const LockedSection: React.FC<LockedSectionProps> = ({ section }) => {
  return (
    <div className="flex flex-col border-2 rounded-lg">
      <div className="flex border-2 border-b-primary bg-muted w-full h-auto  rounded-t-sm p-4 text-sm justify-between">
        <div className="flex">Section {section}</div>
        <div className="flex">
          <LockKeyhole className="h-4 w-4" />
        </div>
      </div>
      <div className="relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 backdrop-blur-sm flex-col font-bold gap-4 text-muted-foreground rounded-b-lg">
          <LockKeyhole className="h-10 w-10" />
          Section Locked
        </div>

        {/* Main Content */}
        <div className="flex p-4 flex-col gap-4 items-center w-full relative">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-2 w-full">
              <div className="flex items-center justify-center">
                <div className="flex w-8 h-4 bg-secondary"></div>
              </div>
              <div className="flex flex-row items-center justify-between border-b p-1 w-full text-sm gap-4">
                <div className="flex h-4 max-w-[38rem] w-full bg-secondary"></div>
                <div className="flex h-4 max-w-[8rem] w-full bg-secondary"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LockedSection;
