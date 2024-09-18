// stores/auth.ts
import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
  state: () => ({
    isOwnedTab: true,
  }),

  actions: {
    setTab(change: boolean) {
      this.isOwnedTab = change;
    },

    forgetTab() {
      this.isOwnedTab = true;
    },
  },

  persist: true,
});
