"use client";
import { AiSection } from '@/lib/types/ai-assessment';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  currentNumberOfQuestions: number;
  currentDifficultyLevel: string;
  currentMarksPerQuestion: number;
  currentSections: AiSection[];
  currentSectionIndex: number;
  currentQuestionIndex: number;
}

interface Actions {
  setCurrentNumberOfQuestions: (number: number) => void;
  setCurrentDifficultyLevel: (level: string) => void;
  setCurrentMarksPerQuestion: (marks: number) => void;
  setCurrentSections: (sections: AiSection[]) => void;
  setCurrentSectionIndex: (index: number) => void;
  setCurrentQuestionIndex: (index: number) => void;
}

const useAiCreateStore = create<State & Actions>()(
  persist(
    (set) => ({
      currentNumberOfQuestions: 0,
      currentDifficultyLevel: '',
      currentMarksPerQuestion: 0,
      currentSections: [],
      currentSectionIndex: 0,
      currentQuestionIndex: 0,

      setCurrentNumberOfQuestions: (number) => set({ currentNumberOfQuestions: number }),
      setCurrentDifficultyLevel: (level) => set({ currentDifficultyLevel: level }),
      setCurrentMarksPerQuestion: (marks) => set({ currentMarksPerQuestion: marks }),
      setCurrentSections: (sections) => set({ currentSections: sections }),
      setCurrentSectionIndex: (index) => set({ currentSectionIndex: index }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    }),
    {
      name: 'ai-create-storage', // Name of the storage (localStorage key)
      partialize: (state) => ({
        currentNumberOfQuestions: state.currentNumberOfQuestions,
        currentDifficultyLevel: state.currentDifficultyLevel,
        currentMarksPerQuestion: state.currentMarksPerQuestion,
      }), // Only persist these parts of the state
    }
  )
);

export default useAiCreateStore;
