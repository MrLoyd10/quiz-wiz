<script setup lang="ts">
const props = defineProps({
  isOwnedTab: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["change-tab"]);
</script>

<template>
  <div>
    <div class="flex space-x-5 px-4 pt-4">
      <div
        class="cursor-pointer hover:text-i-font-600 pb-4 px-2"
        :class="
          props.isOwnedTab
            ? 'font-semibold border-b-2 border-primary-400'
            : 'font-medium'
        "
        @click="$emit('change-tab', true)"
      >
        Owned
      </div>
      <div
        class="cursor-pointer hover:text-i-font-600 pb-4 px-2"
        :class="
          !props.isOwnedTab
            ? 'font-semibold border-b-2 border-primary-400'
            : 'font-medium'
        "
        @click="$emit('change-tab', false)"
      >
        Shared Quiz
      </div>
    </div>
  </div>
</template>
