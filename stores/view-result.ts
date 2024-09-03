// stores/auth.ts
import { defineStore } from "pinia";

export const useViewResultStore = defineStore("view-result", {
  state: () => ({
    attempt_id: -1,
  }),
  actions: {
    setAttemptId(atteptId: number) {
      this.attempt_id = atteptId;
    },

    forgetData() {
      this.attempt_id = -1;
    },
  },
});
