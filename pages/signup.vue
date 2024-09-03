<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

// Define reactive variables for form data
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const isLoading = ref(false);
const toast = useToast(); // Toast
const authStore = useAuthStore();

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  if (password.value !== confirmPassword.value) {
    toast.add({
      id: "Password not match",
      icon: "i-heroicons-x-circle-20-solid",
      color: "yellow",
      title: "There's something wrong!",
      description: "Passwords do not match",
    });
    return;
  }

  isLoading.value = true;

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    });
    toast.add({
      icon: "i-heroicons-check-circle-20-solid",
      color: "green",
      title: "Success",
      description: "Registration successful!",
    });
    await nextTick();
    navigateTo("/dashboard");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Registration failed. Please try again.";
    toast.add({
      id: error.response?.data?.message,
      icon: "i-heroicons-x-circle-20-solid",
      color: "yellow",
      title: "There's something wrong!",
      description: errorMessage,
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <LoadingSpinner :is-loading="isLoading" />
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div class="flex justify-center items-center">
          <img
            src="/assets/pictures/QuizWiz.png"
            alt="QuizWiz Logo"
            class="h-16 w-auto"
          />
        </div>
        <form @submit="handleSubmit" class="mt-6">
          <UFormGroup label="Name" class="mb-4">
            <UInput v-model="name" placeholder="Name" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Email" class="mb-4">
            <UInput v-model="email" placeholder="Email" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Password">
            <UInput
              v-model="password"
              type="password"
              placeholder="Password"
              class="mb-4"
            />
          </UFormGroup>
          <UFormGroup label="Confirm Password">
            <UInput
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              class="mb-6"
            />
          </UFormGroup>
          <div>
            <UButton
              color="primary"
              variant="solid"
              size="lg"
              block
              type="submit"
            >
              Sign up
            </UButton>
          </div>
        </form>
        <div class="mt-4 text-sm flex justify-center items-center">
          <p class="text-gray-600">Already have an account?</p>
          <UButton color="primary" variant="link">Sign in</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
