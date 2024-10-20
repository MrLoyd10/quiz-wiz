<script setup lang="ts">
definePageMeta({
  middleware: ["view-all-attempts"],
});

import { useViewAllAttempt } from "@/composables/useViewAllAttempt";
import { useAttemptStore } from "@/stores/attempt";
import { useViewAllAttemptStore } from "@/stores/view-all-attempt";
import type { QuizDetails } from "@/types/quiz";
import type { AttemptDetails } from "@/types/view-all-attempt";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const viewAllAttempt = useViewAllAttempt();
const viewAllAttemptStore = useViewAllAttemptStore();
const attemptStore = useAttemptStore();
const router = useRouter();
const quizDetails = ref<QuizDetails | null>(null);
const attemptDetails = ref<AttemptDetails[] | null>(null);
const deleteAttemptData = ref({
  id: 0,
  openModal: false,
});
const isLoading = ref(true);

const fetchData = async () => {
  const result = await viewAllAttempt.getDetails(
    viewAllAttemptStore.quiz_id,
    isLoading
  );
  // Encountered error
  if (!result) return;
  // Success
  quizDetails.value = result.quiz;
  attemptDetails.value = result.attempts;
};

onMounted(() => {
  fetchData();
});

const refresh = () => {
  fetchData();
};

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
    id: index + 1,
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

const deleteAttempt = (attempt_id: number) => {
  deleteAttemptData.value.id = attempt_id;
  deleteAttemptData.value.openModal = true;
};

const onConfirmDelete = (attempt_id: number) => {
  attemptDetails.value =
    attemptDetails.value?.filter((attempt) => attempt.id !== attempt_id) || [];
  console.log("Delete", attempt_id);
  viewAllAttempt.handleDeleteAttempt(attempt_id);
};

function goBack() {
  viewAllAttemptStore.forgetData();
  attemptStore.forgetData();
}
</script>

<template>
  <div>
    <div class="flex flex-col mb-4 px-4 min-h-screen vl-parent">
      <div v-if="isLoading">
        <loading v-model:active="isLoading" is-full-page :opacity="0.2" />
      </div>

      <div class="mx-auto container">
        <OrganismsAccountHeader />
      </div>

      <div class="flex-grow mx-auto container">
        <div class="mb-3">
          <div class="flex justify-between items-center">
            <h1 class="p-2 font-semibold text-2xl text-pretty">
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
        <div class="flex justify-end mb-3">
          <UButton
            color="blue"
            variant="outline"
            size="2xs"
            icon="i-heroicons-arrow-path"
            @click="refresh"
            >Refresh</UButton
          >
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
            <div class="space-x-2">
              <UButton
                color="green"
                variant="soft"
                size="2xs"
                class="px-2"
                @click="viewAttempt(row.attempt_id)"
                >View</UButton
              >
              <UButton
                color="red"
                variant="soft"
                size="2xs"
                class="px-2"
                @click="deleteAttempt(row.attempt_id)"
                >Delete</UButton
              >
            </div>
          </template>
        </UTable>

        <MoleculesDeleteConfirmation
          v-model="deleteAttemptData.openModal"
          :attempt-id="deleteAttemptData.id"
          @confirmDelete="onConfirmDelete"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
