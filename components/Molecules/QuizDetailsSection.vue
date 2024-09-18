<script setup lang="ts">
import { useQuizManager } from "@/composables/useQuizManager";
import { validateQuizDetails } from "@/zod/validation/quizValidation";

const quizManager = useQuizManager();
const quiz = ref({
  title: "",
  description: "",
  items: 0,
});

const emit = defineEmits(["next"]);

const submitQuiz = () => {
  try {
    // validate quiz details
    validateQuizDetails(quiz.value.title, quiz.value.items);
    // Save Quiz Details
    quizManager.setQuizDetails(quiz.value);

    emit("next"); // Go to next step
  } catch (error) {
    console.error("Quiz details validation failed:", error);
  }
};
</script>

<template>
  <div>
    <div class="p-8 rounded-lg w-full max-w-md">
      <AtomsQuizTitleSection />
      <form @submit.prevent="submitQuiz">
        <div class="mb-4">
          <AtomsInputForm
            v-model="quiz.title"
            label="Title"
            autocomplete="off"
          />
        </div>

        <div class="mb-4">
          <AtomsTextAreaForm
            v-model="quiz.description"
            label="Description"
            autocomplete="off"
          />
        </div>

        <div class="mb-6">
          <AtomsInputNumberForm
            v-model="quiz.items"
            label="Number of questions"
            autocomplete="off"
          />
        </div>

        <div class="flex items-center justify-between">
          <UButton color="primary" variant="solid" type="submit" block
            >Next</UButton
          >
        </div>
      </form>
      <p class="text-sm text-center mt-4">
        <NuxtLink to="/" class="text-i-font-600 hover:text-i-font-900">
          Go back to home
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
