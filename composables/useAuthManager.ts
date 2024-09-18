import axiosInstance from "@/utils/axios";
import { useAuthStore } from "@/stores/auth";
import { useHomeStore } from "@/stores/home";

export function useAuthManager() {
  const toast = useToast();
  const authStore = useAuthStore();
  const homeStore = useHomeStore();

  const login = async (
    email: string,
    password: string,
    isLoading: Ref<boolean>
  ) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/api/login", {
        email: email,
        password: password,
      });

      authStore.setUser({
        id: response.data.user.id,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        email: response.data.user.email,
        token: response.data.token,
      });

      toast.add({
        id: "register-success",
        description: "Login successful.",
        color: "green",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || "Login failed.";

        toast.add({
          id: "login-error",
          title: "Login Failed",
          description: errorMessage,
          color: "red",
        });
      }
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (
    data: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    isLoading: Ref<boolean>
  ) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/api/register", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });

      authStore.setUser({
        id: response.data.user.id,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        email: response.data.user.email,
        token: response.data.token,
      });

      toast.add({
        id: "register-success",
        description: "Registration successful.",
        color: "green",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "Registration failed.";

        toast.add({
          id: "register-error",
          title: "Registration Failed",
          description: errorMessage,
          color: "red",
        });
      }
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async (isLoading: Ref<boolean>) => {
    try {
      isLoading.value = true;
      const response = await axiosInstance.post("/api/logout", {});

      authStore.forgetUser();
      homeStore.forgetTab();

      toast.add({
        id: "logout-success",
        description: "Logout successful.",
        color: "green",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Logout failed.";

        toast.add({
          id: "logout-error",
          title: "Logout Failed",
          description: errorMessage,
          color: "red",
        });
      }
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const checkUser = async () => {
    if (authStore.token) {
      try {
        await axiosInstance.get("/api/check-user");
        return true; // return true if user is authenticated
      } catch (error) {
        return false; // return false if authentication fails
      }
    }
    return false; // return false if no token
  };

  return { login, register, logout, checkUser };
}
