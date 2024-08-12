"use client";
import axios from 'axios';
import { saveTokens, clearTokens, getAccessToken, getRefreshToken, clearAccessTokens } from '../utils/tokenManager';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
// Function to handle login
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    // Validate input
    loginSchema.parse({ username, password });
    // Your authentication logic to fetch tokens from the server
    const { data } = await axios.post('http://localhost:4000/v1/user/login', {
      "email": username,
      "password": password,
      "deviceType": "web"
    });

    // Save tokens in HttpOnly cookies
    saveTokens(data.accessToken, data.refreshToken);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

// Function to handle logout
export const logout = (): void => {
  clearTokens();
  console.log("logout")
  // Optionally, you can redirect the user to the login page or another page
};

// Function to check if user is logged in
export const isLoggedIn = (): boolean => {
  const token = getAccessToken();
  return !!token;
};

// function to check auth at landing page
export const checkAuth = async (setLoading: (loading: boolean) => void, router: any): Promise<void> => {
  const refreshToken = getRefreshToken();

  if (isLoggedIn()) {
    setLoading(true);
    //logger
    console.log('user is logged in');
    router.push('/dashboard');
    clearAccessTokens();
    setLoading(false);
  }

  else if (refreshToken) {
    try {
      console.log('refresh token found', refreshToken);
      const { data } = await axios.post<{ accessToken: string; refreshToken: string }>('http://localhost:4000/v1/user/access-token', { "refreshToken": refreshToken.toString() });
      saveTokens(data.accessToken, refreshToken);
      //logger
      console.log('access token generated again');
      console.log(data.accessToken);
      router.push('/dashboard');
    } catch (error) {
      clearTokens();
      router.push('/login');
    } finally {
      setLoading(false);
    }
  } else {
    // logger
    console.log('no refresh token found hence redirecting to login page');
    setLoading(false);
    router.push('/login');
  }
};