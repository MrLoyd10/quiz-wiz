<script setup lang="ts">
import { useQuizStore } from "~/stores/quiz";
import { useQuizManager } from "@/composables/useQuizManager";
import { validateQuestion } from "@/zod/validation/quizValidation";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const quizStore = useQuizStore();
const quizManager = useQuizManager();
const router = useRouter();
const circleLoading = ref(false);

const { question, options, currentItem } = quizManager;

quizManager.watchCurrentItem();

const nextOrFinish = async () => {
  // validate question
  const isValidated = validateQuestion(question, options);

  // If validation fails, Stop
  if (!isValidated) return;

  // Add question to store
  quizManager.setQuestion(options, question);

  // Send it to the backend
  if (currentItem.value + 1 >= quizStore.items) {
    await quizManager.submitQuiz(circleLoading);
    router.push("/home");
  }
};

const prevQuestion = () => {
  if (currentItem.value > 0) {
    quizStore.current_item--;
  }
};
</script>

<template>
  <div class="p-8 rounded-lg w-full max-w-lg vl-parent">
    <div v-if="circleLoading">
      <loading v-model:active="circleLoading" is-full-page :opacity="0.2" />
    </div>

    <AtomsQuizQuestionsSection />
    <form @submit.prevent="nextOrFinish">
      <div class="mb-4">
        <AtomsTextAreaForm
          v-model="question"
          label="Question"
          autocomplete="off"
        />
      </div>

      <div v-for="(option, i) in options" :key="i" class="mb-4">
        <AtomsTextAreaForm
          v-model="options[i]"
          :label="i === 0 ? 'Correct Answer' : `Option ${i}`"
          autocomplete="off"
        />
      </div>

      <div class="flex flex-col space-y-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
          block
          @click="nextOrFinish"
          >{{
            currentItem + 1 === quizStore.items ? "Finish" : "Next"
          }}</UButton
        >

        <UButton color="primary" variant="ghost" block @click="prevQuestion">
          Previous
        </UButton>
      </div>
    </form>
  </div>
</template>
