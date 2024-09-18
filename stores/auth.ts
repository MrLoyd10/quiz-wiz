// stores/auth.ts
import { defineStore } from "pinia";
import axiosInstance from "@/utils/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    token: null as string | null,
  }),

  actions: {
    setUser(data: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      token: string;
    }) {
      this.id = data.id;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.email = data.email;
      this.token = data.token;
    },

    forgetUser() {
      this.id = 0;
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.token = null;
    },
  },

  persist: true,
});
