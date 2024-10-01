import { useViewAllAttemptStore } from "@/stores/view-all-attempt";

export default defineNuxtRouteMiddleware(() => {
  const viewAllAttemptStore = useViewAllAttemptStore();

  if (!viewAllAttemptStore.quiz_id) {
    return navigateTo("/home");
  }
});
