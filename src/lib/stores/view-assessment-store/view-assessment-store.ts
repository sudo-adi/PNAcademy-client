"use client";
import { ViewQuestion } from '@/lib/types/attemptionTypes';
import { create } from 'zustand';

interface State {
  activeSectionIndex: number;
  activeQuestionIndex: number;
  activeQuestion: ViewQuestion;
}
interface Actions {
  setActiveSectionIndex: (index: number) => void;
  setActiveQuestion: (question: ViewQuestion) => void;
  setActiveQuestionIndex: (index: number) => void;
}
const useViewAssessmentStore = create<State & Actions>()(
  (set) => ({
    activeSectionIndex: 0,
    activeQuestionIndex: 0,
    activeQuestion: {} as ViewQuestion,
    setActiveQuestion: (question) => set({ activeQuestion: question }),
    setActiveSectionIndex: (index) => set({ activeSectionIndex: index }),
    setActiveQuestionIndex: (index) => set({ activeQuestionIndex: index }),
    }),
);

export default useViewAssessmentStore;