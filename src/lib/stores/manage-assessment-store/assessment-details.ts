"use client";
import { getAccessToken } from '@/lib/utils/tokenManager';
import { create } from 'zustand';

interface State {
  assessmentName: string;
  assessmentDescription: string;
  startAt: string;
  endAt: string;
  duration: number;
  is_active: boolean;
  createdBy: string;
}

interface Actions {
  setAssessmentName: (name: string) => void;
  setAssessmentDescription: (description: string) => void;
  setStartAt: (startAt: string) => void;
  setEndAt: (endAt: string) => void;
  setDuration: (duration: number) => void;
  setIsActive: (isActive: boolean) => void;
}

const createdBy = getAccessToken();
const useCreateAssessmentStore = create<State & Actions>((set) => ({
  assessmentName: "New Assessment",
  assessmentDescription: "...",
  startAt: "2024-08-14T10:18:44.781Z",
  endAt: "2024-08-14T10:18:44.781Z",
  duration: 1000 * 60 * 60,
  is_active: false,
  createdBy: createdBy || "",
  setAssessmentName: (name) => set({ assessmentName: name }),
  setAssessmentDescription: (description) => set({ assessmentDescription: description }),
  setStartAt: (startAt) => set({ startAt }),
  setEndAt: (endAt) => set({ endAt }),
  setDuration: (duration) => set({ duration }),
  setIsActive: (is_active) => set({ is_active }),
}));

export default useCreateAssessmentStore;
