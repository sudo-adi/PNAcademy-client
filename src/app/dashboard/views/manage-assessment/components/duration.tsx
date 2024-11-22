import { Input } from "@/components/ui/input";
import useCreateAssessmentDetailsStore from "@/lib/stores/manage-assessment-store/assessment-details";
import React, { useState, useEffect } from "react";

const AssessmentDuration = () => {
  const { duration, setDuration } = useCreateAssessmentDetailsStore();
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers, limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      // Ensure value doesn't exceed 23
      const numValue = parseInt(value);
      setHours(value === "" ? "" : Math.min(numValue, 23).toString());
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers, limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      // Ensure value doesn't exceed 59
      const numValue = parseInt(value);
      setMinutes(value === "" ? "" : Math.min(numValue, 59).toString());
    }
  };

  useEffect(() => {
    const hoursNum = hours === "" ? 0 : parseInt(hours);
    const minutesNum = minutes === "" ? 0 : parseInt(minutes);

    const durationInMilliseconds =
      hoursNum * 60 * 60 * 1000 + minutesNum * 60 * 1000;
    setDuration(durationInMilliseconds);
  }, [hours, minutes, setDuration]);

  return (
    <>
      <p className="p-2">Duration:</p>
      <div className="flex flex-row items-start justify-start w-full gap-2">
        <div className="flex flex-col items-center justify-start w-full">
          <p className="w-full px-2 text-[12px]">Hours (0-23)</p>
          <Input
            className="w-full"
            placeholder="Hours"
            type="text"
            value={hours}
            onChange={handleHoursChange}
          />
        </div>
        <div className="flex flex-col items-center justify-start w-full">
          <p className="w-full px-2 text-[12px]">Minutes (0-59)</p>
          <Input
            className="w-full"
            placeholder="Minutes"
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
          />
        </div>
      </div>
    </>
  );
};

export default AssessmentDuration;
