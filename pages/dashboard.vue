<script setup lang="ts">
import axiosInstance from "~/utils/axois";
import { useTakeQuizStore } from "~/stores/take-quiz";

const Store = useTakeQuizStore();

// Define the Quiz interface
interface Quiz {
  id: number;
  title: string;
  description: string;
  number_of_questions: number;
  questions: Question[];
}

interface Question {
  id: number;
  quiz_id: number;
  question: string; // Changed from Text to string
  correct_answer: string;
  options: any[]; // Changed from JSON to any[]
}

// Define a reactive reference for the quizzes array
const quizzes = ref<Quiz[]>([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axiosInstance.get("/quizzes");
    quizzes.value = response.data;
  } catch (error: any) {
    console.log(
      "Failed to fetch quizzes: " +
        (error.response?.data.message || error.message || "Unknown error")
    );
  }
});

const takeQuiz = (quizIndex: number) => {
  Store.forgetData();
  Store.setId(quizzes.value[quizIndex].id);
  Store.setTitle(quizzes.value[quizIndex].title);
  Store.setDescription(quizzes.value[quizIndex].description);
  Store.setNumberQuestions(quizzes.value[quizIndex].number_of_questions);
  Store.setQuestions(quizzes.value[quizIndex].questions);
  router.push({ path: `/take-quiz` });
};
</script>

<template>
  <div>
    <div class="bg-gray-100 min-h-screen flex flex-col">
      <DashboardHeader />

      <div class="flex-grow">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full p-6 md:p-10"
        >
          <!-- Loop through quizzes and display each one -->
          <div
            v-for="(quiz, index) in quizzes"
            :key="quiz.id"
            class="bg-white shadow-lg rounded-lg p-6"
          >
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              {{ quiz.title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ quiz.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500"
                >{{ quiz.number_of_questions }} Questions</span
              >
              <div class="space-x-3">
                <UButton color="primary" variant="ghost" size="lg"
                  >Edit</UButton
                >
                <UButton
                  color="primary"
                  variant="solid"
                  size="lg"
                  @click="takeQuiz(index)"
                  >Take Quiz</UButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
