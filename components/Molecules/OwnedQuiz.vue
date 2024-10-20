<script setup lang="ts">
import { useQuizManager } from "@/composables/useQuizManager";
import { useRefetch } from "@/stores/refetch";
import type { QuizDetails } from "@/types/quiz";
import { useTakeQuizStore } from "~/stores/take-quiz";

const quizManager = useQuizManager();
const takeQuizStore = useTakeQuizStore();
const router = useRouter();
const isLoading = ref(false);
const quizDetails = ref<QuizDetails[] | null>(null);
const refetch = useRefetch();

const fetchData = async () => {
  const response = await quizManager.getQuizDetails(isLoading);
  if (response) {
    quizDetails.value = response.quizzes;
  }
};

onMounted(() => {
  fetchData();
});

watch(refetch, (newValue) => {
  if (newValue) {
    fetchData();

    refetch.setRefetch(false);
  }
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
        v-else-if="quizDetails && quizDetails.length > 0"
        v-for="(quiz, index) in quizDetails"
        :key="index"
      >
        <MoleculesQuizCard
          :title="quiz.title"
          :description="quiz.description"
          :number_of_items="quiz.questions_count"
          :quiz_id="quiz.id"
          @click="takeQuiz(quiz.id)"
        />
      </div>
      <div v-else class="flex justify-center items-center h-28">
        <p class="text-i-font-500 italic">No quizzes have been added yet.</p>
      </div>
    </div>
  </div>
</template>
