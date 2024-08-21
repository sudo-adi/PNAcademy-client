import { useState } from 'react';
import { createQuestion, getQuestionById, updateQuestion, deleteQuestion, addTagToQuestion, removeTagFromQuestion } from '@/lib/services/assessment/question-service';
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
  RemoveTagFromQuestionResponse
} from '@/lib/types/questionTypes';
import { ApiError } from '@/lib/api/apiError';

export const useQuestions = () => {
  const [question, setQuestion] = useState<GetQuestionResponse | null>(null);
  const [createResponse, setCreateResponse] = useState<CreateQuestionResponse | null>(null);
  const [updateResponse, setUpdateResponse] = useState<UpdateQuestionResponse | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<DeleteQuestionResponse | null>(null);
  const [addTagResponse, setAddTagResponse] = useState<AddTagToQuestionResponse | null>(null);
  const [removeTagResponse, setRemoveTagResponse] = useState<RemoveTagFromQuestionResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const create = async (data: CreateQuestionProps) => {
    try {
      const response = await createQuestion(data);
      setCreateResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const getById = async (data: GetQuestionByIdProps) => {
    try {
      const response = await getQuestionById(data);
      setQuestion(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const update = async (data: UpdateQuestionProps) => {
    try {
      const response = await updateQuestion(data);
      setUpdateResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const deleteById = async (data: DeleteQuestionProps) => {
    try {
      const response = await deleteQuestion(data);
      setDeleteResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const addTag = async (data: AddTagToQuestionProps) => {
    try {
      const response = await addTagToQuestion(data);
      setAddTagResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const removeTag = async (data: RemoveTagFromQuestionProps) => {
    try {
      const response = await removeTagFromQuestion(data);
      setRemoveTagResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  return {
    question,
    createResponse,
    updateResponse,
    deleteResponse,
    addTagResponse,
    removeTagResponse,
    error,
    create,
    getById,
    update,
    deleteById,
    addTag,
    removeTag,
  };
};
