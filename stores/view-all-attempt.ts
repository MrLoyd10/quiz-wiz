export const useViewAllAttemptStore = defineStore("view-all-attempt", {
  state: () => ({
    quiz_id: 0,
  }),

  actions: {
    setQuizId(quiz_id: number) {
      this.quiz_id = quiz_id;
    },

    forgetData() {
      this.quiz_id = 0;
    },
  },
});
