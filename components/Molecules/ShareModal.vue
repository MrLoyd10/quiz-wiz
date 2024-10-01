<script setup lang="ts">
import { useSharedQuizManager } from "@/composables/useSharedQuizManager";

const props = defineProps({
  modelValue: Boolean, // This controls the visibility of the modal
  shareWith: Array, // The array of users to share with
  quizId: Number,
});

// Define the type for the 'person' object
interface Person {
  id: number; // This is shared quiz Id
  shared_with_user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

const sharedQuizManager = useSharedQuizManager();
const alreadyShared = ref({
  persons: [] as Person[],
  isNull: true,
});

const emit = defineEmits(["update-share-with", "share", "update:modelValue"]);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value), // For v-model to work
});

function emitUpdateShareWith(updatedShareWith: any) {
  emit("update-share-with", updatedShareWith);
}

function emitShareQuiz() {
  emit("share");
}

watch(isModalOpen, async (value) => {
  if (props.quizId && value) {
    const data = await sharedQuizManager.getPersonAlreadyShared(props.quizId);
    if (data.persons.length > 0) {
      alreadyShared.value.persons = data.persons;
      alreadyShared.value.isNull = false;
    }
  }
  if (!value) {
    alreadyShared.value.persons = [];
    alreadyShared.value.isNull = true;
  }
});

const unShare = async (sharedId: number, index: number) => {
  const res = await sharedQuizManager.unshare(sharedId);
  if (res) {
    alreadyShared.value.persons.splice(index, 1);
  }
  if (alreadyShared.value.persons.length === 0) {
    alreadyShared.value.isNull = true;
  }
};
</script>

<template>
  <div>
    <UModal v-model="isModalOpen" prevent-close>
      <div class="p-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-lg font-semibold text-stone-900">Share with:</h2>
          <UButton
            color="red"
            variant="ghost"
            :padded="false"
            @click="isModalOpen = false"
            ><UIcon name="i-ic-round-close" class="w-5 h-5" />
          </UButton>
        </div>
        <AtomsMultipleSelectInput @update-share-with="emitUpdateShareWith" />

        <!-- Display the already shared users -->
        <div v-if="!alreadyShared.isNull" class="mt-4 text-sm font-medium">
          <h3 class="mb-1">Already Shared with:</h3>
          <div class="max-h-32 overflow-y-auto border p-2 space-y-2">
            <div
              v-for="(person, index) in alreadyShared.persons"
              :key="index"
              class="p-2 hover:bg-gray-100 flex justify-between items-center gap-2"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 flex justify-center items-center font-bold text-stone-800 bg-blue-200 rounded-full mr-2"
                >
                  {{ person.shared_with_user.email.charAt(0).toUpperCase() }}
                </div>
                <div class="flex flex-col overflow-hidden">
                  <span class="text-base font-medium"
                    >{{ person.shared_with_user.first_name }}
                    {{ person.shared_with_user.last_name }}</span
                  >
                  <span class="text-sm">{{
                    person.shared_with_user.email
                  }}</span>
                </div>
              </div>
              <button
                @click="unShare(person.id, index)"
                class="ml-2 text-xs text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <UButton
            color="primary"
            variant="solid"
            size="sm"
            class="px-10"
            @click="emitShareQuiz"
          >
            Share
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
