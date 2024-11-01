"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
assessmentId  : string;
}
interface Actions {
setAssessmentId: (assessmentId: string) => void;
}
const useVerificationStore = create<State & Actions>()(
  (set) => ({
    assessmentId: "",
    setAssessmentId: (assessmentId) => set({ assessmentId: assessmentId }),
    }),
);

export default useVerificationStore;