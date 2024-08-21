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
  AssessmentResponse,
  CreateAssessmentProps,
  DeleteAssessmentProps,
  DeleteAssessmentResponse,
  GetAssessmentByIdProps,
  GetAssessmentByIdResponse,
  GetAssessmentsProps,
  GetAssignedAssessmentsProps,
  GetAssignedAssessmentsResponse,
  RemoveGroupFromAssessmentProps,
  RemoveGroupFromAssessmentResponse,
  UpdateAssessmentProps,
  UpdateAssessmentResponse,
} from '@/lib/types/assessmentTypes';

export const useAssessment = () => {
  const [assessments, setAssessments] = useState<AssessmentResponse | null>(null);
  const [assessment, setAssessment] = useState<GetAssessmentByIdResponse | null>(null);
  const [assignedAssessments, setAssignedAssessments] = useState<GetAssignedAssessmentsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateAssessment = async (data: CreateAssessmentProps) => {
    setLoading(true);
    try {
      const response = await createAssessment(data);
      setAssessments(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAssessmentById = async (data: GetAssessmentByIdProps) => {
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

  const handleGetAssessments = async (data: GetAssessmentsProps) => {
    setLoading(true);
    try {
      const response = await getAssessments(data);
      // setAssessments(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAssessment = async (data: UpdateAssessmentProps) => {
    setLoading(true);
    try {
      const response = await updateAssessment(data);
      // setAssessment(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssessment = async (data: DeleteAssessmentProps) => {
    setLoading(true);
    try {
      const response = await deleteAssessment(data);
      // setAssessments(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGroupToAssessment = async (data: AddGroupToAssessmentProps) => {
    setLoading(true);
    try {
      const response = await addGroupToAssessment(data);
      // setAssessment(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAssignedAssessments = async (data: GetAssignedAssessmentsProps) => {
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

  const handleRemoveGroupFromAssessment = async (data: RemoveGroupFromAssessmentProps) => {
    setLoading(true);
    try {
      const response = await removeGroupFromAssessment(data);
      // setAssessment(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    assessments,
    assessment,
    assignedAssessments,
    error,
    loading,
    handleCreateAssessment,
    handleGetAssessmentById,
    handleGetAssessments,
    handleUpdateAssessment,
    handleDeleteAssessment,
    handleAddGroupToAssessment,
    handleGetAssignedAssessments,
    handleRemoveGroupFromAssessment,
  };
};
