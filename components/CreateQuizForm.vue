<!-- 
  HOW TO USE:
  <QuizForm @submit-quiz-form="handleQuizFormSubmit" />
-->

<script setup lang="ts">
const quizTitle = ref("");
const description = ref("");
const numberOfQuestions = ref(0);

const emit = defineEmits(["submit-quiz-form"]);

const handleSubmit = (event: Event) => {
  event.preventDefault(); // Prevent form from actually submitting and refreshing the page
  emit("submit-quiz-form", {
    quizTitle: quizTitle.value,
    description: description.value,
    numberOfQuestions: numberOfQuestions.value,
  });
};
</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
      Create Quiz
    </h2>
    <form @submit="handleSubmit">
      <div class="mb-4">
        <UFormGroup label="Quiz Title">
          <UInput v-model="quizTitle" autocomplete="off" />
        </UFormGroup>
      </div>

      <div class="mb-4">
        <UFormGroup label="Description">
          <UTextarea v-model="description" autocomplete="off" />
        </UFormGroup>
      </div>

      <div class="mb-4">
        <UFormGroup label="Number of Questions">
          <UInput
            type="number"
            v-model="numberOfQuestions"
            autocomplete="off"
          />
        </UFormGroup>
      </div>

      <UButton color="primary" type="submit" variant="solid" size="lg" block>
        Create Quiz
      </UButton>
    </form>
  </div>
</template>

<style scoped></style>
