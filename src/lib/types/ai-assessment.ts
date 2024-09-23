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
  sectionMarks: number;
  questions: AiQuestion[];

}
