<script setup lang="ts">
import { useQuizStore } from "~/stores/quiz";

const quizStore = useQuizStore();
const items = ref(quizStore.items);
const currentItem = ref(quizStore.current_item);
watch(
  () => quizStore.current_item,
  (newVal) => {
    currentItem.value = newVal;
  }
);
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold mb-2 text-i-font-950">
      Create Your Quiz
    </h2>
    <h3 class="text-base font-medium text-i-font-600 mb-8">
      Lets fill out the all the questions.
      <br />
      Question {{ currentItem + 1 }} of {{ items }}.
    </h3>
  </div>
</template>
