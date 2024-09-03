<script setup lang="ts">
import { z } from "zod";

const props = defineProps({
  numberOfQuestions: {
    type: Number,
    required: true,
  },
});

const toast = useToast();
const currentQuestionIndex = ref(0);
const isLoading = ref(false);

// Define an array to hold the user's questions and options
const questions = ref<
  { question: string; options: string[]; correctOption: number | null }[]
>([{ question: "", options: ["", "", "", ""], correctOption: 0 }]);

// Computed property for the current question
const currentQuestion = computed(
  () => questions.value[currentQuestionIndex.value]
);

// Validate using Zod Schema
const questionSchema = z.object({
  question: z.string().min(1, "Question cannot be empty"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .length(4, "There must be exactly 4 options"),
  correctOption: z
    .number()
    .min(0, "Correct option must be selected")
    .max(3, "Correct option must be within the range of options"),
});

const submitQuestion = () => {};

const goToNextQuestion = () => {
  // Validate current question data
  const validationResult = questionSchema.safeParse(currentQuestion.value);

  if (!validationResult.success) {
    // If validation fails, log the errors and return early
    const errorDetails = validationResult.error.errors[0];
    const errorMessage = errorDetails.message;
    const errorPath = errorDetails.path.join("-");
    toast.add({
      id: errorPath,
      icon: "i-heroicons-exclamation-circle-20-solid",
      color: "yellow",
      title: "There's something wrong",
      description: errorMessage,
    });
    return;
  }

  // Save current question data
  if (currentQuestionIndex.value < questions.value.length) {
    questions.value[currentQuestionIndex.value] = {
      question: currentQuestion.value?.question ?? "",
      options: currentQuestion.value?.options ?? ["", "", "", ""],
      correctOption: currentQuestion.value?.correctOption ?? null,
    };

    // Log the current question data
    console.log("Current Question Data:", {
      question: currentQuestion.value?.question ?? "",
      options: currentQuestion.value?.options ?? ["", "", "", ""],
      correctOption: currentQuestion.value?.correctOption ?? null,
    });

    // Move to the next question
    if (currentQuestionIndex.value < props.numberOfQuestions - 1) {
      currentQuestionIndex.value++;
      questions.value.push({
        question: "",
        options: ["", "", "", ""],
        correctOption: 0,
      });
    } else {
      // If we are at the last question, handle form submission or show completion message
      // Send it to the laravel
      submitQuestion();
    }
  }
};

const goToPreviousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
};
</script>

<template>
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-lg font-bold text-center text-gray-800 mb-6">
      Question {{ currentQuestionIndex + 1 }} of {{ props.numberOfQuestions }}
    </h2>
    <form>
      <div class="mb-4">
        <UFormGroup label="Question">
          <UTextarea
            v-model="currentQuestion.question"
            placeholder="Enter your question here"
            autocomplete="off"
          />
        </UFormGroup>
      </div>

      <div class="mb-4">
        <UFormGroup label="Options [Select the right answer]">
          <div class="flex flex-col space-y-3">
            <div
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              class="flex justify-center items-center space-x-2"
            >
              <input
                type="radio"
                :name="'question-' + currentQuestionIndex"
                :value="index"
                v-model="currentQuestion.correctOption"
                class="mr-2"
              />
              <div class="w-full">
                <UInput
                  v-model="currentQuestion.options[index]"
                  :placeholder="`Option ${index + 1}`"
                  autocomplete="off"
                  block
                />
              </div>
            </div>
          </div>
        </UFormGroup>
      </div>

      <div class="flex space-x-4">
        <div class="w-1/2">
          <UButton
            color="primary"
            variant="ghost"
            size="md"
            block
            :disabled="currentQuestionIndex === 0"
            @click="goToPreviousQuestion"
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
            @click="goToNextQuestion"
          >
            {{
              currentQuestionIndex == props.numberOfQuestions - 1
                ? "Finish"
                : "Next"
            }}
          </UButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
