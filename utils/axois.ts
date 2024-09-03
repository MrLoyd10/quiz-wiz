import axios from "axios";
import type { AxiosInstance } from "axios";
import { useAuthStore } from "~/stores/auth";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your API base URL
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
