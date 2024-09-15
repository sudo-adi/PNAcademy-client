"use client";
import { getDecodedTokenData } from '@/lib/utils/jwtUtils';
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
  assignedGroups: string[];
}

interface Actions {
  setAssessmentName: (name: string) => void;
  setAssessmentDescription: (description: string) => void;
  setStartAt: (startAt: string) => void;
  setEndAt: (endAt: string) => void;
  setDuration: (duration: number) => void;
  setIsActive: (isActive: boolean) => void;
  setCreatedBy: (createdBy: string) => void;
  setAssignedGroups: (groups: string[]) => void;
}

const data = getDecodedTokenData();
const userId = data?.userId;
const useCreateAssessmentDetailsStore = create<State & Actions>((set) => ({
  assessmentName: "",
  assessmentDescription: "...",
  startAt: "",
  endAt: "",
  duration: 1000 * 60 * 60,
  is_active: false,
  createdBy: userId || "",
  assignedGroups: [],
  setAssessmentName: (name) => set({ assessmentName: name }),
  setAssessmentDescription: (description) => set({ assessmentDescription: description }),
  setStartAt: (startAt) => set({ startAt }),
  setEndAt: (endAt) => set({ endAt }),
  setDuration: (duration) => set({ duration }),
  setIsActive: (is_active) => set({ is_active }),
  setCreatedBy: (createdBy: string) => set({ createdBy }),
  setAssignedGroups: (groups) => set({ assignedGroups: groups }),
}));

export default useCreateAssessmentDetailsStore;
