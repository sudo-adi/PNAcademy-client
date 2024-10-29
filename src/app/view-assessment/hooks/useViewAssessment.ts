import {
  getAssessmentById,
} from '@/lib/services/assessment/assessment-service';
import {
  GetAssessmentByIdData,
  GetAssessmentByIdProps,
} from '@/lib/types/assessmentTypes';
import { ApiError } from '@/lib/api/apiError';

// Hook to manage assessments
export const useViewAssessment = () => {
  // Method to fetch an assessment by ID
  const fetchAssessmentById = async (data: GetAssessmentByIdProps): Promise<GetAssessmentByIdData> => {
    try {
      const response = await getAssessmentById(data);
      if (response.data) {
        return response.data;
      }
      throw new Error('Failed to fetch assessment data');
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };



  return {
    fetchAssessmentById,
  };
};
