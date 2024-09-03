import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();

  // Paths that do not require authentication
  const publicPaths = ["/login", "/signup", "/"];

  // Check if the user is authenticated based on presence of token and user data
  const hasTokenAndUserData = !!(authStore.token && authStore.user);

  // If the user has token and user data, validate the token
  if (hasTokenAndUserData) {
    try {
      await authStore.checkToken(); // Attempt to validate the token with the server
    } catch (error: any) {
      authStore.logout(); // Invalidate the session if token check fails
      return navigateTo("/login"); // Redirect to login
    }
  }

  // If the user is authenticated, redirect them away from public paths
  if (hasTokenAndUserData && publicPaths.includes(to.path)) {
    return navigateTo("/dashboard");
  }

  // If the user is not authenticated and tries to access a protected route
  if (!hasTokenAndUserData && !publicPaths.includes(to.path)) {
    return navigateTo("/login");
  }
});
