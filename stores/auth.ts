// stores/auth.ts
import { defineStore } from "pinia";
import axiosInstance from "~/utils/axois";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // State
    const user = ref(null);
    const token = ref<string | null>(null);

    // Action
    const login = async (credentials: { email: string; password: string }) => {
      try {
        const response = await axiosInstance.post("/login", credentials);
        token.value = response.data.token;
        user.value = response.data.user;
      } catch (error) {
        throw error;
      }
    };

    const register = async (data: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    }) => {
      try {
        const response = await axiosInstance.post("/signup", data);
        // Store the user data
        user.value = response.data.user;
        // Store the Token
        token.value = response.data.token;
        return response;
      } catch (error) {
        throw error;
      }
    };

    const checkToken = async () => {
      if (!token.value) {
        throw new Error("No token available");
      }

      try {
        const response = await axiosInstance.get("/check-user", {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        // Optionally update user data if the response includes it
        user.value = response.data.user || user.value;
        return response;
      } catch (error) {
        logout();
        throw error;
      }
    };

    const logout = () => {
      user.value = null;
      token.value = null;
    };

    return { user, token, register, login, logout, checkToken };
  },
  { persist: true }
);
