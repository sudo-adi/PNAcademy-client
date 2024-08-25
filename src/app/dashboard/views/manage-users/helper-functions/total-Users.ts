import { ApiError } from "@/lib/api/apiError";
import { getUsers } from "@/lib/services/user-service/user-service";
import { GetUsersResponse } from "@/lib/types/userTypes";
import { useCallback, useEffect, useState } from "react";

export const useTotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchTotalUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers: GetUsersResponse | null = await getUsers({ page: 1, pageSize: 9999, sortBy: 'createdAt', order: 'DESC' });
      setTotalUsers(fetchedUsers?.data?.users.length || 0);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTotalUsers();
  }, [fetchTotalUsers]);

  return { totalUsers, loading, error };
};
