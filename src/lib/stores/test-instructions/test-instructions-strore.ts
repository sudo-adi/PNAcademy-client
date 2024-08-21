"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  tab: number;
  title: string;
  description: string;
  rules: string[];
}
interface Actions {
  setActiveTab: (tab: number) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setRulesForThetest: (rules: string[]) => void;
}
const useTestInstructionsStore = create<State & Actions>()(
  persist(
    (set) => ({
      tab: 0,
      title: "",
      description: "",
      rules: ["helo world", "hey there"],
      setActiveTab: (tab) => set({ tab: tab }),
      setTitle(title) {
        set({ title });
      },
      setDescription(description) {
        set({ description });
      },
      setRulesForThetest(rules) {
        set({ description: rules.join('\n') });
      },
    }),
    {
      name: 'TestIsntructionState', // Key for local storage
      // Default storage is used (localStorage in the browser)
    }
  )
);

export default useTestInstructionsStore;