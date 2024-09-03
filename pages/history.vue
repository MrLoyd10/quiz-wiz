<script setup lang="ts">
import axiosInstance from "~/utils/axois";
import { useViewResultStore } from "~/stores/view-result";

interface History {
  id: number;
  user_id: number;
  quiz_id: number;
  attempt_id: number;
  action: "Created" | "Attempt" | "Deleted";
  details: string;
}

const viewResultStore = useViewResultStore();
const historyData = ref<History[]>([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axiosInstance.get("/history");
    historyData.value = response.data;
  } catch (error: any) {
    console.log(
      "Failed to fetch quizzes: " +
        (error.response?.data.message || error.message || "Unknown error")
    );
  }
});

const viewQuizResult = (attemptId: number) => {
  viewResultStore.setAttemptId(attemptId);
  router.push("/attempt-details");
};
</script>

<template>
  <div>
    <div class="bg-gray-100 min-h-screen flex flex-col">
      <DashboardHeader />

      <div class="flex-grow">
        <div class="flex justify-center items-center">
          <div class="w-full max-w-2xl bg-white shadow-lg rounded-md p-6 m-10">
            <div class="my-6 flex flex-col gap-y-4">
              <h1 class="text-2xl text-center font-bold text-stone-900">
                History
              </h1>
              <div
                v-for="history in historyData"
                class="border border-stone-200 p-4 rounded-md"
                :class="{
                  'bg-green-100': history.action === 'Created',
                  'bg-yellow-50': history.action === 'Attempt',
                  'bg-red-100': history.action === 'Deleted',
                }"
              >
                <h1
                  class="text-lg font-semibold"
                  :class="{
                    'text-green-500': history.action === 'Created',
                    'text-yellow-500': history.action === 'Attempt',
                    'text-red-500': history.action === 'Deleted',
                  }"
                >
                  {{ history.action }}
                </h1>
                <p class="text-stone-800 leading-tight tracking-tight">
                  {{ history.details }}
                </p>

                <UButton
                  v-if="history.action === 'Attempt'"
                  color="yellow"
                  variant="outline"
                  size="lg"
                  block
                  class="mt-4"
                  @click="viewQuizResult(history.attempt_id)"
                >
                  View Result
                </UButton>

                <UButton
                  v-if="history.action === 'Created'"
                  color="green"
                  variant="outline"
                  size="lg"
                  block
                  class="mt-4"
                  @click="viewQuizResult(history.attempt_id)"
                >
                  Take Quiz
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
