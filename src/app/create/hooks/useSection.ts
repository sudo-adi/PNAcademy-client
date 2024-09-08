import { useState } from 'react';
import { deleteSection } from '@/lib/services/assessment/section-service';

import { ApiError } from '@/lib/api/apiError';
import { DeleteSectionProps, DeleteSectionResponse } from '@/lib/types/sectionTypes';

export const useSection = () => {
  const [deleteSectionResponse, setDeleteSectionResponse] = useState<DeleteSectionResponse | null>(null);
  const [sectionError, setSectionError] = useState<ApiError | null>(null);
  const [sectionLoading, setSectionLoading] = useState<boolean>(false);

  const removeSection = async (data: DeleteSectionProps) => {
    setSectionLoading(true);
    try {
      const response = await deleteSection(data);
      setDeleteSectionResponse(response);
    } catch (err) {
      setSectionError(err as ApiError);
    } finally {
      setSectionLoading(false);
    }
  };

  return {
    deleteSectionResponse,
    sectionError,
    sectionLoading,
    removeSection,
  };
};
