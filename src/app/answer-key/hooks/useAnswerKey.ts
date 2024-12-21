
import { ApiError } from '@/lib/api/apiError';
import { explainAnswer, getAssessmentUserResponses, getMyResponses } from '@/lib/services/reports/reports-service';
import {  ExplainAnswerProps, ExplainAnswerResponse, GetAnswerKeyProps, GetAnswerKeyResponse } from '@/lib/types/answer-keyTypes';

export const useAnswerKey = () => {

  const getResponsesForUser = async (params: GetAnswerKeyProps): Promise<GetAnswerKeyResponse['data']['sections']> => {
    try {
      const response = await getAssessmentUserResponses(params);
      return response.data.sections;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  const getMyResponsesForAssessment = async (params: GetAnswerKeyProps): Promise<GetAnswerKeyResponse['data']['sections']> => {
    try {
      const response = await getMyResponses(params);
      return response.data.sections;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

   const getExplanation = async (questionId: string) => {
    try {
      const data: ExplainAnswerProps = {
        questionId: questionId,
      };
      const response = await explainAnswer(data);
      return response;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };


  return {
    getResponsesForUser,
    getMyResponsesForAssessment,
    getExplanation,
  };
};

