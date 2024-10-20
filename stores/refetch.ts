// stores/auth.ts
import { defineStore } from "pinia";

export const useRefetch = defineStore("refetch", {
  state: () => ({
    shouldRefetch: false,
  }),

  actions: {
    setRefetch(value: boolean) {
      this.shouldRefetch = value;
    },
  },
});
