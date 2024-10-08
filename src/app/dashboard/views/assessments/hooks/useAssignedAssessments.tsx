import { GetAssignedAssessmentsProps, GetAssignedAssessmentsResponse, Assessment } from '@/lib/types/assessmentTypes';
import { ApiError } from '@/lib/api/apiError';
import { getAssignedAssessments } from '@/lib/services/assessment/assessment-service';

export const useAssignedAssessments = () => {

  // Function to fetch assigned assessments
  const fetchAssignedAssessments = async (payload: GetAssignedAssessmentsProps): Promise<Assessment[]> => {
    try {
      const response: GetAssignedAssessmentsResponse = await getAssignedAssessments(payload);
      if (response.data.assessments) {
        return response.data.assessments;
      } else {
        throw new Error("Failed to fetch assigned assessments");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        console.error('API Error:', err.message);
        throw err;
      } else {
        console.error('Error:', err);
        throw err;
      }
    } finally {
      // Cleanup if needed
    }
  };



  return {
    fetchAssignedAssessments,
  };
};