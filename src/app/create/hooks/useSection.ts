import { deleteSection } from '@/lib/services/assessment/section-service';
import { DeleteSectionProps } from '@/lib/types/sectionTypes';

export const useSection = () => {

  const removeSection = async (data: DeleteSectionProps): Promise<string> => {
    try {
      const response = await deleteSection(data);
      return response.status;
    } catch (err) {
      throw err;
    } finally {

    }
  };

  return {
    removeSection,
  };
};
