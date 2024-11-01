"use client";
import { AssignedAssessmentQuestion } from '@/lib/types/attemptionTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  assessmentId: string;
  isFullScreen: boolean;
  assessmentIsActive: boolean;
  serverTime: string;
  started_at: string;
  duration: number;
  timer: number;
  totalSections: number;
  currentSectionId: number;
  currentQuestionIndex: number;
  endedSections: number;
  activeSectionQuestions: AssignedAssessmentQuestion[];
}

interface Actions {
  setAssessmentId: (value: string) => void;
  setIsFullScreen: (value: boolean) => void;
  setAssessmentIsActive: (value: boolean) => void;
  setServerTime: (value: string) => void;
  setstarted_at: (value: string) => void;
  setDuration: (value: number) => void;
  setTimer: (value: number) => void;
  setTotalSections: (value: number) => void;
  setCurrentSectionId: (value: number) => void;
  setCurrentQuestionIndex: (value: number) => void;
  setEndedSections: (value: number) => void;
  setActiveSectionQuestions: (value: AssignedAssessmentQuestion[]) => void;
}

const useAttemptAssessmentsStore = create<State & Actions>()(
  persist(
    (set) => ({
      assessmentId: '',
      isFullScreen: false,
      assessmentIsActive: false,
      serverTime: '',
      started_at: '',
      duration: 0,
      timer: 0,
      totalSections: 0,
      currentSectionId: 0,
      currentQuestionIndex: 0,
      endedSections: 0,
      activeSectionQuestions: [],
      setAssessmentId: (value) => set(() => ({ assessmentId: value })),
      setIsFullScreen: (value) => set(() => ({ isFullScreen: value })),
      setAssessmentIsActive: (value) => set(() => ({ assessmentIsActive: value })),
      setServerTime: (value) => set(() => ({ serverTime: value })),
      setstarted_at: (value) => set(() => ({ started_at: value })),
      setDuration: (value) => set(() => ({ duration: value })),
      setTimer: (value) => set(() => ({ timer: value })),
      setTotalSections: (value) => set(() => ({ totalSections: value })),
      setCurrentSectionId: (value) => set(() => ({ currentSectionId: value })),
      setCurrentQuestionIndex: (value) => set(() => ({ currentQuestionIndex: value })),
      setEndedSections: (value) => set(() => ({ endedSections: value })),
      setActiveSectionQuestions: (value) => set(() => ({ activeSectionQuestions: value })),
    }),
    {
      name: 'attemptAssessmentStore',
    }
  )
);

export default useAttemptAssessmentsStore;