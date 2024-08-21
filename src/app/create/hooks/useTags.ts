import { useState, useCallback } from 'react';
import {
  createTag,
  getTagById,
  getTags,
  updateTag,
  deleteTag
} from '@/lib/services/assessment/tag-service';
import {
  CreateTagProps,
  CreateTagResponse,
  GetTagProps,
  GetTagByIdResponse,
  GetTagsProps,
  GetTagsResponse,
  UpdateTagProps,
  UpdateTagResponse,
  DeleteTagProps,
  DeleteTagResponse
} from '@/lib/types/tagTypes';
import { ApiError } from '@/lib/api/apiError';

export const useTags = () => {
  const [tags, setTags] = useState<GetTagsResponse | null>(null);
  const [tag, setTag] = useState<GetTagByIdResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createTag = useCallback(async (data: CreateTagProps): Promise<CreateTagResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await createTag(data);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  const getTagById = useCallback(async (params: GetTagProps): Promise<GetTagByIdResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTagById(params);
      setTag(response);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  const getAllTags = useCallback(async (params: GetTagsProps): Promise<GetTagsResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTags(params);
      setTags(response);
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      return null;
    }
  }, []);

  const updateTag = useCallback(async (data: UpdateTagProps): Promise<UpdateTagResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateTag(data);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  const removeTag = useCallback(async (params: DeleteTagProps): Promise<DeleteTagResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteTag(params);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  return {
    tags,
    tag,
    loading,
    error,
    createTag,
    getTagById,
    getAllTags,
    updateTag,
    removeTag,
  };
};
