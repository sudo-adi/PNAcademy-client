export interface GenerateQuestionsResponse {
  message: string;
  data: {
    questions: Array<{
      description: string;
      Options: Array<{
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

