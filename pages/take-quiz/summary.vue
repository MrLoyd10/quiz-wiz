<script setup lang="ts">
definePageMeta({ middleware: "quiz-data-check" });

import { useTakeQuizStore } from "~/stores/take-quiz";
import { ref } from "vue";

// Store Data
const questionsStore = useTakeQuizStore();
const { title, totalQuestions, totalScore, questions } = questionsStore;
const summary = ref(questionsStore.summary);

function resetData() {
  questionsStore.forgetData();
}
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full m-10">
      <div class="mb-10">
        <div class="flex justify-center items-center mb-10">
          <img
            src="/assets/pictures/QuizWiz.png"
            alt="QuizWiz Logo"
            class="h-16 w-auto"
          />
        </div>
        <p class="text-green-500 mb-4 text-center">Quiz Summary</p>
        <h1 class="text-2xl font-bold text-stone-900 text-center mb-2">
          {{ title }}
        </h1>
        <p class="text-sky-500 font-semibold mb-4 text-center">
          Score: {{ totalScore }} / {{ totalQuestions }}
        </p>
      </div>

      <div>
        <div v-for="(data, summaryIndex) in summary" class="mb-6 px-2">
          <h2 class="font-semibold text-stone-800 mb-2">
            {{ summaryIndex + 1 }}. {{ questions[summaryIndex].question }}
            {{ data.isCorrect ? "✅" : "❌" }}
          </h2>
          <ol>
            <li
              v-for="(option, index) in data.questionShuffled"
              :key="option"
              class="ml-3"
              :class="{
                'text-green-500':
                  (index === data.selectedIndex && data.isCorrect) ||
                  index === data.correctAnswerIndex,
                'text-red-500': index === data.selectedIndex && !data.isCorrect,
              }"
            >
              {{ String.fromCharCode(97 + index) }}. {{ option }}
            </li>
          </ol>
        </div>

        <NuxtLink to="/dashboard">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
            block
            @click="resetData"
            >Go back to Dashboard</UButton
          >
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
