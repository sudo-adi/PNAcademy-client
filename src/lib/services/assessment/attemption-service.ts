import { ApiError } from "@/lib/api/apiError";
import axiosInstance from "@/lib/api/axiosInstance";
import { AttemptQuestionProps, AttemptQuestionResponse, EndAssessmentProps, EndAssessmentResponse, EndSectionProps, EndSectionResponse, StartAssessmentAttemptProps, StartAssessmentAttemptResponse, StartAssessmentSectionProps, StartAssessmentSectionResponse } from "@/lib/types/attemptionTypes";
import { AxiosError } from "axios";


export const startAssessmentAttempt = async (
  data: StartAssessmentAttemptProps
): Promise<StartAssessmentAttemptResponse | null> => {
  try {
    const response = await axiosInstance.put<StartAssessmentAttemptResponse>(
      '/v1/assessment/attempt/start',
      data
    );

    if (response.status === 200) {
      console.info('Assessment attempt started successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 403:
          throw new ApiError(status, 'Forbidden: Assessment has not started yet or has already ended', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment with the specified ID does not exist', data);
        case 409:
          throw new ApiError(status, 'Conflict: Assessment already started by the user', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error: Error starting the assessment', data);
        default:
          throw new ApiError(status || 500, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


export const startAssessmentSection = async (
  data: StartAssessmentSectionProps
): Promise<StartAssessmentSectionResponse | null> => {
  try {
    const response = await axiosInstance.put<StartAssessmentSectionResponse>(
      '/v1/assessment/attempt/section/start',
      data
    );

    if (response.status === 200) {
      console.info('Section started successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 403:
          throw new ApiError(status, 'Forbidden: Assessment has not started yet, already ended, or the section has already been submitted', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment or user with the specified ID does not exist', data);
        case 409:
          throw new ApiError(status, 'Conflict: Section already submitted or section is invalid', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error: Error starting section', data);
        default:
          throw new ApiError(status || 500, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// Function to attempt a specific question in an assessment
export const attemptQuestion = async (
  data: AttemptQuestionProps
): Promise<AttemptQuestionResponse | null> => {
  try {
    const response = await axiosInstance.post<AttemptQuestionResponse>(
      '/v1/assessment/attempt/question',
      data
    );

    if (response.status === 200) {
      console.info('Question attempted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 403:
          throw new ApiError(status, 'Forbidden: Assessment has either not started yet or has already ended', data);
        case 404:
          throw new ApiError(status, 'Not Found: Question or assessment with the specified ID does not exist', data);
        case 409:
          throw new ApiError(status, 'Conflict: Question has already been attempted', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error: Error attempting question', data);
        default:
          throw new ApiError(status || 500, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


export const endSection = async (
  data: EndSectionProps
): Promise<EndSectionResponse | null> => {
  try {
    const response = await axiosInstance.put<EndSectionResponse>(
      '/v1/assessment/attempt/section/end',
      data
    );

    if (response.status === 200) {
      console.info('Section ended successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid section number or assessment ID', data);
        case 403:
          throw new ApiError(status, 'Forbidden: Not authorized to end this section', data);
        case 404:
          throw new ApiError(status, 'Not Found: Section or assessment with this ID does not exist', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error: Error ending section', data);
        default:
          throw new ApiError(status || 500, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// Function to end an ongoing assessment attempt
export const endAssessmentAttempt = async (
  data: EndAssessmentProps
): Promise<EndAssessmentResponse | null> => {
  try {
    // Send PUT request to end the assessment
    const response = await axiosInstance.put<EndAssessmentResponse>(
      '/v1/assessment/attempt/end',
      data
    );

    // Check if the response is successful
    if (response.status === 200) {
      console.info('Assessment ended successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    // Handle errors returned by the server
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(
            status,
            'Bad Request: All sections must be completed before ending the assessment',
            data
          );
        case 403:
          throw new ApiError(
            status,
            'Forbidden: Not authorized to end this assessment',
            data
          );
        case 404:
          throw new ApiError(
            status,
            'Not Found: Assessment with this ID does not exist',
            data
          );
        case 500:
          throw new ApiError(status, 'Internal Server Error: Error ending assessment', data);
        default:
          throw new ApiError(status || 500, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

