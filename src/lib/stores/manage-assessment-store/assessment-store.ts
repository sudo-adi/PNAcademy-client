"use client";
import { create } from 'zustand';

interface State {
  assessmentId: string;
  currentSection: number;
  currentQuestionNo: string;
  question: string;
  options: string[];
  sections: number[];
  questionSectionMap: Record<string, string[]>[];
  marks: number;
}

interface Actions {
  setAssessmentId: (assessmentId: string) => void;
  setCurrentSection: (section: number) => void;
  setCurrentQuestionNo: (questionNo: string) => void;
  setQuestion: (question: string) => void;
  setOptions: (options: string[]) => void;
  setSections: (sections: number[]) => void;
  setQuestionSectionMap: (map: Record<string, string[]>[]) => void;
  setMarks: (marks: number) => void;
}

const useAssessmentStore = create<State & Actions>((set) => ({
  assessmentId: "",
  currentSection: 0,
  currentQuestionNo: "",
  question: "",
  options: [],
  sections: [],
  questionSectionMap: [],
  marks: 0,

  setAssessmentId: (assessmentId) => set({ assessmentId }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setCurrentQuestionNo: (currentQuestionNo) => set({ currentQuestionNo }),
  setQuestion: (question) => set({ question }),
  setOptions: (options) => set({ options }),
  setSections: (sections) => set({ sections }),
  setQuestionSectionMap: (map) => set({ questionSectionMap: map }),
  setMarks: (marks) => set({ marks })

}));

export default useAssessmentStore;
