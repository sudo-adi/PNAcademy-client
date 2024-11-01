import { create } from 'zustand';

interface TimerStore {
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  startTimer: () => void;
  resetTimer: () => void;
}

const useTimerStore = create<TimerStore>((set) => {
  console.warn("Warning: useDeprecatedTimerStore is deprecated. Please use the new timer store instead.");

  let intervalId: NodeJS.Timeout | null = null;

  return {
    timeLeft: 100,
    setTimeLeft: (time) => set({ timeLeft: time }),
    startTimer: () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        set((state) => {
          if (state.timeLeft > 0) {
            return { timeLeft: state.timeLeft - 1 };
          } else {
            clearInterval(intervalId!);
            return { timeLeft: 0 };
          }
        });
      }, 1000);
    },
    resetTimer: () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      intervalId = null;
      set({ timeLeft: 30 * 60 });
    },
  };
});

export default useTimerStore;