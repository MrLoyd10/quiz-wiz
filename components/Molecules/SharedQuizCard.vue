<script setup lang="ts">
import type { User } from "@/types/shared-quiz";

const props = defineProps({
  quiz_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  number_of_items: {
    type: Number,
    required: true,
  },
  shared_by: {
    type: Object as PropType<User>,
    required: true,
  },
});

const isDropdownHovered = ref(false);
</script>

<template>
  <div
    class="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md cursor-pointer w-full"
    :class="!isDropdownHovered ? 'hover:bg-slate-50' : ''"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold line-clamp-2">
        {{ props.title }}
      </h2>
    </div>
    <div v-if="props.description" class="flex space-x-2 items-stretch">
      <div class="w-px bg-primary-400"></div>
      <p class="text-i-font-700 line-clamp-3">
        {{ props.description }}
      </p>
    </div>

    <div class="flex justify-between items-center">
      <p>{{ props.number_of_items }} Questions</p>
      <div class="max-w-80">
        <p class="text-sm truncate">
          From: {{ props.shared_by.first_name }}
          {{ props.shared_by.last_name }}
        </p>
      </div>
    </div>
  </div>
</template>
