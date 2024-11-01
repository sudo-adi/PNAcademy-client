import { useState } from 'react';
import { GenerateQuestionsProps, GenerateQuestionsResponse, SaveAiGeneratedAssessmentProps, SaveAiGeneratedAssessmentResponse } from '@/lib/types/ai-assessment';
import { ApiError } from '@/lib/api/apiError';
import { generateQuestions, saveAiGeneratedAssessment } from '@/lib/services/ai-assessment/create';


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

  const createSingleQuestion = async (data: GenerateQuestionsProps) => {
    try {
      const response: GenerateQuestionsResponse | null = await generateQuestions(data);
      if (response) {
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
    }
  };

  // Function to save AI-generated assessment
  const saveAssessment = async (data: SaveAiGeneratedAssessmentProps): Promise<string> => {
    setLoading(true);
    try {
      const response: SaveAiGeneratedAssessmentResponse = await saveAiGeneratedAssessment(data);
      if (response) {
        return response.data.assessmentId;
      }
      throw new ApiError(500, 'An error occurred while saving the assessment', response);
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new ApiError(500, 'An error occurred while saving the assessment', err);
      }
    } finally {
    }
  };


  return {
    loading,
    questionsResponse,
    createQuestions,
    saveAssessment,
    createSingleQuestion,
  };
};
