<script setup lang="ts">
definePageMeta({
  // Dont allow to access this page if the attempt id is empty. Meaning user can't go here manually
  middleware: ["attempt-result"],
});
</script>

<template>
  <div>
    <div class="min-h-screen flex flex-col">
      <div class="container mx-auto">
        <OrganismsAuthHeader />
      </div>
      <div class="flex-grow container mx-auto">
        <MoleculesQuizAttemptSummary />
      </div>
    </div>
  </div>
</template>
