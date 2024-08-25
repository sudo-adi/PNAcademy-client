"use client";
import { create } from 'zustand';

interface State {
  section: string;
  questionNo: string;
  question: string;
  options: string[];
}

interface Actions {
  setSection: (section: string) => void;
  setQuestionNo: (questionNo: string) => void;
  setQuestion: (question: string) => void;
  setOptions: (options: string[]) => void;
}

const useAssessmentCreateStore = create<State & Actions>((set) => ({
  section: "",
  questionNo: "",
  question: "",
  options: [],

  setSection: (section) => set({ section }),
  setQuestionNo: (questionNo) => set({ questionNo }),
  setQuestion: (question) => set({ question }),
  setOptions: (options) => set({ options }),
}));

export default useAssessmentCreateStore;

