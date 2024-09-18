import { useAuthStore } from "@/stores/auth";
import { useAuthManager } from "@/composables/useAuthManager";
import { useHomeStore } from "@/stores/home";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const authManager = useAuthManager();
  const homeStore = useHomeStore();

  const publicPaths = ["/login", "/register", "/"];

  const isAuthenticated = await authManager.checkUser();

  // If the user is authenticated, redirect them away from public paths
  if (isAuthenticated && publicPaths.includes(to.path)) {
    return navigateTo("/home");
  }

  // If the user is not authenticated and tries to access a protected route
  if (!isAuthenticated && !publicPaths.includes(to.path)) {
    authStore.forgetUser();
    homeStore.forgetTab();
    return navigateTo("/login");
  }
});
