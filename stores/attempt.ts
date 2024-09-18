export const useAttemptStore = defineStore("attempt", {
  state: () => ({
    attempt_id: 0,
  }),

  actions: {
    setAttemptId(attempt_id: number) {
      this.attempt_id = attempt_id;
    },

    forgetData() {
      this.attempt_id = 0;
    },
  },
});
