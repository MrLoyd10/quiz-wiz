<script setup lang="ts">
import { validateLogin } from "@/zod/validation/authValidation";
import { useAuthManager } from "@/composables/useAuthManager";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const email = ref("");
const password = ref("");

const authManager = useAuthManager();
const router = useRouter();
const circleLoading = ref(false);

const signIn = async () => {
  try {
    // validate
    validateLogin(email.value, password.value);
    // send to backend
    await authManager.login(email.value, password.value, circleLoading);
    router.push("/home");
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="signIn" class="vl-parent">
      <div v-if="circleLoading">
        <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
      </div>

      <div class="mb-4">
        <AtomsEmailForm v-model="email" />
      </div>
      <div class="mb-8">
        <AtomsPasswordForm v-model="password" />
      </div>

      <UButton color="primary" variant="solid" size="lg" block type="submit">
        Sign In
      </UButton>
    </form>
  </div>
</template>
