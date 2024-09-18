<script setup lang="ts">
definePageMeta({
  // Dont allow to access this page if the quiz_id from the takingQuizStore is empty.
  // Meaning the user is not taking a quiz
  middleware: ["taking-quiz"],
});

const startQuiz = ref(false);
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col">
      <div class="container mx-auto">
        <OrganismsAuthHeader />
      </div>
      <div class="flex-grow container mx-auto py-8 lg:py-20">
        <MoleculesTakeQuizIntroSection
          v-if="!startQuiz"
          @start="startQuiz = true"
        />

        <div
          v-else
          class="flex justify-center items-center px-4 max-w-4xl mx-auto"
        >
          <MoleculesTakeQuizQuestionnaire />
        </div>
      </div>
    </div>
  </div>
</template>
