// src/api/axiosInstance.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, refreshAccessToken } from "@/utils/token";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.mvpz.io/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // 20s timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔒 Request Interceptor — attach token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response Interceptor — handle errors, auto refresh, etc.
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Token expired → try refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/login";
      }
    }

    // Handle other errors globally
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosInstance;
