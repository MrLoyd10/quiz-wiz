import { useTakeQuizStore } from "@/stores/take-quiz";

export default defineNuxtRouteMiddleware(() => {
  const takeQuizStore = useTakeQuizStore();

  if (!takeQuizStore.quiz_id) {
    return navigateTo("/home");
  }
});
