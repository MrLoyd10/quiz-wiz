<script setup>
import { ref } from "vue";

const { usersList, loading, nextPageUrl, loadMoreUsers, searchUsers } =
  useShareWith();

const query = ref("");
const shareWith = ref([]);
const isSearchFocused = ref(false);
let debounceTimeout = null;
const emit = defineEmits(["update-share-with"]);

// Send the updated shareWith array to the parent
watch(shareWith, (newValue) => {
  emit("update-share-with", newValue);
});

watch(query, (newQuery) => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    await searchUsers(newQuery);
  }, 300); // Adjust the debounce delay as needed
});

function searchFocus() {
  isSearchFocused.value = true;
}

function searchAway() {
  isSearchFocused.value = false;
}

function removeUser(index) {
  shareWith.value.splice(index, 1);
}

function addUser(user) {
  const userIndex = shareWith.value.findIndex(
    (sharedUser) => sharedUser.id === user.id
  );

  if (userIndex !== -1) {
    shareWith.value.splice(userIndex, 1);
  } else {
    shareWith.value.push(user);
  }

  // Force reactivity
  shareWith.value = [...shareWith.value]; // Re-assign to trigger reactivity
  query.value = "";
}

function isSelected(user) {
  return shareWith.value.some((sharedUser) => sharedUser.id === user.id);
}
</script>

<template>
  <div
    class="w-full p-2 rounded"
    :class="
      isSearchFocused ? 'border-blue-400 border-2' : 'border border-gray-300'
    "
  >
    <div
      class="max-h-20 overflow-y-auto flex flex-wrap items-center gap-1.5 fading-container bg-gradient-to-b from-white to-gray-50"
    >
      <!-- User list container -->
      <div
        v-if="shareWith.length > 0"
        v-for="(user, index) in shareWith"
        :key="index"
        class="flex items-center bg-gray-100 pl-2 pr-4 py-1 rounded-full text-sm"
      >
        <div
          class="w-5 h-5 text-center font-bold text-stone-800 bg-blue-200 rounded-full mr-1.5"
        >
          {{ user.email.charAt(0).toUpperCase() }}
        </div>
        <!-- Email text -->
        <span>{{ user.email }}</span>
        <!-- Remove user -->
        <button
          @click="removeUser(index)"
          class="ml-2 text-red-500 hover:text-red-700"
        >
          &times;
        </button>
      </div>
    </div>
    <div v-if="shareWith.length > 0" class="mb-1"></div>

    <!-- Input for new emails -->
    <div class="w-full relative">
      <UInput
        v-model="query"
        variant="none"
        placeholder="Search..."
        class="w-full"
        @focus="searchFocus"
        @blur="searchAway"
      />

      <!-- Skeleton loaders -->
      <div v-if="loading" class="absolute w-full">
        <div
          class="w-full max-h-52 overflow-y-auto mt-4 mb-10 bg-white shadow-md border rounded-b-md"
        >
          <!-- Skeleton Loader for each user -->
          <div
            v-for="n in 3"
            :key="n"
            class="p-4 flex justify-between items-center"
          >
            <div class="flex items-center">
              <USkeleton class="w-10 h-10 rounded-full mr-2" />
              <div class="flex flex-col">
                <USkeleton class="w-24 h-4 mb-1" />
                <USkeleton class="w-32 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No results -->
      <div
        v-if="usersList.length === 0 && isSearchFocused && !loading && query"
        class="absolute w-full"
      >
        <div
          class="w-full h-28 mt-4 mb-10 bg-white shadow-md border rounded-b-md"
        >
          <div
            class="p-4 text-sm font-light text-gray-400 flex justify-center items-center h-full"
          >
            No results found
          </div>
        </div>
      </div>

      <!-- Actual Search Results -->
      <div
        v-if="usersList.length > 0 && isSearchFocused && !loading"
        class="absolute w-full"
      >
        <div
          class="w-full max-h-52 overflow-y-auto mt-4 mb-10 bg-white shadow-md border rounded-b-md"
        >
          <div
            v-for="user in usersList"
            :key="user.id"
            class="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            @mousedown.prevent=""
            @click="addUser(user)"
          >
            <div class="flex items-center">
              <div
                class="w-10 h-10 flex justify-center items-center font-bold text-stone-800 bg-blue-200 rounded-full mr-2"
              >
                {{ user.email.charAt(0).toUpperCase() }}
              </div>
              <div class="flex flex-col overflow-hidden">
                <span class="text-base font-medium">{{ user.name }}</span>
                <span class="text-sm">{{ user.email }}</span>
              </div>
            </div>

            <!-- Display checkmark if user is already selected -->
            <div v-if="isSelected(user)" class="text-green-500 font-bold">
              ✔
            </div>
          </div>
          <div v-if="nextPageUrl" class="flex justify-center">
            <UButton
              color="blue"
              variant="ghost"
              block
              class="py-2"
              @mousedown.prevent=""
              @click="loadMoreUsers()"
            >
              See more</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
