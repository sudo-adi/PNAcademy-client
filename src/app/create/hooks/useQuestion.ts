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
  GetQuestionByIdProps,
  UpdateQuestionProps,
  DeleteQuestionProps,
  AddTagToQuestionProps,
  RemoveTagFromQuestionProps,
} from '@/lib/types/questionTypes';
import { ApiError } from '@/lib/api/apiError';
import { Question } from '@/lib/types/assessmentTypes';

export const useQuestions = () => {

  const addQuestion = async (data: CreateQuestionProps): Promise<Question> => {
    try {
      const response = await createQuestion(data);
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

  const getQuestion = async (data: GetQuestionByIdProps): Promise<Question> => {
    try {
      const response = await getQuestionById(data);
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

  const patchQuestion = async (data: UpdateQuestionProps): Promise<Question> => {
    try {
      const response = await updateQuestion(data);
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

  const removeQuestion = async (data: DeleteQuestionProps): Promise<boolean> => {
    try {
      const response = await deleteQuestion(data);
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

  const addTag = async (data: AddTagToQuestionProps): Promise<string> => {
    try {
      const response = await addTagToQuestion(data);
      return response.status;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
    }
  };

  const removeTag = async (data: RemoveTagFromQuestionProps): Promise<string> => {
    try {
      const response = await removeTagFromQuestion(data);
      return response.status;
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
    addQuestion,
    getQuestion,
    patchQuestion,
    removeQuestion,
    addTag,
    removeTag,
  };
};
