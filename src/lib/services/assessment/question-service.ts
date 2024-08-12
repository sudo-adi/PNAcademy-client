import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AxiosError } from 'axios';


// interface for Create Question props
interface CreateQuestionProps {
  assessment_id: string;
  description: string;
  marks: number;
  section: number;
}

// interface for createQuestion response
interface CreateQuestionResponse {
  message: string;
  data: {
    id: string;
    assessment_id: string;
    description: string;
    marks: number;
    section: number;
    updatedAt: string;
    createdAt: string;
  };
}

export const createQuestion = async (data: CreateQuestionProps): Promise<CreateQuestionResponse | null> => {
  try {
    const response = await axiosInstance.post<CreateQuestionResponse>('/v1/assessment/question', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Question created successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        const { status, data } = response;
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'Network error or unexpected error', error.message);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// interface for getQuestionById response
interface GetQuestionByIdProps {
  id: string;
}

// interface for getQuestion response
interface GetQuestionResponse {
  message: string;
  data: {
    id: string;
    assessment_id: string;
    description: string;
    marks: number;
    section: number;
    updatedAt: string;
    createdAt: string;
  };
}


// Function to get question by ID
export const getQuestionById = async ({ id }: GetQuestionByIdProps): Promise<GetQuestionResponse | null> => {
  try {
    const response = await axiosInstance.get<GetQuestionResponse>('/v1/assessment/question', {
      params: { id },
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Question fetched successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        const { status, data } = response;
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', data);
          case 404:
            throw new ApiError(status, 'Not Found: Question not found', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'Network error or unexpected error', error.message);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// interface for Update Question props
interface UpdateQuestionProps {
  id: string;
  description: string;
  marks: number;
}

// interface for updateQuestion response
interface UpdateQuestionResponse {
  message: string;
  data: {
    id: string;
    assessment_id: string;
    description: string;
    marks: number;
    section: number;
    createdAt: string;
    updatedAt: string;
  };
}


// Function to update question
export const updateQuestion = async (data: UpdateQuestionProps): Promise<UpdateQuestionResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateQuestionResponse>('/v1/assessment/question', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Question updated successfully', response.data);
      return response.data;
    }
    return null;

  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        const { status, data } = response;
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', data);
          case 404:
            throw new ApiError(status, 'Not Found: Question not found', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'Network error or unexpected error', error.message);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// interface for Delete Question By Id
interface DeleteQuestionProps {
  id: string;
}

// interface for Delete Question Response
interface DeleteQuestionResponse {
  message: string;
  data: boolean;
}

// Function to delete question by ID
export const deleteQuestion = async ({ id }: DeleteQuestionProps): Promise<DeleteQuestionResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteQuestionResponse>('/v1/assessment/question', {
      data: { id },
    });
    if (response.status === 200 || response.status === 201) {
      console.info('Question deleted successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response) {
        const { status, data } = response;
        switch (status) {
          case 400:
            throw new ApiError(status, 'Bad Request: Invalid data provided', data);
          case 404:
            throw new ApiError(status, 'Not Found: Question not found', data);
          case 500:
            throw new ApiError(status, 'Internal Server Error', data);
          default:
            throw new ApiError(status, 'An unexpected error occurred', data);
        }
      } else {
        throw new ApiError(500, 'Network error or unexpected error', error.message);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};

// interface for addTagToQuestion props
interface AddTagToQuestionProps {
  questionId: string;
  tagId: string;
}

// interface for addTagToQuestion response
interface AddTagToQuestionResponse {
  status: string;
}

// Function to add tag to question
export const addTagToQuestion = async (data: AddTagToQuestionProps): Promise<AddTagToQuestionResponse | null> => {
  try {
    const response = await axiosInstance.post<AddTagToQuestionResponse>(
      '/v1/assessment/question/addTag', data
    );

    if (response.status === 200 || response.status === 201) {
      console.info('Tag added to question successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad request: Invalid data provided', data);
        case 404:
          throw new ApiError(status, 'Question or Tag not found', data);
        case 500:
          throw new ApiError(status, 'Internal server error', data);
        default:
          throw new ApiError(status!, 'An unexpected error occurred', data);
      }
    } else {
      throw new ApiError(500, 'An unexpected error occurred', error);
    }
  }
};


// interface for removeTagFromQuestion props
interface RemoveTagFromQuestionProps {
  questionId: string;
  tagId: string;
}

// interface for removeTagFromQuestion response
interface RemoveTagFromQuestionResponse {
  status: string;
  message: string;
}

// Function to remove tag from question
export const removeTagFromQuestion = async (
  data: RemoveTagFromQuestionProps
): Promise<RemoveTagFromQuestionResponse | null> => {
  try {
    const response = await axiosInstance.delete<RemoveTagFromQuestionResponse>(
      '/v1/assessment/question/removeTag',
      { data } // Axios delete request should pass the data object inside the `data` property
    );
    if (response.status === 200 || response.status === 201) {
      console.info('Tag removed from question successfully', response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      const { status, data } = error.response || {};
      switch (status) {
        case 400:
          throw new ApiError(status, 'Bad Request: Invalid ID format or missing parameters', data);
        case 401:
          throw new ApiError(status, 'Unauthorized', data);
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
