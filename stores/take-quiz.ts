import { defineStore } from "pinia";

interface Question {
  id: number;
  quiz_id: number;
  question: string;
  correct_answer: string;
  options: any[];
}

interface Summary {
  index: number;
  isCorrect: boolean;
  questionShuffled: string[];
  selectedIndex: number;
  correctAnswerIndex: number;
}

export const useTakeQuizStore = defineStore("take-quiz", {
  state: () => ({
    id: -1,
    title: "",
    description: "",
    totalQuestions: 0,
    questions: [] as Question[],
    summary: [] as Summary[],
    totalScore: 0,

    //Taking Quiz
    isQuizStarted: false,
  }),
  actions: {
    setQuestions(questions: Question[]) {
      this.questions = questions;
    },
    setId(id: number) {
      this.id = id;
    },
    setTitle(title: string) {
      this.title = title;
    },
    setDescription(description: string) {
      this.description = description;
    },
    setNumberQuestions(numberOfQuestions: number) {
      this.totalQuestions = numberOfQuestions;
    },
    setSummary(scoreData: Summary[]) {
      this.summary = scoreData;
    },
    setTotalScore(totalScore: number) {
      this.totalScore = totalScore;
    },
    setIsQuizStarted(isStarted: boolean) {
      this.isQuizStarted = isStarted;
    },
    forgetData() {
      this.questions = [];
      this.id = -1;
      this.title = "";
      this.description = "";
      this.totalQuestions = 0;
      this.totalScore = 0;
      this.summary = [];
      this.isQuizStarted = false;
    },
  },
  persist: true, // Enable persistence
});
