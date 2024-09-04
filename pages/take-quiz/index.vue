<script setup lang="ts">
definePageMeta({ middleware: "quiz-data-check" });

import { useTakeQuizStore } from "~/stores/take-quiz";
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "~/utils/axois";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

// Store Data
const router = useRouter();
const questionsStore = useTakeQuizStore();
const { title, description, id, totalQuestions, questions } = questionsStore;

const isLoading = ref(true);
const isQuizStarted = computed(() => questionsStore.isQuizStarted);
const questionsIndex = ref(0);
const currentCorrectAnswerIndex = ref(-1);
const currentOptions = ref<string[]>([]);
const records = ref(
  Array.from({ length: totalQuestions }, () => ({
    index: -1,
    isCorrect: false,
    questionShuffled: [] as string[],
    selectedIndex: -1,
    correctAnswerIndex: -1,
  }))
);
const totalScore = computed(() =>
  records.value.reduce((acc, q) => acc + (q.isCorrect ? 1 : 0), 0)
);

// Initialize Data and Options
onMounted(async () => {
  try {
    await nextTick();
    ({
      options: currentOptions.value,
      correctAnswerIndex: currentCorrectAnswerIndex.value,
    } = shuffleOptions(questions[questionsIndex.value]));
  } catch (error) {
    console.error("Error initializing quiz:", error);
  } finally {
    isLoading.value = false;
  }
});

// Prevent Page Unload
onMounted(() => window.addEventListener("beforeunload", handleBeforeUnload));
onBeforeUnmount(() =>
  window.removeEventListener("beforeunload", handleBeforeUnload)
);
function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue =
    "You have an unfinished quiz. Are you sure you want to leave?";
}

// Shuffle Options
function shuffleOptions(question: any) {
  const options = [...question.options, question.correct_answer];
  let correctAnswerIndex = options.length - 1;
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
    if (i === correctAnswerIndex) correctAnswerIndex = j;
    else if (j === correctAnswerIndex) correctAnswerIndex = i;
  }
  return { options, correctAnswerIndex };
}

// Handle Answer Selection
async function selectOption(selectedOption: string, selectedIndex: number) {
  const currentQuestion = questions[questionsIndex.value];
  const isCorrect = selectedOption === currentQuestion.correct_answer;

  records.value[questionsIndex.value] = {
    isCorrect,
    index: questionsIndex.value,
    selectedIndex,
    questionShuffled: currentOptions.value,
    correctAnswerIndex: currentCorrectAnswerIndex.value,
  };

  if (questionsIndex.value < totalQuestions - 1) {
    questionsIndex.value += 1;
    await nextTick();
    ({
      options: currentOptions.value,
      correctAnswerIndex: currentCorrectAnswerIndex.value,
    } = shuffleOptions(questions[questionsIndex.value]));
  } else {
    window.removeEventListener("beforeunload", handleBeforeUnload);
    questionsStore.setSummary(records.value);
    questionsStore.setTotalScore(totalScore.value);
    isLoading.value = true; // Show loader during submission
    await sendQuizAttemptData();
    isLoading.value = false; // Hide loader once submission is complete
    router.push("/take-quiz/summary");
  }
}

// Send Quiz Data to API
async function sendQuizAttemptData() {
  try {
    await axiosInstance.post("/quiz/attempt", {
      quiz_id: id,
      total_score: totalScore.value,
      attempt_data: records.value,
    });
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
  }
}
</script>

<template>
  <div
    class="bg-gray-100 flex items-center justify-center min-h-screen vl-parent"
  >
    <div v-if="isLoading">
      <loading
        v-model:active="isLoading"
        is-full-page
        background-color="#f3f4f6"
      />
    </div>
    <div
      class="bg-white p-8 rounded-lg shadow-lg w-full m-10"
      :class="isQuizStarted ? 'max-w-3xl' : 'max-w-md'"
    >
      <!-- Logo -->
      <div class="flex justify-center items-center mb-6">
        <img
          src="/assets/pictures/QuizWiz.png"
          alt="QuizWiz Logo"
          class="h-16 w-auto"
        />
      </div>

      <!-- Start Quiz Section -->
      <div v-if="!isQuizStarted" class="mx-2">
        <p class="text-green-500 mb-4 text-sm">Ready to take the quiz?</p>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ title }}</h1>
        <p class="text-gray-600 mb-1 text-sm">{{ description }}</p>
        <p class="text-gray-600 mb-4 text-sm">{{ totalQuestions }} Questions</p>
        <UButton
          color="primary"
          block
          @click="questionsStore.setIsQuizStarted(true)"
        >
          Start
        </UButton>
      </div>

      <!-- Question Cards Section -->
      <div v-else>
        <h4 class="text-lg text-center text-stone-600 mb-4">
          Question {{ questionsIndex + 1 }} of {{ totalQuestions }}
        </h4>
        <h1 class="text-2xl text-stone-900 text-center font-bold mb-6">
          {{ questions[questionsIndex].question }}
        </h1>

        <div class="flex flex-col gap-4 text-stone-900">
          <UButton
            v-for="(option, index) in currentOptions"
            :key="index"
            color="white"
            variant="solid"
            block
            @click="selectOption(option, index)"
          >
            <div class="flex justify-center items-center py-2 px-1">
              {{ option }}
            </div>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
