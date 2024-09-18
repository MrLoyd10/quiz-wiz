import type { Quiz } from "@/types/quiz";

type AnswerData = {
  question_id: number;
  option_id: number;
};

export const useTakeQuizStore = defineStore("take-quiz", {
  state: () => ({
    quiz_id: 0,
    quiz_data: null as Quiz | null,
    answer_data: [] as AnswerData[],
  }),

  actions: {
    setQuizId(quiz_id: number) {
      this.quiz_id = quiz_id;
    },
    setQuizData(quiz_data: Quiz) {
      this.quiz_data = quiz_data;
    },
    setAnswerData(
      option: number,
      question_id: number,
      current_question: number
    ) {
      if (this.answer_data[current_question - 1]) {
        this.answer_data[current_question - 1] = {
          question_id: question_id,
          option_id: option,
        };
      } else {
        this.answer_data.push({
          question_id: question_id,
          option_id: option,
        });
      }
    },

    forgetData() {
      this.quiz_id = 0;
      this.quiz_data = null;
      this.answer_data = [];
    },
  },
});
