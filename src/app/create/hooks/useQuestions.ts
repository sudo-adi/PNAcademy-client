import { useState, useCallback } from 'react';
import {
  CreateQuestionProps,
  CreateQuestionResponse,
  GetQuestionByIdProps,
  GetQuestionResponse,
  UpdateQuestionProps,
  UpdateQuestionResponse,
  DeleteQuestionProps,
  DeleteQuestionResponse,
  AddTagToQuestionProps,
  AddTagToQuestionResponse,
  RemoveTagFromQuestionProps,
  RemoveTagFromQuestionResponse,
} from '@/lib/types/questionTypes';
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  addTagToQuestion,
  removeTagFromQuestion,
} from '@/lib/services/assessment/question-service';
import { ApiError } from '@/lib/api/apiError';

export const useQuestions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const handleCreateQuestion = useCallback(
    async (data: CreateQuestionProps): Promise<CreateQuestionResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await createQuestion(data);
        return response;
      } catch (err) {
        setError(err as ApiError)
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleGetQuestionById = useCallback(
    async (data: GetQuestionByIdProps): Promise<GetQuestionResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await getQuestionById(data);
        return response;
      } catch (err) {
        setError(err as ApiError);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUpdateQuestion = useCallback(
    async (data: UpdateQuestionProps): Promise<UpdateQuestionResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await updateQuestion(data);
        return response;
      } catch (err) {
        setError(err as ApiError)
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleDeleteQuestion = useCallback(
    async (data: DeleteQuestionProps): Promise<DeleteQuestionResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await deleteQuestion(data);
        return response;
      } catch (err) {
        setError(err as ApiError);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleAddTagToQuestion = useCallback(
    async (data: AddTagToQuestionProps): Promise<AddTagToQuestionResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await addTagToQuestion(data);
        return response;
      } catch (err) {
        setError(err as ApiError)
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleRemoveTagFromQuestion = useCallback(
    async (data: RemoveTagFromQuestionProps): Promise<RemoveTagFromQuestionResponse | null> => {
      setLoading(true);
      setError(null);
      try {
        const response = await removeTagFromQuestion(data);
        return response;
      } catch (err) {
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    handleCreateQuestion,
    handleGetQuestionById,
    handleUpdateQuestion,
    handleDeleteQuestion,
    handleAddTagToQuestion,
    handleRemoveTagFromQuestion,
  };
};
