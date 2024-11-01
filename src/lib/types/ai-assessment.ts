export interface GenerateQuestionsResponse {
  message: string;
  data: {
    questions: Array<{
      description: string;
      options: Array<{
        description: string;
        isCorrect: boolean;
      }>;
    }>;
  };
}

export interface GenerateQuestionsProps {
  topic: string;
  numberOfQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
}
export interface AiOption {
  description: string;
  isCorrect: boolean;
}

export interface AiQuestion {
  description: string;
  options: AiOption[];
}

export interface AiQuestionsResponse {
  message: string;
  data: {
    questions: AiQuestion[];
  };
}

export interface AiSection {
  prompt: string;
  difficultyLevel: "easy" | "medium" | "hard" | "";
  markPerQuestion: number;
  questions: AiQuestion[];

}

// Interfaces for the payload and response types
export interface AssessmentOption {
  description: string;
  isCorrect: boolean;
}

export interface AssessmentQuestion {
  description: string;
  section: number;
  marks: number;
  options: AssessmentOption[];
}

export interface SaveAiGeneratedAssessmentProps {
  name: string;
  description: string;
  is_active: boolean;
  start_at: string; // ISO date string
  end_at: string; // ISO date string
  duration: number; // in milliseconds
  questions: AiQuestion[];
}

export interface SaveAiGeneratedAssessmentResponse {
  message: string;
  data: {
    assessmentId: string; // UUID of the saved assessment
  };
}