import { useState, useCallback } from 'react';
import {
  createAssessment,
  getAssessmentById,
  getAssessments,
  updateAssessment,
  deleteAssessment,
  addGroupToAssessment,
  getAssignedAssessments,
  removeGroupFromAssessment
} from '@/lib/services/assessment/assessment-service';
import { ApiError } from '@/lib/api/apiError';
import {
  Assessment,
  CreateAssessmentProps,
  GetAssessmentByIdProps,
  GetAssessmentsProps,
  UpdateAssessmentProps,
  DeleteAssessmentProps,
  AddGroupToAssessmentProps,
  RemoveGroupFromAssessmentProps,
  GetAssignedAssessmentsProps,
  GetAssessmentByIdResponse
} from '@/lib/types/assessmentTypes';
import useAssessmentsTableStore from '@/lib/stores/manage-assessment-store/assessments-table';

export const useAssessment = () => {
  const { activePageIndex, displayNumberOfRows, sortBy, order } = useAssessmentsTableStore();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAssessments = useCallback(async (params: GetAssessmentsProps) => {
    setLoading(true);
    try {
      const response = await getAssessments(params);
      if (response) {
        setAssessments(response.data.assessments);
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAssessmentById = useCallback(async (params: GetAssessmentByIdProps) => {
    setLoading(true);
    try {
      const response: GetAssessmentByIdResponse | null = await getAssessmentById(params);
      if (response) {
        return response;
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
    return null;
  }, []);

  const createNewAssessment = useCallback(async (data: CreateAssessmentProps) => {
    setLoading(true);
    try {
      const response = await createAssessment(data);
      if (response) {
        fetchAssessments({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy: sortBy, order: order });
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const updateExistingAssessment = useCallback(async (data: UpdateAssessmentProps) => {
    setLoading(true);
    try {
      const response = await updateAssessment(data);
      if (response) {
        fetchAssessments({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy: sortBy, order: order });
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteExistingAssessment = useCallback(async (data: DeleteAssessmentProps) => {
    setLoading(true);
    try {
      const response = await deleteAssessment(data);
      if (response) {
        fetchAssessments({ page: activePageIndex, pageSize: displayNumberOfRows, sortBy: sortBy, order: order });

      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const addGroup = useCallback(async (data: AddGroupToAssessmentProps) => {
    setLoading(true);
    try {
      const response = await addGroupToAssessment(data);
      if (response) {
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeGroup = useCallback(async (data: RemoveGroupFromAssessmentProps) => {
    setLoading(true);
    try {
      const response = await removeGroupFromAssessment(data);
      if (response) {
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAssignedAssessments = useCallback(async (params: GetAssignedAssessmentsProps) => {
    setLoading(true);
    try {
      const response = await getAssignedAssessments(params);
      if (response) {
      }
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    assessments,
    loading,
    error,
    fetchAssessments,
    fetchAssessmentById,
    createNewAssessment,
    updateExistingAssessment,
    deleteExistingAssessment,
    addGroup,
    removeGroup,
    fetchAssignedAssessments
  };
};
