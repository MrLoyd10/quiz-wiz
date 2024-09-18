<script setup lang="ts">
// Make a middleware to dont allow to access this page if the quiz id from vial-all-attempt store is empty

import { useViewAllAttempt } from "@/composables/useViewAllAttempt";
import { useViewAllAttemptStore } from "@/stores/view-all-attempt";
import { useAttemptStore } from "@/stores/attempt";
import type { QuizDetails } from "@/types/quiz";
import type { AttemptDetails } from "@/types/view-all-attempt";

const viewAllAttempt = useViewAllAttempt();
const viewAllAttemptStore = useViewAllAttemptStore();
const attemptStore = useAttemptStore();
const router = useRouter();
const quizDetails = ref<QuizDetails | null>(null);
const attemptDetails = ref<AttemptDetails[] | null>(null);
const isLoading = ref(true);

onMounted(async () => {
  const result = await viewAllAttempt.getDetails(
    viewAllAttemptStore.quiz_id,
    isLoading
  );
  // Encountered error
  if (!result) return;
  // Success
  quizDetails.value = result.quiz;
  attemptDetails.value = result.attempts;
});

const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "date_time",
    label: "Date & Time",
    sortable: true,
  },
  {
    key: "score",
    label: "Score",
    sortable: true,
    direction: "desc" as const,
  },
  {
    key: "out_of",
    label: "Out of",
  },
  {
    key: "action",
  },
];

const people = computed(() => {
  if (!attemptDetails.value || !quizDetails.value) return [];

  return attemptDetails.value.map((attempt, index) => ({
    attempt_id: attempt.id,
    id: index,
    name: `${attempt.user.last_name}, ${attempt.user.first_name}`,
    date_time: new Date(attempt.created_at).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Toggle between 12-hour (true) and 24-hour (false)
    }),
    score: attempt.score,
    out_of: quizDetails.value?.questions_count,
  }));
});

const viewAttempt = (attempt_id: number) => {
  attemptStore.forgetData();
  attemptStore.setAttemptId(attempt_id);
  router.push("/attempt-result");
};

function goBack() {
  viewAllAttemptStore.forgetData();
  attemptStore.forgetData();
}
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col">
      <div class="container mx-auto">
        <OrganismsAccountHeader />
      </div>

      <div class="flex-grow container mx-auto">
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <h1 class="p-2 text-2xl font-semibold text-pretty">
              {{ quizDetails?.title }}
            </h1>
            <NuxtLink to="/home">
              <UButton
                color="black"
                variant="link"
                icon="i-heroicons-arrow-left-20-solid"
                @click="goBack"
                >Go back</UButton
              >
            </NuxtLink>
          </div>
          <hr />
        </div>

        <UTable
          :columns="columns"
          :rows="people"
          :empty-state="{
            icon: 'i-heroicons-circle-stack-20-solid',
            label: 'No Attempts.',
          }"
        >
          <template #action-data="{ row }">
            <UButton
              color="green"
              variant="soft"
              size="2xs"
              class="px-2"
              @click="viewAttempt(row.attempt_id)"
              >View</UButton
            >
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
