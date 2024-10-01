<script setup lang="ts">
import { useAuthManager } from "@/composables/useAuthManager";
import { useAuthStore } from "@/stores/auth";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const authManager = useAuthManager();
const authStore = useAuthStore();
const router = useRouter();
const circleLoading = ref(false);

async function logOut() {
  try {
    // Logout to backend and localStorage
    await authManager.logout(circleLoading);
    router.push("/");
  } catch (error) {
    console.error("Logout failed", error);
  }
}
</script>

<template>
  <div>
    <div class="flex items-center space-x-2 vl-parent">
      <div v-if="circleLoading">
        <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
      </div>

      <div
        class="flex items-center space-x-2 font-semibold bg-primary-100 text-primary-600 px-4 py-1 rounded-lg"
      >
        <UIcon name="i-heroicons-user" class="w-5 h-5" />
        <span>{{ authStore.first_name }} {{ authStore.last_name }}</span>
      </div>
      <UButton color="primary" variant="link" size="sm" @click="logOut"
        >Log out</UButton
      >
    </div>
  </div>
</template>
