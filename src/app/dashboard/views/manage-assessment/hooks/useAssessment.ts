import { useState } from 'react';
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
  AddGroupToAssessmentResponse,
  Assessment,
  AssessmentResponse,
  CreateAssessmentProps,
  DeleteAssessmentProps,
  DeleteAssessmentResponse,
  GetAssessmentByIdProps,
  GetAssessmentByIdResponse,
  GetAssessmentsProps,
  GetAssessmentsResponse,
  GetAssignedAssessmentsProps,
  GetAssignedAssessmentsResponse,
  RemoveGroupFromAssessmentProps,
  RemoveGroupFromAssessmentResponse,
  UpdateAssessmentProps,
  UpdateAssessmentResponse,
} from '@/lib/types/assessmentTypes';

export const useAssessment = () => {
  const [assessments, setAssessments] = useState<Assessment[] | null>(null);
  const [assessment, setAssessment] = useState<GetAssessmentByIdResponse | null>(null);
  const [assignedAssessments, setAssignedAssessments] = useState<GetAssignedAssessmentsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchAssessmentsRes, setFetchAssessmentsRes] = useState<GetAssessmentsResponse | null>(null);
  const [fetchAssessmentByIdRes, setFetchAssessmentByIdRes] = useState<GetAssessmentByIdResponse | null>(null);
  const [createAssessmentRes, setCreateAssessmentRes] = useState<AssessmentResponse | null>(null);
  const [removeAssessmentRes, setRemoveAssessmentRes] = useState<DeleteAssessmentResponse | null>(null);
  const [addAssessmentToGroupRes, setAddAssessmentToGroupRes] = useState<AddGroupToAssessmentResponse | null>(null);
  const [removeAssessmentFromGroupRes, setRemoveAssessmentFromGroupRes] = useState<RemoveGroupFromAssessmentResponse | null>(null);
  const [updateAssessmentRes, setUpdateAssessmentRes] = useState<UpdateAssessmentResponse | null>(null);

  const addAssessment = async (data: CreateAssessmentProps) => {
    setLoading(true);
    try {
      const response = await createAssessment(data);
      setCreateAssessmentRes(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessmentById = async (data: GetAssessmentByIdProps) => {
    setLoading(true);
    try {
      const response = await getAssessmentById(data);
      setAssessment(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssessments = async (data: GetAssessmentsProps) => {
    setLoading(true);
    try {
      const response: GetAssessmentsResponse | null = await getAssessments(data);
      if (response) {
        const { data: { assesments } } = response;
        setAssessments(assesments);
        setFetchAssessmentsRes(response);
        console.info('Assessments fetched:', response.data.assesments);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const patchAssessment = async (data: UpdateAssessmentProps) => {
    setLoading(true);
    try {
      const response: UpdateAssessmentResponse | null = await updateAssessment(data);
      setUpdateAssessmentRes(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const removeAssessment = async (data: DeleteAssessmentProps) => {
    setLoading(true);
    try {
      const response = await deleteAssessment(data);
      setRemoveAssessmentRes(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const addAssessmentToGroup = async (data: AddGroupToAssessmentProps) => {
    setLoading(true);
    try {
      const response = await addGroupToAssessment(data);
      setAddAssessmentToGroupRes(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignedAssessments = async (data: GetAssignedAssessmentsProps) => {
    setLoading(true);
    try {
      const response = await getAssignedAssessments(data);
      setAssignedAssessments(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const removeAssessmentFromGroup = async (data: RemoveGroupFromAssessmentProps) => {
    setLoading(true);
    try {
      const response = await removeGroupFromAssessment(data);
      setRemoveAssessmentFromGroupRes(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    assessment,
    assignedAssessments,
    error,
    loading,
    createAssessmentRes,
    removeAssessmentRes,
    addAssessmentToGroupRes,
    removeAssessmentFromGroupRes,
    updateAssessmentRes,
    fetchAssessmentByIdRes,
    fetchAssessmentsRes,
    addAssessment,
    fetchAssessmentById,
    fetchAssessments,
    patchAssessment,
    removeAssessment,
    addAssessmentToGroup,
    fetchAssignedAssessments,
    removeAssessmentFromGroup,
  };
};
