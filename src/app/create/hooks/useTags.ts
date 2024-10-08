import { ApiError } from '@/lib/api/apiError';
import { createTag, deleteTag, getTags, updateTag } from '@/lib/services/assessment/tag-service';
import { CreateTagProps, DeleteTagProps, GetTagsProps, GetTagsResponse, ResponseTag, Tag, UpdateTagProps } from '@/lib/types/tagTypes';

export const useTags = () => {
  const fetchTags = async (params: GetTagsProps): Promise<GetTagsResponse['data']> => {
    try {
      const response: GetTagsResponse = await getTags(params);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
    }
  }

  const handleCreateTag = async (tagData: CreateTagProps): Promise<ResponseTag> => {
    try {
      const response = await createTag(tagData);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred',);
      }
    } finally {
    }
  };

  const handleUpdateTag = async (tagData: UpdateTagProps): Promise<ResponseTag> => {
    try {
      const response = await updateTag(tagData);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
    }
  };

  const handleDeleteTag = async (tagId: DeleteTagProps): Promise<boolean> => {
    try {
      const response = await deleteTag(tagId);
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
    }
  };

  return {
    fetchTags,
    handleCreateTag,
    handleUpdateTag,
    handleDeleteTag,
  };
};
