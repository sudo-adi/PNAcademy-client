import { ApiError } from '@/lib/api/apiError';
import { createTag, deleteTag, getTags, updateTag } from '@/lib/services/assessment/tag-service';
import { CreateTagProps, DeleteTagProps, GetTagProps, GetTagsProps, GetTagsResponse, Tag, UpdateTagProps } from '@/lib/types/tagTypes';
import { useState, useCallback } from 'react';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [message, setMessage] = useState<string>("");

  const fetchTags = useCallback(async (params: GetTagsProps) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTags: GetTagsResponse | null = await getTags(params);
      setTags(fetchedTags?.data.tags || []);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreateTag = async (tagData: CreateTagProps) => {
    setLoading(true);
    setError(null);
    try {
      await createTag(tagData);
      fetchTags({ page: 1, pageSize: 10, sortBy: 'createdAt', order: 'DESC' });
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTag = async (tagData: UpdateTagProps) => {
    setLoading(true);
    setError(null);
    try {
      await updateTag(tagData);
      fetchTags({ page: 1, pageSize: 10, sortBy: 'createdAt', order: 'DESC' });
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTag = async (tagId: DeleteTagProps) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTag(tagId);
      fetchTags({ page: 1, pageSize: 10, sortBy: 'createdAt', order: 'DESC' });
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  return {
    tags,
    loading,
    error,
    fetchTags,
    handleCreateTag,
    handleUpdateTag,
    handleDeleteTag,
  };
};
