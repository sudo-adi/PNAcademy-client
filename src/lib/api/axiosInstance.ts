import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { clearTokens, getAccessToken, getRefreshToken, saveTokens } from "../utils/tokenManager";
import { getNewAccessToken, isTokenExpired } from "../utils/jwtUtils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 120000 // Set timeout to 2 minutes (120,000 milliseconds)
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const newAccessToken = await getNewAccessToken();
      if (newAccessToken) {
        console.log('New access token obtained');
        saveTokens(newAccessToken, refreshToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error('Failed to refresh access token:', error);
    }
  }
  console.log('Failed to obtain new access token');
  clearTokens();
  return null;
};

// Function to handle authentication failure
const handleAuthFailure = () => {
  clearTokens();
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Request interceptor for adding access token to requests
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let accessToken = getAccessToken();
    if (!accessToken || isTokenExpired(accessToken)) {
      console.log('Access token missing or expired, attempting to refresh');
      accessToken = await refreshAccessToken();
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log('Setting Authorization header:', config.headers.Authorization);
    } else {
      console.log('No access token available');
      handleAuthFailure();
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling unauthorized errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } else {
        handleAuthFailure();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;