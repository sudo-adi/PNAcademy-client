"use client";
import { AiSection } from '@/lib/types/ai-assessment';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the state shape
interface State {
  currentNumberOfQuestions: number;
  currentDifficultyLevel: string;
  currentMarksPerQuestion: number;
  currentSections: AiSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
}

// Define actions to mutate the state
interface Actions {
  setCurrentNumberOfQuestions: (number: number) => void;
  setCurrentDifficultyLevel: (level: string) => void;
  setCurrentMarksPerQuestion: (marks: number) => void;
  setCurrentSections: (sections: AiSection[]) => void;
  setCurrentSectionIndex: (index: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
}

// Create the store with persistence
const useAiCreateStore = create<State & Actions>()(
    (set) => ({
      currentNumberOfQuestions: 0,
      currentDifficultyLevel: '',
      currentMarksPerQuestion: 0,
      currentSections: [],
      currentSectionIndex: 0,
      currentQuestionIndex: 0,

      // Actions
      setCurrentNumberOfQuestions: (number) => set({ currentNumberOfQuestions: number }),
      setCurrentDifficultyLevel: (level) => set({ currentDifficultyLevel: level }),
      setCurrentMarksPerQuestion: (marks) => set({ currentMarksPerQuestion: marks }),
      setCurrentSections: (sections) => set({ currentSections: sections }),
      setCurrentSectionIndex: (index) => set({ currentSectionIndex: index }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    }),
);

export default useAiCreateStore;
