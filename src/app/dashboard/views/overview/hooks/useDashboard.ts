import { ApiError } from '@/lib/api/apiError';
import { getDraftAssessmentsCount, getOngoingAssessmentsCount, getPastAssessmentsCount, getScheduledAssessmentsCount, getTotalAssessments } from '@/lib/services/dashboard-service/dashboard-stats';
 // Adjust the import path as needed

// Hook to manage dashboard statistics
export const useDashboardStats = () => {

  // Hook Method to get total number of assessments
  const fetchTotalAssessments = async (): Promise<number> => {
    try {
      return await getTotalAssessments();
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred while fetching total assessments');
      }
    }
  };

  // Hook Method to get count of ongoing assessments
  const fetchOngoingAssessmentsCount = async (): Promise<number> => {
    try {
      return await getOngoingAssessmentsCount();
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred while fetching ongoing assessments count');
      }
    }
  };

  // Hook Method to get count of scheduled assessments
  const fetchScheduledAssessmentsCount = async (): Promise<number> => {
    try {
      return await getScheduledAssessmentsCount();
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred while fetching scheduled assessments count');
      }
    }
  };

  // Hook Method to get count of past assessments
  const fetchPastAssessmentsCount = async (): Promise<number> => {
    try {
      return await getPastAssessmentsCount();
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred while fetching past assessments count');
      }
    }
  };

  // Hook Method to get count of draft assessments
  const fetchDraftAssessmentsCount = async (): Promise<number> => {
    try {
      return await getDraftAssessmentsCount();
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      } else {
        throw new Error('An unexpected error occurred while fetching draft assessments count');
      }
    }
  };

  // Method to fetch all dashboard stats at once
  const fetchAllDashboardStats = async () => {
    try {
      const [total, ongoing, scheduled, past, draft] = await Promise.all([
        fetchTotalAssessments(),
        fetchOngoingAssessmentsCount(),
        fetchScheduledAssessmentsCount(),
        fetchPastAssessmentsCount(),
        fetchDraftAssessmentsCount()
      ]);

      console.log('total', total);
      console.log('ongoing', ongoing);
      console.log('scheduled', scheduled);
      console.log('past', past);
      console.log('draft', draft);



      return {
        totalAssessments: total,
        ongoingAssessmentsCount: ongoing,
        scheduledAssessmentsCount: scheduled,
        pastAssessmentsCount: past,
        draftAssessmentsCount: draft
      };
    } catch (err) {
      console.log(err);
      if (err instanceof ApiError) {
        console.log(err);
        throw err;
      } else {
        console.log(err);
        throw new Error('An unexpected error occurred while fetching dashboard statistics');
      }
    }
  };

  return {
    fetchTotalAssessments,
    fetchOngoingAssessmentsCount,
    fetchScheduledAssessmentsCount,
    fetchPastAssessmentsCount,
    fetchDraftAssessmentsCount,
    fetchAllDashboardStats
  };
};