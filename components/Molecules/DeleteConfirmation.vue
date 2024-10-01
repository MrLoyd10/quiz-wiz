<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  attemptId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "confirmDelete"]);
const cancelDelete = () => {
  emit("update:modelValue", false);
};
const confirmDelete = () => {
  console.log("Delete", props.attemptId);
  emit("confirmDelete", props.attemptId);
  emit("update:modelValue", false);
};
</script>

<template>
  <div>
    <UModal v-model="props.modelValue">
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-2">Confirm Deletion</h3>
        <p class="mb-6">Are you sure you want to delete this attempt data?</p>
        <div class="flex justify-end space-x-4">
          <UButton color="red" @click="confirmDelete">Confirm</UButton>
          <UButton color="gray" @click="cancelDelete">Cancel</UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
