import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';
import { AddGroupToAssessmentProps, AddGroupToAssessmentResponse, CreateAssessmentProps, CreateAssessmentResponse, DeleteAssessmentProps, DeleteAssessmentResponse, GetAssessmentByIdProps, GetAssessmentByIdResponse, GetAssessmentsProps, GetAssessmentsResponse, GetAssignedAssessmentsProps, GetAssignedAssessmentsResponse, RemoveGroupFromAssessmentProps, RemoveGroupFromAssessmentResponse, SearchAssessmentsProps, SearchAssessmentsResponse, UpdateAssessmentProps, UpdateAssessmentResponse } from '@/lib/types/assessmentTypes';
import { retry } from '@/lib/api/retryApiCalls';



// Function to create an assessment
export const createAssessment = async (data: CreateAssessmentProps): Promise<CreateAssessmentResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<CreateAssessmentResponse>('/v1/assessment/create', data);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};

// Function to get an assessment
export const getAssessmentById = async ({ id }: GetAssessmentByIdProps): Promise<GetAssessmentByIdResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAssessmentByIdResponse>('/v1/assessment/view', {
        params: { id },
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Assessment not found', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to get all assessments
export const getAssessments = async (data: GetAssessmentsProps): Promise<GetAssessmentsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAssessmentsResponse>('/v1/assessment/bulk', {
        params: data,
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad request: Invalid parameters provided', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized: User does not have the required permissions', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to get all assessments
export const searchAssessment = async (data: SearchAssessmentsProps): Promise<SearchAssessmentsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<SearchAssessmentsResponse>('/v1/assessment/search', {
        params: data,
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad request: Invalid parameters provided', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized: User does not have the required permissions', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to get all assessments
export const searchAssignedAssessments = async (data: SearchAssessmentsProps): Promise<SearchAssessmentsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<SearchAssessmentsResponse>('/v1/assessment/assigned/search', {
        params: data,
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad request: Invalid parameters provided', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized: User does not have the required permissions', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to update an assessment
export const updateAssessment = async (data: UpdateAssessmentProps): Promise<UpdateAssessmentResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.patch<UpdateAssessmentResponse>('/v1/assessment/update', data);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Assessment not found', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to delete an assessment
export const deleteAssessment = async ({ id }: DeleteAssessmentProps): Promise<DeleteAssessmentResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<DeleteAssessmentResponse>('/v1/assessment/delete', {
        data: { id },
      });

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Assessment not found', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};

// --------------------------------- Group to Assessment ---------------------------------

// Function to Add Group to Assessment
export const addGroupToAssessment = async (data: AddGroupToAssessmentProps): Promise<AddGroupToAssessmentResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.post<AddGroupToAssessmentResponse>('/v1/assessment/add-group', data);

      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 409:
            throw new ApiError(status, 'Conflict: Group already added to assessment', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Assessment or Group not found', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to get assigned assessments
export const getAssignedAssessments = async (data: GetAssignedAssessmentsProps): Promise<GetAssignedAssessmentsResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.get<GetAssignedAssessmentsResponse>(
        `/v1/assessment/assigned?page=${data.page}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&order=${data.order}`
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        return response.data;
      } else {
        throw new ApiError(response.status, `Unexpected response status: ${response.status}`, response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid parameters', errorData);
          case 401:
            throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to remove a group from an assessment
export const removeGroupFromAssessment = async (data: RemoveGroupFromAssessmentProps): Promise<RemoveGroupFromAssessmentResponse> => {
  return retry(async () => {
    try {
      const response = await axiosInstance.delete<RemoveGroupFromAssessmentResponse>('/v1/assessment/remove-group', {
        data,
      });

      if (response.status === 200 || response.status === 201) {
        console.info('Group removed from assessment successfully', response.data);
        return response.data;
      }

      throw new ApiError(response.status, 'An unexpected error occurred', response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        const status = response?.status ?? 500;
        const errorData = response?.data;

        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', errorData);
          case 404:
            throw new ApiError(status, 'Not Found: Assessment or Group not found', errorData);
          case 500:
            throw new ApiError(status, 'Internal Server Error', errorData);
          default:
            throw new ApiError(status, `HTTP Error: ${status}`, errorData);
        }
      } else if (error instanceof Error) {
        throw new ApiError(500, 'An unexpected error occurred', { message: error.message });
      } else {
        throw new ApiError(500, 'An unknown error occurred', error);
      }
    }
  });
};


// Function to get total marks of an assessment using assessment id
// export const getTotalMarksUsingAssessmentId = async (assessmentId: string): Promise<number | null> => {
//   try {
//     const response = await axiosInstance.get<>(
//       `/v1/assessment/v1/assessment/totalmarks?page=1&pageSize=1&sortBy=id&order=ASC&assessmentId=${assessmentId}`
//     );

//     if (response.status === 200 || 201) {
//       console.info('Total marks retrieved successfully', response.data);
//       return response.data.totalMarks;
//     }
//     return null;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const { status, data } = error.response || {};
//       switch (status) {
//         case 400:
//           throw new ApiError(status, 'Bad Request: Invalid parameters', data);
//         case 401:
//           throw new ApiError(status, 'Unauthorized: JWT token is missing or invalid', data);
//         case 500:
//           throw new ApiError(status, 'Internal Server Error', data);
//         default:
//           throw new ApiError(status!, 'An unexpected error occurred', data);
//       }
//     } else {
//       throw new ApiError(500, 'An unexpected error occurred', error);
//     }
//   }
// };