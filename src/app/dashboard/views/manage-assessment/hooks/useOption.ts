import { useState } from 'react';
import { createOption, updateOption, deleteOption } from '@/lib/services/assessment/option-service';
import {
  CreateOptionProps,
  CreateOptionResponse,
  UpdateOptionProps,
  UpdateOptionResponse,
  DeleteOptionProps,
  DeleteOptionResponse
} from '@/lib/types/optionTypes';
import { ApiError } from '@/lib/api/apiError';

export const useOptions = () => {
  const [createResponse, setCreateResponse] = useState<CreateOptionResponse | null>(null);
  const [updateResponse, setUpdateResponse] = useState<UpdateOptionResponse | null>(null);
  const [deleteResponse, setDeleteResponse] = useState<DeleteOptionResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const create = async (data: CreateOptionProps) => {
    try {
      const response = await createOption(data);
      setCreateResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const update = async (data: UpdateOptionProps) => {
    try {
      const response = await updateOption(data);
      setUpdateResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  const deleteById = async (data: DeleteOptionProps) => {
    try {
      const response = await deleteOption(data);
      setDeleteResponse(response);
    } catch (err) {
      setError(err as ApiError);
    }
  };

  return {
    createResponse,
    updateResponse,
    deleteResponse,
    error,
    create,
    update,
    deleteById,
  };
};
