<script setup lang="ts">
import { useHomeStore } from "@/stores/home"; // Import the store

const homeStore = useHomeStore();
const isOwnedTab = ref(homeStore.isOwnedTab);

const handleTabChange = (newTab: boolean) => {
  isOwnedTab.value = newTab;
  homeStore.setTab(newTab);
};
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col px-4 mb-4">
      <div class="container mx-auto">
        <OrganismsAccountHeader />
      </div>

      <div class="flex-grow container mx-auto">
        <MoleculesQuizControls
          :is-owned-tab="isOwnedTab"
          @change-tab="handleTabChange"
        />

        <MoleculesOwnedQuiz v-if="isOwnedTab" />
        <MoleculesSharedQuiz v-else />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
