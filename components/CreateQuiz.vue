<script setup lang="ts">
import { z } from "zod";

const toast = useToast();
// Create Form
const quizTitle = ref("");
const description = ref("");
const numberOfQuestions = ref(0);
const isCreateFormSubmit = ref(false);

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

const handleQuizFormSubmit = (data: {
  quizTitle: string;
  description: string;
  numberOfQuestions: number;
}) => {
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
    quizTitle.value = "";
    description.value = "";
    numberOfQuestions.value = 0;
  } else {
    // If validation succeeds, update the reactive values
    quizTitle.value = data.quizTitle;
    description.value = data.description;
    numberOfQuestions.value = data.numberOfQuestions;
    isCreateFormSubmit.value = true;
  }
};
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <CreateQuizForm
      v-if="!isCreateFormSubmit"
      @submit-quiz-form="handleQuizFormSubmit"
    />

    <CreateQuizQuestion v-if="isCreateFormSubmit" :number-of-questions="1" />
  </div>
</template>

<style scoped></style>
