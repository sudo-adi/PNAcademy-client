import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { GetAssessmentByIdData, UpdateAssessmentProps } from "@/lib/types/assessmentTypes";

interface SideBarEndsAtDateTimePicker {
  assessment: GetAssessmentByIdData;
  patchAssessment: (data: UpdateAssessmentProps) => Promise<void>;
}

const SideBarEndsAtDateTimePicker: React.FC<SideBarEndsAtDateTimePicker> = ({ assessment, patchAssessment }) => {
  const [endAt, setEndAt] = useState<string>()
  const [date, setDate] = React.useState<Date>(new Date());
  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [period, setPeriod] = React.useState<string>("AM");

  React.useEffect(() => {
    const now = assessment ? new Date(assessment.end_at) : new Date();
    const currentHour = now.getHours();
    const currentPeriod = currentHour >= 12 ? "PM" : "AM";
    const hour12 = currentHour % 12 || 12;
    const currentMinute = now.getMinutes();

    setDate(now);
    setHour(hour12.toString());
    setMinute(currentMinute.toString().padStart(2, "0"));
    setPeriod(currentPeriod);

    // Set initial startAt to current date and time
    updateDateTime(now, hour12.toString(), currentMinute.toString(), currentPeriod);
  }, []);

  // Handle date selection from the calendar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      updateDateTime(selectedDate, hour, minute, period);
    }
  };

  const updateDateTime = (
    selectedDate: Date,
    selectedHour: string,
    selectedMinute: string,
    selectedPeriod: string
  ) => {
    const hour12 = selectedHour ? parseInt(selectedHour) : new Date().getHours() % 12 || 12;
    const minuteValue = selectedMinute ? parseInt(selectedMinute) : new Date().getMinutes();
    const hour24 = selectedPeriod === "PM" ? (hour12 % 12) + 12 : hour12 % 12;

    const newDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hour24,
      minuteValue
    );

    if (!isNaN(newDateTime.getTime())) {
      const isoString = newDateTime.toISOString();
      console.log(isoString);
      setEndAt(isoString);
      const updatedData: UpdateAssessmentProps = {
        id: assessment.id,
        start_at: assessment.start_at,
        name: assessment.name,
        description: assessment.description,
        is_active: assessment.is_active,
        end_at: isoString,
        duration: assessment.duration,
      };
      patchAssessment(updatedData).catch((err) => console.error('Failed to update end_at:', err));
    } else {
      console.error('Invalid date or time value.');
    }
  };

  // Handle time change and update the corresponding state
  const handleTimeChange = (type: "hour" | "minute" | "period", value: string) => {
    if (type === "hour") {
      setHour(value);
    } else if (type === "minute") {
      setMinute(value);
    } else if (type === "period") {
      setPeriod(value);
    }

    // Update date-time whenever time changes
    updateDateTime(date, type === "hour" ? value : hour, type === "minute" ? value : minute, type === "period" ? value : period);
    console.log(endAt);
  };

  return (
    <>
      <p className="p-2">Ends At:</p>
      <div className="flex flex-col items-center justify-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full max-w-none justify-start text-left font-normal text-xs",
                !endAt && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-3 w-3" />
              {endAt ? format(new Date(endAt), "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
        <div className="flex felx-row items-center w-full gap-2 text-xs">
          <Input
            className="w-full text-xs"
            type="number"
            min="1"
            max="12"
            value={hour}
            onChange={(e) => handleTimeChange("hour", e.target.value)}
            placeholder="HH"
          />
          :
          <Input
            className="w-full text-xs"
            type="number"
            min="0"
            max="59"
            value={minute}
            onChange={(e) => handleTimeChange("minute", e.target.value)}
            placeholder="MM"
          />
          :
          <Select value={period} onValueChange={(value) => handleTimeChange("period", value)}>
            <SelectTrigger className="w-full text-xs ">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default SideBarEndsAtDateTimePicker;
