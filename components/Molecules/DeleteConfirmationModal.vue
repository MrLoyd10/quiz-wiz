<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean, // Controls the visibility of the modal
});

const emit = defineEmits(["confirm", "cancel", "update:modelValue"]);

const isModalOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value), // For v-model to work
});

function confirmDelete() {
  emit("confirm"); // Emit confirm event to parent
}

function cancelDelete() {
  emit("cancel"); // Emit cancel event to parent
}
</script>

<template>
  <div>
    <UModal v-model="isModalOpen" prevent-close>
      <div class="px-4 py-6">
        <div class="flex justify-between items-center mb-3">
          <h2 class="font-semibold text-lg text-stone-900">
            Delete Confirmation
          </h2>
          <UButton
            color="red"
            variant="ghost"
            :padded="false"
            @click="cancelDelete"
          >
            <UIcon name="i-ic-round-close" class="w-5 h-5" />
          </UButton>
        </div>

        <p>
          Are you sure you want to delete this quiz? This action cannot be
          undone.
        </p>

        <div class="flex justify-end space-x-2 mt-4">
          <UButton
            color="gray"
            variant="solid"
            size="sm"
            class="px-6"
            @click="cancelDelete"
          >
            Cancel
          </UButton>
          <UButton
            color="red"
            variant="solid"
            size="sm"
            class="px-6"
            @click="confirmDelete"
          >
            Delete
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
