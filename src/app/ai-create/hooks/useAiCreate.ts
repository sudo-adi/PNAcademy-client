import { useState } from 'react';
import { GenerateQuestionsProps, GenerateQuestionsResponse } from '@/lib/types/ai-assessment';
import { ApiError } from '@/lib/api/apiError';
import { generateQuestions } from '@/lib/services/ai-assessment/create';

export const useAICreate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questionsResponse, setQuestionsResponse] = useState<GenerateQuestionsResponse | null>(null);

  // Function to generate AI questions
  const createQuestions = async (data: GenerateQuestionsProps) => {
    setLoading(true);
    try {
      const response: GenerateQuestionsResponse | null = await generateQuestions(data);
      if (response) {
        setQuestionsResponse(response);
        return response;
      }
      return;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new ApiError(500, 'An error occurred while generating questions', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    questionsResponse,
    createQuestions,
  };
};
