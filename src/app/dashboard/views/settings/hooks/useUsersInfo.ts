import { useState } from 'react';
import { getUserInfo } from '@/lib/services/user-service/user-service'; // Assuming the service is in this path
import { GetUserInfoResponse } from '@/lib/types/userTypes'; // Define this type based on your response schema
import { ApiError } from '@/lib/api/apiError';

export const useUserInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [userInfo, setUserInfo] = useState<GetUserInfoResponse | null>(null);
  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await getUserInfo();
      if (response) {
        console.info('User info retrieved:', response);
      }
      else {
        console.error('No user info found');
      }
    } catch (err) {
      if (err instanceof ApiError) {
        console.log('An error occurred:', err);
        setError(err);
      } else {
        setError(new ApiError(500, 'An unexpected error occurred', err));
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    userInfo,
    loading,
    error,
    fetchUserInfo,
  };
};
