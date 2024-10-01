<script setup lang="ts">
import { useViewMyAttempt } from "@/composables/useViewMyAttempt";
import { useAttemptStore } from "@/stores/attempt";
import type { MyAttempt } from "@/types/my-attempts";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const viewMyAttempt = useViewMyAttempt();
const attemptStore = useAttemptStore();
const router = useRouter();
const myAttemptsDetails = ref<MyAttempt[] | null>(null);
const isLoading = ref(true);
const isClient = ref(false); // To fix dehydration error

onMounted(async () => {
  isClient.value = true;
  const result = await viewMyAttempt.getDetails(isLoading);
  // Encountered error
  if (!result) return;
  // Success
  myAttemptsDetails.value = result.my_attempts;
});

const columns = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "quiz_title",
    label: "Quiz Title",
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
  if (!myAttemptsDetails.value) return [];

  return myAttemptsDetails.value.map((attempt, index) => ({
    attempt_id: attempt.id,
    id: index + 1,
    quiz_title: attempt.quiz.title,
    date_time: new Date(attempt.created_at).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Toggle between 12-hour (true) and 24-hour (false)
    }),
    score: attempt.score,
    out_of: attempt.quiz.questions_count,
  }));
});

const viewAttempt = (attempt_id: number) => {
  attemptStore.forgetData();
  attemptStore.setAttemptId(attempt_id);
  router.push("/attempt-result");
};

function goBack() {
  attemptStore.forgetData();
}
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col px-4 mb-4 vl-parent">
      <div v-if="isClient">
        <loading v-model:active="isLoading" is-full-page :opacity="0.2" />
      </div>

      <div class="container mx-auto">
        <OrganismsAccountHeader />
      </div>

      <div class="flex-grow container mx-auto">
        <div class="mb-6">
          <div class="flex justify-between items-center">
            <h1 class="p-2 text-2xl font-semibold text-pretty">My Attempts</h1>
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
