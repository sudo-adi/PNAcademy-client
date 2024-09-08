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
  GetAssessmentByIdData,
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
import { ApiError } from '@/lib/api/apiError';

export const useAssessment = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [assessment, setAssessment] = useState<GetAssessmentByIdData>();
  const [assignedAssessments, setAssignedAssessments] = useState<GetAssignedAssessmentsResponse | null>(null);
  const [assessmentError, setAssessmentError] = useState<ApiError | null>(null);
  const [assessmentLoading, setAssessmentLoading] = useState<boolean>(false);
  const [fetchAssessmentsRes, setFetchAssessmentsRes] = useState<GetAssessmentsResponse | null>(null);
  const [fetchAssessmentByIdRes, setFetchAssessmentByIdRes] = useState<GetAssessmentByIdResponse | null>(null);
  const [createAssessmentRes, setCreateAssessmentRes] = useState<AssessmentResponse | null>(null);
  const [removeAssessmentRes, setRemoveAssessmentRes] = useState<DeleteAssessmentResponse | null>(null);
  const [addAssessmentToGroupRes, setAddAssessmentToGroupRes] = useState<AddGroupToAssessmentResponse | null>(null);
  const [removeAssessmentFromGroupRes, setRemoveAssessmentFromGroupRes] = useState<RemoveGroupFromAssessmentResponse | null>(null);
  const [patchedAssessmentRes, setPatchedAssessmentRes] = useState<UpdateAssessmentResponse | null>(null);

  const addAssessment = async (data: CreateAssessmentProps) => {
    setAssessmentLoading(true);
    try {
      const response = await createAssessment(data);
      setCreateAssessmentRes(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };

  const fetchAssessmentById = async (data: GetAssessmentByIdProps) => {
    setAssessmentLoading(true);
    try {
      const response: GetAssessmentByIdResponse | null = await getAssessmentById(data);
      if (response && response.data) {
        setAssessment(response.data);
        setFetchAssessmentByIdRes(response);
        return response;
      } else {
        throw new Error('Failed to fetch assessment data');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };


  const fetchAssessments = async (data: GetAssessmentsProps) => {
    setAssessmentLoading(true);
    try {
      const response: GetAssessmentsResponse | null = await getAssessments(data);
      if (response) {
        const { data: { assesments } } = response;
        setAssessments(assesments);
        setFetchAssessmentsRes(response);
        console.info('Assessments fetched:', response.data.assesments);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };

  const patchAssessment = async (data: UpdateAssessmentProps) => {
    setAssessmentLoading(true);
    try {
      const response: UpdateAssessmentResponse | null = await updateAssessment(data);
      setPatchedAssessmentRes(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };

  const removeAssessment = async (data: DeleteAssessmentProps) => {
    setAssessmentLoading(true);
    try {
      const response = await deleteAssessment(data);
      setRemoveAssessmentRes(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };

  const assignAssessmentToGroup = async (data: AddGroupToAssessmentProps) => {
    setAssessmentLoading(true);
    try {
      const response = await addGroupToAssessment(data);
      setAddAssessmentToGroupRes(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };

  const fetchAssignedAssessments = async (data: GetAssignedAssessmentsProps) => {
    setAssessmentLoading(true);
    try {
      const response = await getAssignedAssessments(data);
      setAssignedAssessments(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }
    } finally {
      setAssessmentLoading(false);
    }
  };

  const removeAssessmentFromGroup = async (data: RemoveGroupFromAssessmentProps) => {
    setAssessmentLoading(true);
    try {
      const response = await removeGroupFromAssessment(data);
      setRemoveAssessmentFromGroupRes(response);
    } catch (err) {
      if (err instanceof ApiError) {
        setAssessmentError(err);
      } else {
        console.log(err);
      }

    } finally {
      setAssessmentLoading(false);
    }
  };

  return {
    assessment,
    assignedAssessments,
    assessmentError,
    assessmentLoading,
    createAssessmentRes,
    removeAssessmentRes,
    addAssessmentToGroupRes,
    removeAssessmentFromGroupRes,
    patchedAssessmentRes,
    fetchAssessmentByIdRes,
    fetchAssessmentsRes,
    addAssessment,
    setPatchedAssessmentRes,
    fetchAssessmentById,
    fetchAssessments,
    patchAssessment,
    removeAssessment,
    assignAssessmentToGroup,
    fetchAssignedAssessments,
    removeAssessmentFromGroup,
  };
};
