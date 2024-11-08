<script setup lang="ts">
import { useAuthManager } from "@/composables/useAuthManager";
import { validateRegistration } from "@/zod/validation/authValidation";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const name = ref({
  first: "",
  last: "",
});
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const authManager = useAuthManager();
const router = useRouter();
const circleLoading = ref(false);
const toast = useToast();

const register = async () => {
  // ready the data
  const registrationData = {
    first_name: name.value.first,
    last_name: name.value.last,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  try {
    // validate registration
    validateRegistration(registrationData);
    // send to backend
    await authManager.register(registrationData, circleLoading);
    router.push("/home");
  } catch (error: any) {
    toast.add({
      id: "register-error",
      title: "Registration Failed",
      description: error.message || "Hmm. Something went wrong.",
      color: "red",
    });
  }
};
</script>

<template>
  <div>
    <form @submit.prevent="register" class="vl-parent">
      <div v-if="circleLoading">
        <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
      </div>
      <div class="flex space-x-2 mb-4">
        <AtomsInputForm v-model="name.first" label="First Name" />
        <AtomsInputForm v-model="name.last" label="Last Name" />
      </div>
      <div class="mb-4">
        <AtomsEmailForm v-model="email" />
      </div>
      <div class="mb-4">
        <AtomsPasswordForm v-model="password" />
      </div>
      <div class="mb-8">
        <AtomsPasswordForm v-model="confirmPassword" />
      </div>

      <UButton color="primary" variant="solid" size="lg" block type="submit">
        Register
      </UButton>
    </form>
  </div>
</template>
