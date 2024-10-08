import { create } from 'zustand';

// Define the state and actions types
interface TimerStore {
  timeLeft: number; // Time left in seconds
  startTimer: () => void; // Function to start the timer
  resetTimer: () => void; // Function to reset the timer
}

// Create the Zustand store with a deprecated warning
const useTimerStore = create<TimerStore>((set) => {
  console.warn("Warning: useDeprecatedTimerStore is deprecated. Please use the new timer store instead.");

  let intervalId: NodeJS.Timeout | null = null; // Store the interval ID

  return {
    timeLeft: 30 * 60, // Initial time: 30 minutes in seconds
    startTimer: () => {
      if (intervalId) return; // Prevent starting multiple timers
      intervalId = setInterval(() => {
        set((state) => {
          if (state.timeLeft > 0) {
            return { timeLeft: state.timeLeft - 1 };
          } else {
            clearInterval(intervalId!); // Stop the timer at 0
            return { timeLeft: 0 };
          }
        });
      }, 1000);
    },
    resetTimer: () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear the existing interval
      }
      intervalId = null; // Reset the interval ID
      set({ timeLeft: 30 * 60 }); // Reset the timer to 30 minutes
    },
  };
});

export default useTimerStore;
