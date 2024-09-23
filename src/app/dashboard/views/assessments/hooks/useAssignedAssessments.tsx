import { useState } from 'react';
import { GetAssignedAssessmentsProps, GetAssignedAssessmentsResponse, Assessment } from '@/lib/types/assessmentTypes';
import { ApiError } from '@/lib/api/apiError';
import { getAssignedAssessments } from '@/lib/services/assessment/assessment-service';

export const useAssignedAssessments = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [fetchedAssignedAssessmentsRes, setFetchedAssignedAssessmentsRes] = useState<GetAssignedAssessmentsResponse | null>(null);

  // Function to fetch assigned assessments
  const fetchAssignedAssessments = async (params: GetAssignedAssessmentsProps) => {
    setLoading(true);
    setError(null);
    try {
      const response: GetAssignedAssessmentsResponse | null = await getAssignedAssessments(params);
      if (response) {
        setAssessments(response.data.assessments);
        setFetchedAssignedAssessmentsRes(response);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };


  // const fetchTotalMarksUsingAssessmentId = async (assessmentId: string) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response: GetAssignedAssessmentsResponse | null = await getAssignedAssessments(params);
  //     if (response) {
  //       setAssessments(response.data.assessments);
  //       setFetchedAssignedAssessmentsRes(response);
  //     }
  //   } catch (err) {
  //     if (err instanceof ApiError) {
  //       setError(err);
  //     } else {
  //       setError(new ApiError(500, 'An unexpected error occurred', err));
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  return {
    assessments,
    loading,
    error,
    fetchedAssignedAssessmentsRes,
    fetchAssignedAssessments,
  };


};
