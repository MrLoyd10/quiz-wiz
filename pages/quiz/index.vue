<script setup lang="ts">
import { useRouter } from "vue-router";
import { z } from "zod";

const quizTitle = ref("");
const description = ref("");
const numberOfQuestions = ref(0);

const router = useRouter();
const toast = useToast();

//Zod Schema
const createFormSchema = z.object({
  quizTitle: z.string().min(1, "Quiz title is required"),
  description: z.string().min(1, "Description is required"),
  numberOfQuestions: z
    .number()
    .min(1, "There must be at least 1 question")
    .refine((value) => value !== null, {
      message: "Number of questions is required",
    }),
});

const goToNextStep = () => {
  // Prepare the data object for validation
  const data = {
    quizTitle: quizTitle.value,
    description: description.value,
    numberOfQuestions: numberOfQuestions.value,
  };

  // Validate the form data
  const result = createFormSchema.safeParse(data);

  if (!result.success) {
    // If validation fails, show an alert with the first error message
    const errorDetails = result.error.errors[0];
    const errorMessage = errorDetails.message;
    const errorPath = errorDetails.path.join("-");
    toast.add({
      id: errorPath,
      icon: "i-heroicons-exclamation-circle-20-solid",
      color: "yellow",
      title: "Unable to Create Quiz",
      description: errorMessage,
    });
    return;
  }

  // Store quiz details in a state management solution (e.g., Pinia or Vuex) or pass it as query params
  router.push({
    path: "/quiz/create-questions",
    query: {
      title: quizTitle.value,
      description: description.value,
      numQuestions: numberOfQuestions.value.toString(),
    },
  });
};
</script>

<template>
  <div>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Quiz
        </h2>
        <form @submit.prevent="goToNextStep">
          <div class="mb-4">
            <UFormGroup label="Quiz Title">
              <UInput
                v-model="quizTitle"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>
          </div>

          <div class="mb-4">
            <UFormGroup label="Description">
              <UTextarea
                v-model="description"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>
          </div>

          <div class="mb-4">
            <UFormGroup label="Number of Questions">
              <UInput
                type="number"
                v-model="numberOfQuestions"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>
          </div>

          <UButton
            color="primary"
            type="submit"
            variant="solid"
            size="lg"
            block
          >
            Create Quiz
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
