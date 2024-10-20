<script setup lang="ts">
import { useSharedQuizManager } from "@/composables/useSharedQuizManager";
import { useTakeQuizManager } from "@/composables/useTakeQuizManager";
import { useAttemptStore } from "@/stores/attempt";
import type { SharedQuizDetails } from "@/types/shared-quiz";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { useTakeQuizStore } from "~/stores/take-quiz";

const sharedQuizManager = useSharedQuizManager();
const takeQuizManager = useTakeQuizManager();
const takeQuizStore = useTakeQuizStore();
const attemptStore = useAttemptStore();
const router = useRouter();
const isLoading = ref(false);
const circleLoading = ref(false);
const sharedQuizDetails = ref<SharedQuizDetails[] | null>(null);

const fetchData = async (isInitialFetch = false) => {
  const response = await sharedQuizManager.getQuizDetails(
    isInitialFetch ? isLoading : undefined
  );

  // Error encountered
  if (!response) return;
  // Success
  sharedQuizDetails.value = response.shared_quizzes;
};

let intervalId: ReturnType<typeof setInterval> | undefined;

onMounted(async () => {
  // Initial fetch
  fetchData(true);

  // Set an interval to refetch every 10 seconds
  intervalId = setInterval(() => {
    fetchData();
  }, 5000); // 5 seconds
});

// Clean up the interval when the component is unmounted
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

const takeQuiz = async (quizId: number) => {
  const res = await takeQuizManager.checkIfAlreadyAttempted(
    circleLoading,
    quizId
  );
  if (res.canAttempt) {
    takeQuizStore.forgetData();
    // Save the quiz id
    takeQuizStore.setQuizId(quizId);
    // Redirect to the quiz page
    router.push(`/take-quiz`);
  } else {
    attemptStore.forgetData();
    attemptStore.setAttemptId(res.attempt_id);
    router.push("/attempt-result");
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col space-y-5 px-4 pt-4 vl-parent">
      <div v-if="circleLoading">
        <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
      </div>

      <!-- Skeleton Loading -->
      <div v-if="isLoading" v-for="i in 5" :key="i">
        <SkeletonQuizCard />
      </div>
      <!-- Success -->
      <div
        v-else-if="sharedQuizDetails && sharedQuizDetails.length > 0"
        v-for="(quiz, index) in sharedQuizDetails"
        :key="index"
      >
        <MoleculesSharedQuizCard
          :title="quiz.quiz.title"
          :description="quiz.quiz.description"
          :number_of_items="quiz.quiz.questions_count"
          :quiz_id="quiz.quiz.id"
          :shared_by="quiz.shared_by_user"
          @click="takeQuiz(quiz.quiz.id)"
        />
      </div>
      <div v-else class="flex justify-center items-center h-28">
        <p class="text-i-font-500 italic">
          You haven't received any shared quizzes.
        </p>
      </div>
    </div>
  </div>
</template>
