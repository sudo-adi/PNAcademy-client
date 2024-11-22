import {
  createAssessment,
  getAssessmentById,
  getAssessments,
  updateAssessment,
  deleteAssessment,
  addGroupToAssessment,
  getAssignedAssessments,
  removeGroupFromAssessment,
} from '@/lib/services/assessment/assessment-service';
import {
  AddGroupToAssessmentProps,
  Assessment,
  CreateAssessmentProps,
  DeleteAssessmentProps,
  GetAssessmentByIdData,
  GetAssessmentByIdProps,
  GetAssessmentsProps,
  GetAssessmentsResponse,
  GetAssignedAssessmentsData,
  GetAssignedAssessmentsProps,
  RemoveGroupFromAssessmentProps,
  UpdateAssessmentProps,
} from '@/lib/types/assessmentTypes';
import { ApiError } from '@/lib/api/apiError';
import { SaveAiGeneratedAssessmentProps, SaveAiGeneratedAssessmentResponse } from '@/lib/types/ai-assessment';
import { saveAiGeneratedAssessment } from '@/lib/services/ai-assessment/create';

// Hook to manage assessments
export const useAssessment = () => {
  // Method to create an assessment
  const addAssessment = async (data: CreateAssessmentProps): Promise<Assessment> => {
    try {
      const response = await createAssessment(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err; // Rethrow the ApiError for handling at a higher level
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

   const addAssessmentWithImport = async (data: SaveAiGeneratedAssessmentProps): Promise<string> => {
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
      // Do something after the request is complete
    }
  };


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

  // Method to fetch all assessments
  const fetchAssessments = async (data: GetAssessmentsProps): Promise<GetAssessmentsResponse['data']> => {
    try {
      const response = await getAssessments(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Method to update an assessment
  const patchAssessment = async (data: UpdateAssessmentProps): Promise<Assessment> => {
    try {
      const response = await updateAssessment(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Method to delete an assessment
  const removeAssessment = async (data: DeleteAssessmentProps): Promise<boolean> => {
    try {
      const response = await deleteAssessment(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Method to assign an assessment to a group
  const assignAssessmentToGroup = async (data: AddGroupToAssessmentProps): Promise<string> => {
    try {
      const response = await addGroupToAssessment(data);
      return response.status;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Method to fetch assigned assessments
  const fetchAssignedAssessments = async (data: GetAssignedAssessmentsProps): Promise<GetAssignedAssessmentsData> => {
    try {
      const response = await getAssignedAssessments(data);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Method to remove an assessment from a group
  const removeAssessmentFromGroup = async (data: RemoveGroupFromAssessmentProps): Promise<string> => {
    try {
      const response = await removeGroupFromAssessment(data);
      return response.message;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  };



  return {
    addAssessment,
    fetchAssessmentById,
    fetchAssessments,
    patchAssessment,
    removeAssessment,
    assignAssessmentToGroup,
    fetchAssignedAssessments,
    removeAssessmentFromGroup,
    addAssessmentWithImport,
  };
};
