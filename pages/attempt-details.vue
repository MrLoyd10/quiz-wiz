<script setup lang="ts">
import { useViewResultStore } from "~/stores/view-result";
import { useTakeQuizStore } from "~/stores/take-quiz";

// Store Data
const viewResultStore = useViewResultStore();
const takeQuizStore = useTakeQuizStore();
const router = useRouter();

const { attemptPreview, isLoading, error, fetchAttemptPreview } =
  useAttemptPreview(viewResultStore.attempt_id);

onMounted(() => {
  fetchAttemptPreview();
});

function retakeQuiz() {
  if (!attemptPreview.value) {
    console.log("No attempt data available");
    return;
  }

  takeQuizStore.forgetData();
  takeQuizStore.setId(attemptPreview.value.quiz_id);
  takeQuizStore.setTitle(attemptPreview.value.title);
  takeQuizStore.setDescription(attemptPreview.value.description);
  takeQuizStore.setNumberQuestions(attemptPreview.value.number_of_questions);
  takeQuizStore.setQuestions(attemptPreview.value.questions);
  router.push({ path: `/take-quiz` });
}
</script>

<template>
  <div class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white container p-8 rounded-lg shadow-lg w-full m-10">
      <!-- Skeleton loaders -->
      <div v-if="isLoading" class="animate-pulse">
        <div class="flex justify-center items-center mb-10">
          <div class="h-16 w-16 bg-gray-300 rounded-full"></div>
        </div>
        <p class="h-4 bg-gray-300 rounded w-1/3 mx-auto mb-4"></p>
        <h1 class="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2"></h1>
        <p class="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></p>

        <div v-for="n in 5" :key="n" class="mb-6">
          <h2 class="h-4 bg-gray-300 rounded w-3/4 mb-2"></h2>
          <ul class="space-y-2">
            <li class="h-4 bg-gray-300 rounded w-full"></li>
            <li class="h-4 bg-gray-300 rounded w-full"></li>
            <li class="h-4 bg-gray-300 rounded w-full"></li>
            <li class="h-4 bg-gray-300 rounded w-full"></li>
          </ul>
        </div>

        <div class="flex space-x-5 mt-10">
          <div class="h-10 bg-gray-300 rounded w-full"></div>
          <div class="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>

      <div v-if="attemptPreview && !isLoading" class="mb-10">
        <div class="flex justify-center items-center mb-10">
          <img
            src="/assets/pictures/QuizWiz.png"
            alt="QuizWiz Logo"
            class="h-16 w-auto"
          />
        </div>
        <p class="text-green-500 mb-4 text-center">Quiz Preview</p>
        <h1 class="text-2xl font-bold text-stone-900 text-center mb-2">
          {{ attemptPreview.title }}
        </h1>
        <p class="text-sky-500 font-semibold mb-4 text-center">
          Score: {{ attemptPreview.total_score }} /
          {{ attemptPreview.number_of_questions }}
        </p>
      </div>

      <div v-if="attemptPreview">
        <div
          v-for="(data, summaryIndex) in attemptPreview.attempt_data"
          :key="summaryIndex"
          class="mb-6 px-2"
        >
          <h2 class="font-semibold text-stone-800 mb-2">
            {{ summaryIndex + 1 }}.
            {{ attemptPreview.questions[summaryIndex].question }}
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

        <div class="flex space-x-5 mt-10">
          <NuxtLink to="/history" class="w-1/2">
            <UButton color="primary" variant="ghost" size="lg" block
              >Go back</UButton
            >
          </NuxtLink>
          <div class="w-1/2" @click="retakeQuiz">
            <UButton color="primary" variant="solid" size="lg" block
              >Retake</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
