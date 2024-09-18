import { useAttemptStore } from "@/stores/attempt";

export default defineNuxtRouteMiddleware(() => {
  const attemptStore = useAttemptStore();

  if (!attemptStore.attempt_id) {
    return navigateTo("/home");
  }
});
