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
    <div>
      <div class="flex justify-between items-center">
        <AtomsQuizTabs
          :is-owned-tab="props.isOwnedTab"
          @change-tab="$emit('change-tab', $event)"
        />
        <div>
          <NuxtLink to="/create-quiz">
            <UButton color="primary" size="lg" variant="solid" class="px-6"
              >Create Quiz</UButton
            >
          </NuxtLink>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>
