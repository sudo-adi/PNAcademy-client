import {
  startAssessmentAttempt,
  startAssessmentSection,
  attemptQuestion,
  endSection,
  endAssessmentAttempt,
  getAssessmentTimeDetails,
} from '@/lib/services/assessment/attemption-service'; // Import all required services
import {
  AssessmentStartSectionStatus,
  AssignedAssessmentQuestion,
  AttemptQuestionProps,
  EndAssessmentProps,
  EndSectionProps,
  GetAssessmentTimeDetailsProps,
  GetAssessmentTimeDetailsResponse,
  StartAssessmentAttemptProps,
  StartAssessmentSectionProps,
} from '@/lib/types/attemptionTypes';


export const useAttemption = () => {

  // Function to start assessment attempt
  const startAssessment = async (data: StartAssessmentAttemptProps): Promise<AssessmentStartSectionStatus[]> => {
    try {
      const response = await startAssessmentAttempt(data);
      return response.sections;
    } catch (err) {
      throw err;
    } finally {
    }
  };

  // Function to start section attempt
  const startSection = async (data: StartAssessmentSectionProps): Promise<AssignedAssessmentQuestion[]> => {
    try {
      const response = await startAssessmentSection(data);
      return response.questions;
    } catch (err) {
      throw err;
    } finally {
    }
  };

  // Function to attempt a question
  const startQuestion = async (data: AttemptQuestionProps): Promise<string> => {
    console.log("data", data);
    try {
      const response = await attemptQuestion(data);
      console.log("hook ka response", response);
      return response.status;
    } catch (err) {
      throw err;
    } finally {

    }
  };

  // Function to end section
  const stopSection = async (data: EndSectionProps): Promise<string> => {

    try {
      const response = await endSection(data);
      return response.status;
    } catch (err) {
      throw err;
    } finally {

    }
  };

  // Function to end assessment attempt
  const stopAssessment = async (data: EndAssessmentProps): Promise<string> => {
    try {
      const response = await endAssessmentAttempt(data);
      return response.status;
    } catch (err) {
      throw err;
    } finally {
    }
  };

  // Function to get assessment time details
  const fetchAssessmentTimeDetails = async (data: GetAssessmentTimeDetailsProps): Promise<GetAssessmentTimeDetailsResponse['data']> => {
    try {
      const response = await getAssessmentTimeDetails(data);
      return response.data;
    } catch (err) {
      throw err;
    } finally {

    }
  };

  return {
    startAssessment,
    startSection,
    startQuestion,
    stopSection,
    stopAssessment,
    fetchAssessmentTimeDetails,
  };
};