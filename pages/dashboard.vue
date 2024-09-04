<script setup lang="ts">
import axiosInstance from "~/utils/axois";
import { useTakeQuizStore } from "~/stores/take-quiz";
import { ref, onMounted } from "vue";

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
  question: string;
  correct_answer: string;
  options: any[];
}

// Define a reactive reference for the quizzes array
const quizzes = ref<Quiz[]>([]);
const isLoading = ref(true); // Add a loading state
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
  } finally {
    isLoading.value = false; // Set loading to false once data is fetched
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
          <!-- Show skeleton loaders while loading -->
          <template v-if="isLoading">
            <div
              v-for="n in 6"
              :key="n"
              class="bg-white shadow-lg rounded-lg p-6 animate-pulse"
            >
              <div class="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div class="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
              <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </template>

          <!-- Loop through quizzes and display each one -->
          <template v-else>
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
                <span class="text-sm text-gray-500">
                  {{ quiz.number_of_questions }} Questions
                </span>
                <div class="space-x-3">
                  <UButton color="primary" variant="ghost" size="lg">
                    Edit
                  </UButton>
                  <UButton
                    color="primary"
                    variant="solid"
                    size="lg"
                    @click="takeQuiz(index)"
                  >
                    Take Quiz
                  </UButton>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
