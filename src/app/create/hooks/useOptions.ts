import { useState, useCallback } from 'react';
import {
  createOption,
  updateOption,
  deleteOption
} from '@/lib/services/assessment/option-service';
import {
  CreateOptionProps,
  CreateOptionResponse,
  UpdateOptionProps,
  UpdateOptionResponse,
  DeleteOptionProps,
  DeleteOptionResponse
} from '@/lib/types/optionTypes';
import { ApiError } from 'next/dist/server/api-utils';

export const useOption = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const createOption = useCallback(async (data: CreateOptionProps): Promise<CreateOptionResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await createOption(data);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  const updateOption = useCallback(async (data: UpdateOptionProps): Promise<UpdateOptionResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateOption(data);
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  const removeOption = useCallback(async (params: DeleteOptionProps): Promise<DeleteOptionResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteOption(params);
      setLoading(false);
      return response;
    } catch (err: any) {
      setLoading(false);
      setError(err as ApiError);
      return null;
    }
  }, []);

  return {
    loading,
    error,
    createOption,
    updateOption,
    removeOption,
  };
};
