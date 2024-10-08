import useTimerStore from "@/lib/stores/attempt-assessment/timer-store";

const TickComponent = () => {
  const { timeLeft } = useTimerStore();

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return <div>{formatTime(timeLeft)}</div>;
};

export default TickComponent;
