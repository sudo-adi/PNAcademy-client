import { getUserInfo } from '@/lib/services/user-service/user-service'; // Assuming the service is in this path
import { ApiError } from '@/lib/api/apiError';
import { GetUserInfoResponse, SingleUser } from '@/lib/types/userTypes';

export const useUserInfo = () => {
  const fetchUserInfo = async (): Promise<SingleUser> => {
    try {
      const response = await getUserInfo();
      if (!response?.data) {
        throw new ApiError(500, 'No user data received', response);
      }
      return response.data;
    } catch (err) {
      if (err instanceof ApiError) {
        throw err;
      }
      throw new ApiError(500, 'An unexpected error occurred fetching user info', err);
    }
  };

  return {
    fetchUserInfo,
  };
};