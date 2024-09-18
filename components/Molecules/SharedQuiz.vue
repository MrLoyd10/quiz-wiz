<script setup lang="ts">
import { useSharedQuizManager } from "@/composables/useSharedQuizManager";
import { useTakeQuizStore } from "~/stores/take-quiz";
import type { SharedQuizDetails } from "@/types/shared-quiz";

const sharedQuizManager = useSharedQuizManager();
const takeQuizStore = useTakeQuizStore();
const router = useRouter();
const isLoading = ref(false);
const sharedQuizDetails = ref<SharedQuizDetails[] | null>(null);

onMounted(async () => {
  const response = await sharedQuizManager.getQuizDetails(isLoading);
  // Error encountered
  if (!response) return;
  // Success
  sharedQuizDetails.value = response.shared_quizzes;
});

const takeQuiz = (quizId: number) => {
  takeQuizStore.forgetData();
  // Save the quiz id
  takeQuizStore.setQuizId(quizId);
  // Redirect to the quiz page
  router.push(`/take-quiz`);
};
</script>

<template>
  <div>
    <div class="flex flex-col space-y-5 px-4 pt-4">
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
      <div v-else class="flex h-28 justify-center items-center">
        <p class="italic text-i-font-500">
          You haven't received any shared quizzes.
        </p>
      </div>
    </div>
  </div>
</template>
