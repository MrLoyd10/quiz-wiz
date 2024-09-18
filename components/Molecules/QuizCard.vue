<script setup lang="ts">
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
      <AtomsQuizDropDown
        @hover="isDropdownHovered = true"
        @leave="isDropdownHovered = false"
        :quiz_id="props.quiz_id"
      />
    </div>
    <div v-if="props.description" class="flex space-x-2 items-stretch">
      <div class="w-px bg-primary-400"></div>
      <p class="text-i-font-700 line-clamp-3">
        {{ props.description }}
      </p>
    </div>

    <p>{{ props.number_of_items }} Questions</p>
  </div>
</template>
