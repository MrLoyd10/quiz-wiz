<script setup lang="ts">
import axiosInstance from "~/utils/axois";
import { useTakeQuizStore } from "~/stores/take-quiz";
import { ref, onMounted } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const Store = useTakeQuizStore();

// Define the Quiz interface

const isLoading = ref(true);
const circleLoading = ref(false);
const router = useRouter();
const shareWith = ref([]);

// Composables
const {
  quizzes,
  isSharedModalOpen,
  selectedQuizIdStore,
  fetchQuizzes,
  items,
  shareQuiz,
} = useDashboardHelpers(circleLoading, isLoading);

onMounted(fetchQuizzes);

const takeQuiz = (quizIndex: number) => {
  Store.forgetData();
  Store.setId(quizzes.value[quizIndex].id);
  Store.setTitle(quizzes.value[quizIndex].title);
  Store.setDescription(quizzes.value[quizIndex].description);
  Store.setNumberQuestions(quizzes.value[quizIndex].number_of_questions);
  Store.setQuestions(quizzes.value[quizIndex].questions);
  router.push({ path: "/take-quiz" });
};

// Updated items function to include refresh after deletion

function updateShareWith(updatedShareWith: any) {
  shareWith.value = updatedShareWith;
}

function hanldeShareQuiz() {
  shareQuiz(selectedQuizIdStore.value, shareWith.value);
  isSharedModalOpen.value = false;
}
</script>

<template>
  <div>
    <div class="bg-gray-100 min-h-screen flex flex-col vl-parent">
      <!-- Circle loader -->
      <div v-if="circleLoading">
        <loading
          v-model:active="circleLoading"
          is-full-page
          background-color="#f3f4f6"
        />
      </div>

      <!-- Header -->
      <DashboardHeader />

      <!-- Shared Modal -->
      <MoleculesShareModal
        v-model="isSharedModalOpen"
        :shareWith="shareWith"
        @update-share-with="updateShareWith"
        @share="hanldeShareQuiz"
      />

      <div class="flex-grow">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 w-full p-6 md:p-10"
        >
          <!-- Show skeleton loaders while loading -->
          <template v-if="isLoading">
            <div
              v-for="n in 6"
              :key="n"
              class="bg-white shadow-lg rounded-lg p-6 animate-pulse"
            >
              <div class="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div class="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
              <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </template>

          <!-- Main content -->
          <template v-else>
            <div v-for="(quiz, index) in quizzes" :key="quiz.id">
              <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col">
                <div class="flex justify-between items-center">
                  <h3
                    class="text-xl font-semibold text-gray-800 mb-2 text-pretty line-clamp-2"
                    :title="quiz.title"
                  >
                    {{ quiz.title }}
                  </h3>
                  <div>
                    <UDropdown
                      :items="items(quiz.id)"
                      :popper="{ placement: 'bottom-start' }"
                    >
                      <UIcon
                        name="i-heroicons-ellipsis-vertical"
                        class="w-6 h-6"
                      />
                    </UDropdown>
                  </div>
                </div>

                <p
                  class="text-gray-600 mb-4 text-pretty line-clamp-2"
                  :title="quiz.description"
                >
                  {{ quiz.description }}
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">
                    {{ quiz.number_of_questions }} Questions
                  </span>
                  <div class="space-x-3">
                    <UButton color="primary" variant="ghost" size="lg">
                      Edit
                    </UButton>
                    <UButton
                      color="primary"
                      variant="solid"
                      size="lg"
                      @click="takeQuiz(index)"
                    >
                      Take Quiz
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
