<script setup lang="ts">
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div>
    <!-- Dark overlay when loading -->
    <div
      v-if="isLoading"
      class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <!-- Loading Spinner -->
      <div
        class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent align-[-0.125em]"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
