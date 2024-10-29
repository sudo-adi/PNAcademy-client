import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCreateAssessmentDetailsStore from "@/lib/stores/manage-assessment-store/assessment-details";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StartsAtDateTimePicker = () => {
  const { startAt, setStartAt } = useCreateAssessmentDetailsStore();

  // Local state for date, hours, minutes, and AM/PM
  const [date, setDate] = React.useState<Date>(new Date());
  const [hour, setHour] = React.useState<string>("");
  const [minute, setMinute] = React.useState<string>("");
  const [period, setPeriod] = React.useState<string>("AM");

  // Initialize with current time on first render
  React.useEffect(() => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentPeriod = currentHour >= 12 ? "PM" : "AM";
    const hour12 = currentHour % 12 || 12;
    const currentMinute = now.getMinutes();

    setDate(now);
    setHour(hour12.toString());
    setMinute(currentMinute.toString().padStart(2, "0"));
    setPeriod(currentPeriod);

    // Set initial startAt to current date and time
    updateDateTime(
      now,
      hour12.toString(),
      currentMinute.toString(),
      currentPeriod
    );
  }, []);

  // Handle date selection from the calendar
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      updateDateTime(selectedDate, hour, minute, period);
    }
  };

  // Handle time selection and update state with validation
  const updateDateTime = (
    selectedDate: Date,
    selectedHour: string,
    selectedMinute: string,
    selectedPeriod: string
  ) => {
    const hour12 = selectedHour
      ? parseInt(selectedHour)
      : new Date().getHours() % 12 || 12;
    const minuteValue = selectedMinute
      ? parseInt(selectedMinute)
      : new Date().getMinutes();
    const hour24 = selectedPeriod === "PM" ? (hour12 % 12) + 12 : hour12 % 12;

    const newDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hour24,
      minuteValue
    );

    // Set the updated date-time as ISO string
    if (!isNaN(newDateTime.getTime())) {
      setStartAt(newDateTime.toISOString());
      console.log(startAt);
    }
  };

  // Handle time change and update the corresponding state
  const handleTimeChange = (
    type: "hour" | "minute" | "period",
    value: string
  ) => {
    if (type === "hour") {
      setHour(value);
    } else if (type === "minute") {
      setMinute(value);
    } else if (type === "period") {
      setPeriod(value);
    }

    // Update date-time whenever time changes
    updateDateTime(
      date,
      type === "hour" ? value : hour,
      type === "minute" ? value : minute,
      type === "period" ? value : period
    );
    console.log(startAt);
  };

  return (
    <>
      <p className="p-2">Starts At:</p>
      <div className="flex flex-row items-center justify-start gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "min-w-[200px] max-w-none justify-start text-left font-normal",
                !startAt && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startAt ? (
                format(new Date(startAt), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
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
        <Input
          className="w-full"
          type="number"
          min="1"
          max="12"
          value={hour}
          onChange={(e) => handleTimeChange("hour", e.target.value)}
          placeholder="HH"
        />
        <Input
          className="w-full"
          type="number"
          min="0"
          max="59"
          value={minute}
          onChange={(e) => handleTimeChange("minute", e.target.value)}
          placeholder="MM"
        />
        <Select
          value={period}
          onValueChange={(value) => handleTimeChange("period", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default StartsAtDateTimePicker;
