<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean, // This controls the visibility of the modal
  shareWith: Array, // The array of users to share with
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
