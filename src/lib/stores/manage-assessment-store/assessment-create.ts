"use client";
import { Option, Question } from '@/lib/types/assessmentTypes';
import { create } from 'zustand';

interface State {
  // Assessment details
  assessmentId: string;
  assessmentName: string;
  assessmentDescription: string;
  assessmentDuration: number;
  startsAt: string;
  endsAt: string;
  selectedGroups: string[];

  // Assessment content
  assessmentData: Question[][];
  currentSectionData: Question[];

  // Assessment metadata
  totalMarks: number;
  totalQuestions: number;
  totalSections: number;

  // Current section
  currentSectionIndex: number;

  // Current question
  currentQuestionIndex: number;
  currentQuestionId: string;
  currentQuestionContent: string;
  currentQuestionMarks: number;

  // Current option
  currentOptionId: string;
  currentOptionContent: string;
  currentOptionsContent: Option[];
  currentOptionIsCorrect: boolean;

  // Current Marks
  currentMarks: number;
}

interface Actions {
  // Setters for assessment details
  setAssessmentId: (id: string) => void;
  setAssessmentName: (name: string) => void;
  setAssessmentDescription: (description: string) => void;
  setAssessmentDuration: (duration: number) => void;
  setStartsAt: (startsAt: string) => void;
  setEndsAt: (endsAt: string) => void;
  setSelectedGroups: (groups: string[]) => void;

  // Setters for assessment content
  setAssessmentData: (data: Question[][]) => void;

  // Setters for assessment metadata
  setTotalMarks: (marks: number) => void;
  setTotalSections: (totalSections: number) => void;
  setTotalQuestions: (totalQuestions: number) => void;

  // Setters for current section
  setCurrentSectionIndex: (index: number) => void;
  setCurrentSectionData: (data: Question[]) => void;

  // Setters for current question
  setCurrentQuestionId: (id: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setCurrentQuestionContent: (content: string) => void;
  setCurrentQuestionMarks: (marks: number) => void;

  // Setters for current option
  setCurrentOptionId: (id: string) => void;
  setCurrentOptionContent: (content: string) => void;
  setCurrentOptionsContent: (options: Option[]) => void;
  setCurrentOptionIsCorrect: (isCorrect: boolean) => void;

  // Setters for current marks
  setCurrentMarks: (marks: number) => void;
}

const useCreateAssessmentStore = create<State & Actions>((set) => ({
  // Initial State
  assessmentId: '',
  assessmentName: '',
  assessmentDescription: '',
  assessmentDuration: 0,
  startsAt: '',
  endsAt: '',
  selectedGroups: [],

  assessmentData: [],
  currentSectionData: [],
  totalMarks: 0,
  totalSections: 0,
  totalQuestions: 0,
  currentSectionIndex: 0,
  currentQuestionId: '',
  currentQuestionIndex: 0,
  currentQuestionContent: '',
  currentQuestionMarks: 0,
  currentOptionId: '',
  currentOptionContent: '',
  currentOptionsContent: [],
  currentOptionIsCorrect: false,
  currentMarks: 0,

  // Actions
  setAssessmentId: (id) => set({ assessmentId: id }),
  setAssessmentName: (name) => set({ assessmentName: name }),
  setAssessmentDescription: (description) => set({ assessmentDescription: description }),
  setAssessmentDuration: (duration) => set({ assessmentDuration: duration }),
  setStartsAt: (startsAt) => set({ startsAt }),
  setEndsAt: (endsAt) => set({ endsAt }),
  setSelectedGroups: (groups) => set({ selectedGroups: groups }),
  setAssessmentData: (data) => set({ assessmentData: data }),
  setCurrentSectionData: (data) => set({ currentSectionData: data }),
  setTotalMarks: (marks) => set({ totalMarks: marks }),
  setTotalSections: (totalSections) => set({ totalSections }),
  setTotalQuestions: (totalQuestions) => set({ totalQuestions }),
  setCurrentSectionIndex: (index) => set({ currentSectionIndex: index }),
  setCurrentQuestionId: (id) => set({ currentQuestionId: id }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setCurrentQuestionContent: (content) => set({ currentQuestionContent: content }),
  setCurrentQuestionMarks: (marks) => set({ currentQuestionMarks: marks }),
  setCurrentOptionId: (id) => set({ currentOptionId: id }),
  setCurrentOptionContent: (content) => set({ currentOptionContent: content }),
  setCurrentOptionsContent: (options) => set({ currentOptionsContent: options }),
  setCurrentOptionIsCorrect: (isCorrect) => set({ currentOptionIsCorrect: isCorrect }),
  setCurrentMarks: (marks) => set({ currentMarks: marks }),
}));

export default useCreateAssessmentStore;











// "use client";
// import { Option, Question } from '@/lib/types/assessmentTypes';
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface State {
//   // Assessment details
//   assessmentId: string;
//   assessmentName: string;
//   assessmentDescription: string;
//   assessmentDuration: number;
//   startsAt: string;
//   endsAt: string;
//   selectedGroups: string[];

//   // Assessment content
//   assessmentData: Question[][];
//   currentSectionData: Question[];

//   // Assessment metadata
//   totalMarks: number;
//   totalQuestions: number;
//   totalSections: number;

//   // Current section
//   currentSectionIndex: number;

//   // Current question
//   currentQuestionIndex: number;
//   currentQuestionId: string;
//   currentQuestionContent: string;
//   currentQuestionMarks: number;

//   // Current option
//   currentOptionId: string;
//   currentOptionContent: string;
//   currentOptionsContent: Option[];
//   currentOptionIsCorrect: boolean;

//   // Current Marks
//   currentMarks: number;
// }

// interface Actions {
//   // Setters for assessment details
//   setAssessmentId: (id: string) => void;
//   setAssessmentName: (name: string) => void;
//   setAssessmentDescription: (description: string) => void;
//   setAssessmentDuration: (duration: number) => void;
//   setStartsAt: (startsAt: string) => void;
//   setEndsAt: (endsAt: string) => void;
//   setSelectedGroups: (groups: string[]) => void;

//   // Setters for assessment content
//   setAssessmentData: (data: Question[][]) => void;

//   // Setters for assessment metadata
//   setTotalMarks: (marks: number) => void;
//   setTotalSections: (totalSections: number) => void;
//   setTotalQuestions: (totalQuestions: number) => void;

//   // Setters for current section
//   setCurrentSectionIndex: (index: number) => void;
//   setCurrentSectionData: (data: Question[]) => void;

//   // Setters for current question
//   setCurrentQuestionId: (id: string) => void;
//   setCurrentQuestionIndex: (index: number) => void;
//   setCurrentQuestionContent: (content: string) => void;
//   setCurrentQuestionMarks: (marks: number) => void;

//   // Setters for current option
//   setCurrentOptionId: (id: string) => void;
//   setCurrentOptionContent: (content: string) => void;
//   setCurrentOptionsContent: (options: Option[]) => void;
//   setCurrentOptionIsCorrect: (isCorrect: boolean) => void;

//   // Setters for current marks
//   setCurrentMarks: (marks: number) => void;
// }

// const useCreateAssessmentStore = create<State & Actions>()(
//   persist(
//     (set) => ({
//       // Initial State
//       assessmentId: '',
//       assessmentName: '',
//       assessmentDescription: '',
//       assessmentDuration: 0,
//       startsAt: '',
//       endsAt: '',
//       selectedGroups: [],

//       assessmentData: [],
//       currentSectionData: [],
//       totalMarks: 0,
//       totalSections: 0,
//       totalQuestions: 0,
//       currentSectionIndex: 0,
//       currentQuestionId: '',
//       currentQuestionIndex: 0,
//       currentQuestionContent: '',
//       currentQuestionMarks: 0,
//       currentOptionId: '',
//       currentOptionContent: '',
//       currentOptionsContent: [],
//       currentOptionIsCorrect: false,
//       currentMarks: 0,

//       // Actions
//       setAssessmentId: (id) => set({ assessmentId: id }),
//       setAssessmentName: (name) => set({ assessmentName: name }),
//       setAssessmentDescription: (description) => set({ assessmentDescription: description }),
//       setAssessmentDuration: (duration) => set({ assessmentDuration: duration }),
//       setStartsAt: (startsAt) => set({ startsAt }),
//       setEndsAt: (endsAt) => set({ endsAt }),
//       setSelectedGroups: (groups) => set({ selectedGroups: groups }),
//       setAssessmentData: (data) => set({ assessmentData: data }),
//       setCurrentSectionData: (data) => set({ currentSectionData: data }),
//       setTotalMarks: (marks) => set({ totalMarks: marks }),
//       setTotalSections: (totalSections) => set({ totalSections }),
//       setTotalQuestions: (totalQuestions) => set({ totalQuestions }),
//       setCurrentSectionIndex: (index) => set({ currentSectionIndex: index }),
//       setCurrentQuestionId: (id) => set({ currentQuestionId: id }),
//       setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
//       setCurrentQuestionContent: (content) => set({ currentQuestionContent: content }),
//       setCurrentQuestionMarks: (marks) => set({ currentQuestionMarks: marks }),
//       setCurrentOptionId: (id) => set({ currentOptionId: id }),
//       setCurrentOptionContent: (content) => set({ currentOptionContent: content }),
//       setCurrentOptionsContent: (options) => set({ currentOptionsContent: options }),
//       setCurrentOptionIsCorrect: (isCorrect) => set({ currentOptionIsCorrect: isCorrect }),
//       setCurrentMarks: (marks) => set({ currentMarks: marks }),
//     }),
//     {
//       name: 'create-assessment-store',
//     }
//   )
// );

// export default useCreateAssessmentStore;
