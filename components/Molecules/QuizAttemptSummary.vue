<script setup lang="ts">
import { useAttemptManager } from "@/composables/useAttemptManager";
import { useAttemptStore } from "@/stores/attempt";
import type { AttemptDetails } from "@/types/attempt";

const attemptManager = useAttemptManager();
const attemptStore = useAttemptStore();
const isLoading = ref(true);
const attemptDetails = ref<AttemptDetails | null>(null);

onMounted(async () => {
  const result = await attemptManager.getAttemptDetails(isLoading);
  // Encountered error
  if (!result) return;
  attemptDetails.value = result.attempt;
});

function backToHome() {
  attemptStore.forgetData();
}
</script>

<template>
  <div>
    <div class="max-w-7xl mx-auto p-6">
      <SkeletonQuizAttemptSummary v-if="isLoading" />
      <div v-else>
        <div class="mb-10">
          <p class="text-green-500 mb-4 text-center">Quiz Summary</p>
          <h1 class="text-2xl font-bold text-i-font-900 text-center mb-2">
            {{ attemptDetails?.quiz_title }}
          </h1>
          <h2
            v-if="attemptDetails?.quiz_description"
            class="text-lg font-medium text-i-font-800 text-center mb-4"
          >
            {{ attemptDetails?.quiz_description }}
          </h2>
          <p class="text-sky-500 font-semibold mb-4 text-center">
            Score: {{ attemptDetails?.score }} /
            {{ attemptDetails?.questions_count }}
          </p>
        </div>

        <div>
          <div
            v-for="(question, index) in attemptDetails?.questions"
            class="mb-6 px-2"
          >
            <h2 class="font-semibold text-i-font-800 mb-2">
              {{ index + 1 }}. {{ question.question }}
              <span
                v-if="
                  question.options.some(
                    (option) => option.is_selected && option.user_is_correct
                  )
                "
                >✅</span
              >
              <span v-else>❌</span>
            </h2>
            <ol>
              <li
                v-for="(option, index) in question.options"
                :key="option.id"
                class="ml-3"
                :class="{
                  'text-green-500':
                    option.is_selected && option.user_is_correct,
                  'text-red-500': option.is_selected && !option.user_is_correct,
                }"
              >
                {{ String.fromCharCode(97 + index) }}. {{ option.option }}
              </li>
            </ol>
          </div>

          <NuxtLink to="/home">
            <UButton
              color="primary"
              variant="solid"
              size="lg"
              block
              @click="backToHome"
              >Go back to home</UButton
            >
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
