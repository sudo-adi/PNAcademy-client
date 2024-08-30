import { useState } from 'react';
import { GenerateQuestionsProps, GenerateQuestionsResponse } from '@/lib/types/ai-assessment';
import { ApiError } from '@/lib/api/apiError';
import { generateQuestions } from '@/lib/services/ai-assessment/create';

export const useAICreate = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [questionsResponse, setQuestionsResponse] = useState<GenerateQuestionsResponse | null>(null);

  // Function to generate AI questions
  const createQuestions = async (data: GenerateQuestionsProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GenerateQuestionsResponse | null = await generateQuestions(data);
      if (response) {
        console.info('Questions generated:', response);
        setQuestionsResponse(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    questionsResponse,
    createQuestions,
  };
};
