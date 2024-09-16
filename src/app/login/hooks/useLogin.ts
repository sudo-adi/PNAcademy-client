import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from 'zod';
import { checkAuth, login } from "@/lib/services/auth-service";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

interface UseLoginProps {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async ({ email, password }: UseLoginProps): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      loginSchema.parse({ email, password }); // Validate the login data
      const success = await login(email, password);

      if (success) {
        router.push('/dashboard');
      }

      return success;
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
      throw err;  // Rethrow the error for further handling
    } finally {
      setLoading(false); // Always set loading to false after the operation
    }
  };

  const isLoggedIn = async (): Promise<void> => {
    setLoading(true);
    try {
      await checkAuth(setLoading, router);
    } catch (err) {
      setError("Authentication check failed.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, isLoggedIn, loading, error };
}
