import { useState } from 'react';
import {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  addTagToQuestion,
  removeTagFromQuestion,
} from '@/lib/services/assessment/question-service';
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
import { ApiError } from '@/lib/api/apiError';

export const useQuestions = () => {
  const [addQuestionResponse, setAddQuestionResponse] = useState<CreateQuestionResponse | null>(null);
  const [patchQuestionResponse, setPatchQuestionResponse] = useState<UpdateQuestionResponse | null>(null);
  const [removeQuestionResponse, setRemoveQuestionResponse] = useState<DeleteQuestionResponse | null>(null);
  const [addTagResponse, setAddTagResponse] = useState<AddTagToQuestionResponse | null>(null);
  const [removeTagResponse, setRemoveTagResponse] = useState<RemoveTagFromQuestionResponse | null>(null);
  const [question, setQuestion] = useState<GetQuestionResponse | null>(null);
  const [questionError, setQuestionError] = useState<ApiError | null>(null);
  const [questionLoading, setQuestionLoading] = useState<boolean>(false);

  const addQuestion = async (data: CreateQuestionProps) => {
    setQuestionLoading(true);
    try {
      const response = await createQuestion(data);
      setAddQuestionResponse(response);
      return response;
    } catch (err) {
      setQuestionError(err as ApiError);
      console.log("error caught", err);
    } finally {
      setQuestionLoading(false);
    }
  };

  const getQuestion = async (data: GetQuestionByIdProps) => {
    setQuestionLoading(true);
    try {
      const response = await getQuestionById(data);
      setQuestion(response);
    } catch (err) {
      setQuestionError(err as ApiError);
    } finally {
      setQuestionLoading(false);
    }
  };

  const patchQuestion = async (data: UpdateQuestionProps) => {
    setQuestionLoading(true);
    try {
      const response = await updateQuestion(data);
      setPatchQuestionResponse(response);
    } catch (err) {
      setQuestionError(err as ApiError);
    } finally {
      setQuestionLoading(false);
    }
  };

  const removeQuestion = async (data: DeleteQuestionProps) => {
    setQuestionLoading(true);
    try {
      const response = await deleteQuestion(data);
      setRemoveQuestionResponse(response);
    } catch (err) {
      setQuestionError(err as ApiError);
    } finally {
      setQuestionLoading(false);
    }
  };

  const addTag = async (data: AddTagToQuestionProps) => {
    setQuestionLoading(true);
    try {
      const response = await addTagToQuestion(data);
      setAddTagResponse(response);
    } catch (err) {
      setQuestionError(err as ApiError);
    } finally {
      setQuestionLoading(false);
    }
  };

  const removeTag = async (data: RemoveTagFromQuestionProps) => {
    setQuestionLoading(true);
    try {
      const response = await removeTagFromQuestion(data);
      setRemoveTagResponse(response);
    } catch (err) {
      setQuestionError(err as ApiError);
    } finally {
      setQuestionLoading(false);
    }
  };

  return {
    addQuestionResponse,
    patchQuestionResponse,
    removeQuestionResponse,
    addTagResponse,
    removeTagResponse,
    question,
    questionError,
    questionLoading,
    addQuestion,
    getQuestion,
    patchQuestion,
    removeQuestion,
    addTag,
    removeTag,
  };
};
