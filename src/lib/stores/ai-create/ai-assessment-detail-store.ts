"use client";
import { create } from 'zustand';

interface State {
  assessmentName: string;
  assessmentDescription: string;
  startAt: string;
  endAt: string;
  duration: number;
}

interface Actions {
  setAssessmentName: (name: string) => void;
  setAssessmentDescription: (description: string) => void;
  setStartAt: (startAt: string) => void;
  setEndAt: (endAt: string) => void;
  setDuration: (duration: number) => void;
}


const useAiAssessmentDetailStore = create<State & Actions>((set) => ({
  assessmentName: "",
  assessmentDescription: "...",
  startAt: "",
  endAt: "",
  duration: 1000 * 60 * 60,
  assignedGroups: [],
  setAssessmentName: (name) => set({ assessmentName: name }),
  setAssessmentDescription: (description) => set({ assessmentDescription: description }),
  setStartAt: (startAt) => set({ startAt }),
  setEndAt: (endAt) => set({ endAt }),
  setDuration: (duration) => set({ duration }),
}));

export default useAiAssessmentDetailStore;
