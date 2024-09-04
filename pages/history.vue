<script setup lang="ts">
import { useViewResultStore } from "~/stores/view-result";
import { useTakeQuizStore } from "~/stores/take-quiz";

const takeQuizStore = useTakeQuizStore();
const viewResultStore = useViewResultStore();
const isLoading = ref(true); // Add isLoading variable
const router = useRouter();

//Use composables
const { retake, getRetakeData } = useRetakeData(isLoading);
const { historyData, fetchHistory, currentPage, itemsPerPage, totalItems } =
  useHistoryData(isLoading);

onMounted(() => {
  fetchHistory(currentPage.value);
});

const handlePageChange = () => {
  fetchHistory(currentPage.value);
};

const viewQuizResult = (attemptId: number) => {
  viewResultStore.setAttemptId(attemptId);
  router.push("/attempt-details");
};

const retakeQuiz = async (quizId: number) => {
  await getRetakeData(quizId);
  takeQuizStore.forgetData();
  takeQuizStore.setId(retake.value.id);
  takeQuizStore.setTitle(retake.value.title);
  takeQuizStore.setDescription(retake.value.description);
  takeQuizStore.setNumberQuestions(retake.value.number_questions);
  takeQuizStore.setQuestions(retake.value.questions);
  router.push("/take-quiz");
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

              <!-- Skeleton Loader -->
              <template v-if="isLoading">
                <div
                  v-for="n in 5"
                  :key="n"
                  class="border border-stone-200 p-4 rounded-md animate-pulse"
                >
                  <div class="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div class="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div class="h-10 bg-gray-300 rounded"></div>
                </div>
              </template>

              <!-- Actual History Data -->
              <template v-else>
                <div
                  v-for="history in historyData"
                  :key="history.id"
                  class="border border-stone-200 p-4 rounded-md"
                  :class="{
                    'bg-green-100': history.action === 'Created',
                    'bg-yellow-50': history.action === 'Attempt',
                    'bg-red-100': history.action === 'Deleted',
                  }"
                >
                  <div class="flex justify-between items-center mb-1">
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
                    <p class="text-stone-700 text-sm">
                      {{ history.created_at_formatted }}
                    </p>
                  </div>

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
                    @click="retakeQuiz(history.quiz_id)"
                  >
                    Take Quiz
                  </UButton>
                </div>

                <div class="flex justify-end mt-5">
                  <UPagination
                    size="lg"
                    v-model="currentPage"
                    :page-count="itemsPerPage"
                    :total="totalItems"
                    @click="handlePageChange"
                  />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
