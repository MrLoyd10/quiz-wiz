<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axiosInstance from "~/utils/axois";

const router = useRouter();
const route = useRoute();
const toast = useToast();

// Retrieve the number of questions from the route query parameters
const numberOfQuestions = parseInt(route.query.numQuestions as string) || 1;

// Initialize the questions array with empty values
const questions = ref(
  Array.from({ length: numberOfQuestions }, () => ({
    question: "",
    correct_answer: "", // Change "correctAnswer" to "correct_answer" to match the backend
    options: ["", "", ""], // Initialize with three empty options
  }))
);

const currentQuestionIndex = ref(0);

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};

const nextOrFinish = () => {
  if (currentQuestionIndex.value < numberOfQuestions - 1) {
    currentQuestionIndex.value++;
  } else {
    handleSubmit();
  }
};

const handleSubmit = async () => {
  try {
    // Create a quiz with the gathered questions data
    const quizData = {
      title: route.query.title as string, // Assuming these are provided in the URL
      description: route.query.description as string,
      number_of_questions: numberOfQuestions, // Using the parsed numberOfQuestions
      questions: questions.value,
    };

    // Send the quiz data to the backend
    await axiosInstance.post("/quizzes", quizData);

    toast.add({
      icon: "i-heroicons-check-circle-20-solid",
      color: "green",
      title: "Success",
      description: "Quiz successfully Created!",
    });

    router.replace("/dashboard");
  } catch (error: any) {
    const errorMessage =
      "Failed to submit quiz questions: " +
      (error.response?.data.message || error.message || "Unknown error");
    toast.add({
      id: error.response?.data?.message || 1,
      icon: "i-heroicons-x-circle-20-solid",
      color: "yellow",
      title: "There's something wrong!",
      description: errorMessage,
    });
  }
};
</script>

<template>
  <div>
    <div class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-lg font-bold text-center text-gray-800 mb-6">
          Question {{ currentQuestionIndex + 1 }} of {{ numberOfQuestions }}
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <UFormGroup label="Question">
              <UTextarea
                v-model="questions[currentQuestionIndex].question"
                placeholder="Enter your question here"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>
          </div>

          <div class="mb-4 space-y-2">
            <UFormGroup label="Correct Answer">
              <UTextarea
                v-model="questions[currentQuestionIndex].correct_answer"
                color="green"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>

            <UFormGroup label="Option 1">
              <UTextarea
                v-model="questions[currentQuestionIndex].options[0]"
                color="red"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>

            <UFormGroup label="Option 2">
              <UTextarea
                v-model="questions[currentQuestionIndex].options[1]"
                color="red"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>

            <UFormGroup label="Option 3">
              <UTextarea
                v-model="questions[currentQuestionIndex].options[2]"
                color="red"
                autocomplete="off"
                spellcheck="false"
              />
            </UFormGroup>
          </div>

          <div class="flex space-x-4">
            <div class="w-1/2">
              <UButton
                color="primary"
                variant="ghost"
                size="md"
                block
                @click="prevQuestion"
                :disabled="currentQuestionIndex === 0"
              >
                Previous
              </UButton>
            </div>
            <div class="w-1/2">
              <UButton
                color="primary"
                variant="solid"
                size="md"
                block
                @click="nextOrFinish"
              >
                {{
                  currentQuestionIndex === numberOfQuestions - 1
                    ? "Finish"
                    : "Next"
                }}
              </UButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
