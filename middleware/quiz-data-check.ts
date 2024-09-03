// middleware/quizDataCheck.ts
import { useTakeQuizStore } from "~/stores/take-quiz";
import { useRouter } from "vue-router";

export default defineNuxtRouteMiddleware((to, from) => {
  const questionsStore = useTakeQuizStore();
  const { id, title, description, totalQuestions, questions } = questionsStore;

  // Check if any of the essential quiz data is empty or undefined
  if (
    !id ||
    !title ||
    !description ||
    !totalQuestions ||
    !questions ||
    questions.length === 0
  ) {
    // Redirect to the dashboard if the quiz data is incomplete
    return navigateTo("/dashboard");
  }
});
