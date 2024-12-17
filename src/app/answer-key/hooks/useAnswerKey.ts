
import { ApiError } from '@/lib/api/apiError';
import { getAssessmentUserResponses, getMyResponses } from '@/lib/services/reports/reports-service';
import { GetAssessmentResponsesProps, GetAssessmentResponsesResponse, GetMyResponsesProps, GetMyResponsesResponse } from '@/lib/types/reportTypes';

export const useAnswerKey = () => {
  const getResponsesForUser = async (params: GetAssessmentResponsesProps): Promise<GetAssessmentResponsesResponse> => {
    try {
      const response = await getAssessmentUserResponses(params);
      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  const getMyResponsesForAssessment = async (params: GetMyResponsesProps): Promise<GetMyResponsesResponse> => {
    try {
      const response = await getMyResponses(params);
      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  return {
    getResponsesForUser,
    getMyResponsesForAssessment,
  };
};