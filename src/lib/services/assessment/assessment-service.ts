import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { AddGroupToAssessmentProps, AddGroupToAssessmentResponse, AssessmentResponse, CreateAssessmentProps, DeleteAssessmentProps, DeleteAssessmentResponse, GetAssessmentByIdProps, GetAssessmentByIdResponse, GetAssessmentsProps, GetAssessmentsResponse, GetAssignedAssessmentsProps, GetAssignedAssessmentsResponse, RemoveGroupFromAssessmentProps, RemoveGroupFromAssessmentResponse, UpdateAssessmentProps, UpdateAssessmentResponse } from '@/lib/types/assessmentTypes';



// Function to create an assessment
export const createAssessment = async (data: CreateAssessmentProps): Promise<AssessmentResponse | null> => {
  try {
    const response = await axiosInstance.post<AssessmentResponse>('/v1/assessment/create', data);
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// Function to get an assessment
export const getAssessmentById = async ({ id }: GetAssessmentByIdProps): Promise<GetAssessmentByIdResponse | null> => {
  try {
    const response = await axiosInstance.get<GetAssessmentByIdResponse>('/v1/assessment/view', {
      params: { id },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// interface for getAssessments response


export const getAssessments = async (data: GetAssessmentsProps): Promise<GetAssessmentsResponse | null> => {
  try {
    const response = await axiosInstance.get<GetAssessmentsResponse>('/v1/assessment/bulk', {
      params: data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Assessments retrieved successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad request: Invalid parameters provided', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: User does not have the required permissions', data);
        case 500:
          throw new ApiError(status, 'Internal server error', data);
        default:
          throw new ApiError(status || 500, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};



// Function to update an assessment
export const updateAssessment = async (data: UpdateAssessmentProps): Promise<UpdateAssessmentResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateAssessmentResponse>('/v1/assessment/update', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Assessment updated successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// Function to delete an assessment
export const deleteAssessment = async ({ id }: DeleteAssessmentProps): Promise<DeleteAssessmentResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteAssessmentResponse>('/v1/assessment/delete', {
      data: { id },
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Assessment deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// --------------------------------- Group to Assessment ---------------------------------

// Function to Add Group to Assessment
export const addGroupToAssessment = async (data: AddGroupToAssessmentProps): Promise<AddGroupToAssessmentResponse | null> => {
  try {
    const response = await axiosInstance.post<AddGroupToAssessmentResponse>('/v1/assessment/add-group', data);

    if (response.status === 200 || response.status === 201) {
      console.info('Group added to assessment successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 409:
          throw new ApiError(status, 'Conflict: Group already added to assessment', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment or Group not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};




// Function to get assigned assessments
export const getAssignedAssessments = async (data: GetAssignedAssessmentsProps): Promise<GetAssignedAssessmentsResponse | null> => {
  try {
    const response = await axiosInstance.get<GetAssignedAssessmentsResponse>(
      `/v1/assessment/assigned?page=${data.page}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&order=${data.order}`
    );

    if (response.status === 200 || 201) {
      console.info('Assigned assessments retrieved successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid parameters', data);
        case 401:
          throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};



export const removeGroupFromAssessment = async (data: RemoveGroupFromAssessmentProps): Promise<RemoveGroupFromAssessmentResponse | null> => {
  try {
    const response = await axiosInstance.delete<RemoveGroupFromAssessmentResponse>('/v1/assessment/remove-group', {
      data,
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Group removed from assessment successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Not Found: Assessment or Group not found', data);
        case 500:
          throw new ApiError(status, 'Internal Server Error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};