<script setup lang="ts"></script>

<template>
  <div>
    <div class="mb-10">
      <USkeleton class="h-6 w-1/4 mx-auto mb-2" />

      <!-- Skeleton for quiz title -->
      <h1 class="text-2xl font-bold text-i-font-900 text-center mb-2">
        <USkeleton class="h-6 w-1/2 mx-auto" />
      </h1>

      <!-- Skeleton for quiz description -->
      <USkeleton class="h-4 w-3/4 mx-auto mb-4" />

      <!-- Skeleton for score -->
      <USkeleton class="h-4 w-1/3 mx-auto mb-4" />
    </div>

    <div>
      <!-- Skeletons for questions and options -->
      <div v-for="n in 3" :key="n" class="mb-6 px-2">
        <USkeleton class="h-5 w-full mb-2" />
        <USkeleton v-for="m in 4" :key="m" class="h-4 w-4/5 mb-2" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
