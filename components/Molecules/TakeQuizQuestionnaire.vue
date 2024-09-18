<script setup lang="ts">
import { useTakeQuizManager } from "@/composables/useTakeQuizManager";
import { useTakeQuizStore } from "@/stores/take-quiz";
import { useAttemptStore } from "@/stores/attempt";
import type { Quiz } from "@/types/quiz";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const takeQuizManager = useTakeQuizManager();
const takeQuizStore = useTakeQuizStore();
const attemptStore = useAttemptStore();
const router = useRouter();
const quizData = ref<Quiz | null>(null);
const circleLoading = ref(false);

onMounted(() => {
  quizData.value = takeQuizStore.quiz_data;
});

const currentQuestion = ref(1);

const shuffledOptions = computed(() => {
  const options = quizData.value?.questions[currentQuestion.value - 1]?.options;
  const shuffled = options ? takeQuizManager.shuffleArray([...options]) : [];
  return shuffled;
});

const selectOption = async (option: number, question_id: number) => {
  takeQuizStore.setAnswerData(option, question_id, currentQuestion.value);

  if (currentQuestion.value < quizData.value!.questions_count) {
    // Not yet complete
    currentQuestion.value += 1;
  } else {
    // Already complete
    const result = await takeQuizManager.submitAttemptAnswer(circleLoading);
    takeQuizStore.forgetData();

    // Incountered error
    if (!result) {
      router.push("/home");
      return;
    }

    // Success
    attemptStore.setAttemptId(result.attempt_id);
    router.push("/attempt-result");
  }
};
</script>

<template>
  <div class="vl-parent">
    <div v-if="circleLoading">
      <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
    </div>

    <h4 class="text-lg text-center text-green-500 mb-4">
      Question {{ currentQuestion }} of {{ quizData?.questions_count }}
    </h4>
    <h1
      class="text-2xl text-center font-semibold mb-6"
      :key="quizData?.questions[currentQuestion - 1].id"
    >
      {{ quizData?.questions[currentQuestion - 1].question }}
    </h1>

    <div class="flex flex-col gap-4 text-i-font-900">
      <UButton
        v-for="option in shuffledOptions"
        :key="option.id"
        color="white"
        variant="solid"
        block
        @click="selectOption(option.id, option.question_id)"
      >
        <div class="flex justify-center items-center py-2 px-1">
          {{ option.option }}
        </div>
      </UButton>
    </div>
  </div>
</template>
