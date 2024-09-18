<script setup lang="ts">
import { useTakeQuizStore } from "@/stores/take-quiz";
import { useTakeQuizManager } from "@/composables/useTakeQuizManager";
import type { Quiz } from "@/types/quiz";

const takeQuizManager = useTakeQuizManager();
const takeQuizStore = useTakeQuizStore();
const router = useRouter();
const isLoading = ref(true);
const quizData = ref<Quiz | null>(null);
const emit = defineEmits(["start"]);

onMounted(async () => {
  // Get the quiz questions
  const isSuccess = await takeQuizManager.getQuizQuestions(isLoading);
  // Error
  if (!isSuccess) return;
  // Success
  quizData.value = isSuccess.quiz;
});

function startQuiz() {
  if (quizData.value) {
    takeQuizStore.setQuizData(quizData.value); // Only set if quizData is not null
    emit("start");
  } else {
    console.error("Quiz data is null, cannot start quiz.");
  }
}

function goBack() {
  takeQuizStore.forgetData();
  router.push("/home");
}
</script>

<template>
  <div>
    <SkeletonTakeQuizIntroSection v-if="isLoading" />
    <div v-else class="flex justify-center items-center p-8 max-w-4xl mx-auto">
      <!-- Left: Illustration -->
      <div class="hidden md:block flex-1">
        <img
          src="/take-quiz-illustration.svg"
          alt="Illustration"
          class="w-3/4 mx-auto"
        />
      </div>

      <!-- Right: Text content -->
      <div class="flex-1 text-center sm:text-left">
        <p class="text-green-500 mb-2">Ready to take the quiz?</p>
        <h2
          class="text-3xl font-semibold"
          :class="quizData?.description ? 'mb-4' : 'mb-6'"
        >
          {{ quizData?.title }}
        </h2>
        <p v-if="quizData?.description" class="text-i-font-600 mb-6">
          {{ quizData?.description }}
        </p>

        <div class="space-x-6">
          <UButton
            color="primary"
            size="lg"
            variant="solid"
            class="px-8"
            @click="startQuiz"
            >Take Quiz</UButton
          >
          <UButton color="primary" variant="link" @click="goBack"
            >Go back</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
