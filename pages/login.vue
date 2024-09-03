<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";

const email = ref("");
const password = ref("");

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const login = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    toast.add({
      icon: "i-heroicons-check-circle-20-solid",
      color: "green",
      title: "Success",
      description: "Login successful!",
    });
    router.push("/dashboard");
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      "Login failed, please check your credentials.";
    toast.add({
      id: error.response?.data?.message || 1,
      icon: "i-heroicons-x-circle-20-solid",
      color: "yellow",
      title: "There's something wrong!",
      description: errorMessage,
    });
  }
};
</script>

<template>
  <div>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div class="flex justify-center items-center">
          <img
            src="/assets/pictures/QuizWiz.png"
            alt="QuizWiz Logo"
            class="h-16 w-auto"
          />
        </div>
        <form class="mt-6" @submit.prevent="login">
          <UFormGroup label="Email" class="mb-4">
            <UInput v-model="email" placeholder="Email" autocomplete="off" />
          </UFormGroup>
          <UFormGroup label="Password">
            <UInput
              v-model="password"
              type="password"
              placeholder="Password"
              class="mb-6"
            />
          </UFormGroup>
          <div>
            <UButton
              type="submit"
              color="primary"
              variant="solid"
              size="lg"
              block
              >Sign in</UButton
            >
          </div>
        </form>
        <div class="mt-4 text-sm flex justify-center items-center">
          <p class="text-gray-600">Don't have an account?</p>
          <UButton
            color="primary"
            variant="link"
            @click="() => router.push('/signup')"
            >Sign up</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
