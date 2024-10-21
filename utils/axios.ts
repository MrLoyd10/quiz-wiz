import type { AxiosInstance } from "axios";
import axios from "axios";
import { useAuthStore } from "~/stores/auth";

const apiBaseUrl: string =
  (process.env.API_BASE_URL || "http://127.0.0.1:8000") + "/api";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
