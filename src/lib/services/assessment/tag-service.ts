import { ApiError } from '@/lib/api/apiError';
import axiosInstance from '@/lib/api/axiosInstance';
import { AxiosError } from 'axios';

// interface for createTag props
interface CreateTagProps {
  name: string;
}

// interface for createTag response
interface CreateTagResponse {
  message: string;
  data: {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };
}

// Function to Create a Tag
export const createTag = async (data: CreateTagProps): Promise<CreateTagResponse | null> => {
  try {
    const response = await axiosInstance.post<CreateTagResponse>('/v1/assessment/tag', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Tag created successfully', response.data);
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


// interface for getTagById props
interface GetTagProps {
  id: string;
}

// interface for getTagById response
interface GetTagByIdResponse {
  status: string;
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Function  to get a Tag by ID
export const getTagById = async ({ id }: GetTagProps): Promise<GetTagByIdResponse | null> => {
  try {
    const response = await axiosInstance.get<GetTagByIdResponse>(`/v1/assessment/tag?id=${id}`);

    if (response.status === 200 || response.status === 201) {
      console.info('Tag retrieved successfully', response.data);
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
          throw new ApiError(status, 'Not Found: Tag not found', data);
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

// interface for getTags props
interface GetTagsProps {
  page: number;
  pageSize: number;
  sortBy: "id" | "name" | "createdAt" | "updatedAt";
  order: "ASC" | "DESC";
}

// interface for Tag
interface Tag {
  id: string;
  name: string;
  // Add other properties of a tag if needed
}

// interface for getTags response
interface GetTagsResponse {
  message: string;
  data: {
    tags: Tag[];
    totalPages: number;
  };
}

export const getTags = async (
  params: GetTagsProps
): Promise<GetTagsResponse | null> => {
  try {
    const response = await axiosInstance.get<GetTagsResponse>('/v1/assessment/tags', { params });

    if (response.status === 200 || response.status === 201) {
      console.info('Tags fetched successfully', response.data);
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
          throw new ApiError(status, 'Tags not found', data);
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


// interface for getTags props
interface UpdateTagProps {
  id: string;
  name: string;
}

// interface for updateTag response
interface UpdateTagResponse {
  message: string;
  data: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Function to update a Tag
export const updateTag = async (data: UpdateTagProps): Promise<UpdateTagResponse | null> => {
  try {
    const response = await axiosInstance.patch<UpdateTagResponse>('/v1/assessment/tag', data);
    if (response.status === 200 || response.status === 201) {
      console.info('Tag updated successfully', response.data);
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
          throw new ApiError(status, 'Not Found: Tag not found', data);
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


// interface for deleteTag props
interface DeleteTagProps {
  id: string;
}

// interface for deleteTag response
interface DeleteTagResponse {
  message: string;
  data: boolean;
}

// Function to delete a Tag
export const deleteTag = async ({ id }: DeleteTagProps): Promise<DeleteTagResponse | null> => {
  try {
    const response = await axiosInstance.delete<DeleteTagResponse>('/v1/assessment/tag', {
      data: { id },
    });

    if (response.status === 200 || response.status === 201) {
      console.info('Tag deleted successfully', response.data);
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
          throw new ApiError(status, 'Not Found: Tag not found', data);
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