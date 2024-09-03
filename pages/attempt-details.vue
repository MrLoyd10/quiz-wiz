<script setup lang="ts">
import axiosInstance from "~/utils/axois";
import { useViewResultStore } from "~/stores/view-result";
import { useTakeQuizStore } from "#imports";

// Store Data
const viewResultStore = useViewResultStore();
const takeQuizStore = useTakeQuizStore();
const router = useRouter();

interface AttemptPreview {
  quiz_id: number;
  id: number;
  title: string;
  description: string;
  total_score: number;
  number_of_questions: number;
  questions: Question[];
  attempt_data: AttemptData[];
}

interface Question {
  id: number;
  quiz_id: number;
  question: string; // Changed from Text to string
  correct_answer: string;
  options: any[]; // Changed from JSON to any[]
}

interface AttemptData {
  isCorrect: boolean;
  index: number;
  selectedIndex: number;
  correctAnswerIndex: number;
  questionShuffled: string[];
}

const attemptPreview = ref<AttemptPreview | null>(null);

onMounted(async () => {
  try {
    const response = await axiosInstance.post("/view-attempt", {
      attempt_id: viewResultStore.attempt_id,
    });
    attemptPreview.value = response.data;
  } catch (error: any) {
    console.log("Error fetching quiz result:", error.message);
  }
  console.log(attemptPreview.value);
});

function retakeQuiz() {
  if (!attemptPreview.value) {
    console.log("No attempt data available");
    return;
  }

  console.log("Quiz ID:", attemptPreview.value.id); // Logging the quiz ID
  console.log("Title:", attemptPreview.value.title); // Logging the title
  console.log("Description:", attemptPreview.value.description); // Logging the description
  console.log("Number of Questions:", attemptPreview.value.questions.length); // Logging the number of questions
  console.log("Questions:", attemptPreview.value.questions);

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
    <div class="bg-white p-8 rounded-lg shadow-lg w-full m-10">
      <div v-if="attemptPreview" class="mb-10">
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
