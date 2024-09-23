"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  activePageIndex: number;
}

interface Actions {
  setActivePageIndex: (index: number) => void;

}

const useAssessmentsTableStore = create<State & Actions>()(
  persist(
    (set) => ({
      activePageIndex: 1,

      setActivePageIndex: (index) => set({ activePageIndex: index }),
    }),
    {
      name: 'attemptAssessmentStore',
    }
  )
);

export default useAssessmentsTableStore;