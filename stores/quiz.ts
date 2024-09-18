// This is for creating a quiz
import { defineStore } from "pinia";

interface QuizOption {
  option: string;
  is_correct: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const useQuizStore = defineStore("quiz", {
  state: () => ({
    title: "",
    description: "",
    items: 0,
    current_item: 0,
    questions: [] as QuizQuestion[],
  }),

  actions: {
    setQuizDetails(title: string, description: string, items: number) {
      this.title = title;
      this.description = description;
      this.items = items;
    },

    setQuestion(question: string, options: QuizOption[]) {
      // Update if its exist
      if (this.questions[this.current_item]) {
        this.questions[this.current_item].question = question;
        this.questions[this.current_item].options = options;
      } else {
        // Insert new
        this.questions.push({
          question,
          options,
        });
      }

      // Secure increment
      if (this.current_item + 1 < this.items) {
        this.current_item += 1;
      }
    },

    forgetQuizData() {
      this.title = "";
      this.description = "";
      this.items = 0;
      this.current_item = 0;
      this.questions = [];
    },
  },
});
