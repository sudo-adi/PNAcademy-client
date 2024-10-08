import { createOption, updateOption, deleteOption } from '@/lib/services/assessment/option-service';
import {
  CreateOptionProps,
  UpdateOptionProps,
  DeleteOptionProps,
  Option,
} from '@/lib/types/optionTypes';
import { ApiError } from '@/lib/api/apiError';

export const useOptions = () => {
  const addOption = async (data: CreateOptionProps): Promise<Option> => {
    try {
      const response = await createOption(data);
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

  const patchOption = async (data: UpdateOptionProps): Promise<Option> => {
    try {
      const response = await updateOption(data);
      return response.data
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred');
      }
    } finally {
    }
  };

  const removeOptionById = async (data: DeleteOptionProps): Promise<boolean> => {
    try {
      const response = await deleteOption(data);
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
    addOption,
    patchOption,
    removeOptionById,
  };
};
