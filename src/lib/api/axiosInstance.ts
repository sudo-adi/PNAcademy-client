
import axios, { AxiosError, AxiosInstance, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios";
import { clearTokens, getAccessToken } from "../utils/tokenManager";
import { getNewAccessToken, isTokenExpired } from "../utils/jwtUtils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 120000// Set timeout to 2 minutes (120,000 milliseconds)
});


// Request interceptor for adding access token to requests
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for refreshing access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosResponseHeaders = error.config;
    const accessToken = getAccessToken();

    if (accessToken && isTokenExpired(accessToken) && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await getNewAccessToken();

      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return originalRequest;
      } else {
        clearTokens();
        return Promise.reject(error);

      }
    }
    return Promise.reject(error);
  }
)


export default axiosInstance;

