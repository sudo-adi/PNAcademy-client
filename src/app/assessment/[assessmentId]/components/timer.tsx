import React, { useEffect } from "react";
import useTimerStore from "@/lib/stores/attempt-assessment/timer-store";
import { useRouter } from "next/navigation";

const TimerComponent: React.FC = () => {
  const { timeLeft } = useTimerStore();
  const router = useRouter();
  useEffect(() => {
    if (timeLeft === 0) {
      // router.push("/second-page"); // Replace with your desired route
    }
  }, [timeLeft, router]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div>{formatTime(timeLeft)}</div>
    </div>
  );
};

export default TimerComponent;
