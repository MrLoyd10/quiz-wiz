// middleware/quizCleanup.ts
import { useTakeQuizStore } from "~/stores/take-quiz";

export default defineNuxtRouteMiddleware((to, from) => {
  const questionsStore = useTakeQuizStore();

  // Check if the current route is NOT under /take-quiz/*
  if (!to.fullPath.startsWith("/take-quiz")) {
    questionsStore.forgetData();
  }
});
