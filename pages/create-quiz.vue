<script setup lang="ts">
const QuizDetailsDone = ref(false);
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col">
      <div class="container mx-auto">
        <OrganismsAuthHeader />

        <div
          class="flex-grow flex justify-center items-center space-x-20 my-8 mx-2 lg:m-0"
        >
          <div
            class="w-full md:w-1/2 flex justify-center md:justify-end items-center"
          >
            <MoleculesQuizDetailsSection
              v-if="!QuizDetailsDone"
              @next="QuizDetailsDone = true"
            />

            <MoleculesQuizQuestionsForm v-else />
          </div>
          <div class="hidden w-1/2 md:flex justify-start items-center">
            <img
              src="/create-quiz-illustration.svg"
              width="500"
              alt="Crete Quiz Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
