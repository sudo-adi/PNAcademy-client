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
  const [addOptionResponse, setAddOptionResponse] = useState<CreateOptionResponse | null>(null);
  const [patchOptionResponse, setPatchOptionResponse] = useState<UpdateOptionResponse | null>(null);
  const [removeOptionByIdResponse, setRemoveOptionByIdResponse] = useState<DeleteOptionResponse | null>(null);
  const [optionError, setOptionError] = useState<ApiError | null>(null);
  const [optionLoading, setOptionLoading] = useState<boolean>(false);

  const addOption = async (data: CreateOptionProps) => {
    try {
      const response = await createOption(data);
      setAddOptionResponse(response);
    } catch (err) {
      setOptionError(err as ApiError);
    }
  };

  const patchOption = async (data: UpdateOptionProps) => {
    try {
      const response = await updateOption(data);
      setPatchOptionResponse(response);
    } catch (err) {
      setOptionError(err as ApiError);
    }
  };

  const removeOptionById = async (data: DeleteOptionProps) => {
    try {
      const response = await deleteOption(data);
      setRemoveOptionByIdResponse(response);
    } catch (err) {
      setOptionError(err as ApiError);
    }
  };

  return {
    addOptionResponse,
    patchOptionResponse,
    removeOptionByIdResponse,
    optionError,
    optionLoading,
    addOption,
    patchOption,
    removeOptionById,
  };
};
