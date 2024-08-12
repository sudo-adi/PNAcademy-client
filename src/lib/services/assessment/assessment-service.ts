import { AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { ApiError } from '../../api/apiError';

// interface for createAssessment props
interface CreateAssessmentProps {
  name: string;
  description?: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
}

// interface for createAssessment response
interface AssessmentResponse {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  updatedAt: string;
  createdAt: string;
}

// Function to create an assessment
export const createAssessment = async (data: CreateAssessmentProps): Promise<AssessmentResponse | null> => {
  try {
    const response = await axiosInstance.post<AssessmentResponse>('/v1/assessment/create', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Assessment created successfully', response.data);
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

// interface for getAssessment props
interface GetAssessmentByIdProps {
  id: string;
}

// interface for getAssessment response
interface GetAssessmentByIdResponse {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  questions: any[];
}

// Function to get an assessment
export const getAssessmentById = async ({ id }: GetAssessmentByIdProps): Promise<GetAssessmentByIdResponse | null> => {
  try {
    const response = await axiosInstance.get<GetAssessmentByIdResponse>('/v1/assessment/view', {
      params: { id },
    });
    if (response.status === 200 || response.status === 201) {
      console.info('Assessment fetched successfully', response.data);
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


// interface for getAssessments props
interface GetAssessmentsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: 'ASC' | 'DESC';
}

// interface for Assessment (sub part of getAssessment response)
interface Assessment {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  duration: number;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

// interface for getAssessments response
interface GetAssessmentsResponse {
  message: string;
  data: {
    assessments: Assessment[];
    totalPages: number;
  };
}

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


// interface for updateAssessments props
interface UpdateAssessmentProps {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  start_at: string;
  end_at: string;
  // duration: number;
}

// interface for updateAssessments response
interface UpdateAssessmentResponse {
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    start_at: string;
    end_at: string;
    duration: number;
    created_by: string;
    createdAt: string;
    updatedAt: string;
  };
}

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

// interface for deleteAssessment props
interface DeleteAssessmentProps {
  id: string;
}

//  interface for deleteAssessment response
interface DeleteAssessmentResponse {
  message: string;
  data: boolean;
}


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


// interface for addGroupToAssessment props
interface AddGroupToAssessmentProps {
  assessmentId: string;
  groupId: string;
}

// interface for addGroupToAssessment response
interface AddGroupToAssessmentResponse {
  status: string;
}
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


// interface for getAssignedAssessments Data
interface GetAssignedAssessmentsData {
  assessments: Assessment[];
  totalPages: number;
}

// interface for getAssignedAssessments response
interface GetAssignedAssessmentsResponse {
  message: string;
  data: GetAssignedAssessmentsData;
}

// interface for getAssignedAssessments props
interface GetAssignedAssessmentsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "description" | "is_active" | "start_at" | "end_at" | "duration" | "created_by" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

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


// Function to Remove Group from Assessment
interface RemoveGroupFromAssessmentProps {
  assessmentId: string;
  groupId: string;
}


interface RemoveGroupFromAssessmentResponse {
  status: string;
  message: string;
}


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