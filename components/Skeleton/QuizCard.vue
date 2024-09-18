<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md w-full"
  >
    <!-- Title skeleton -->
    <div class="flex justify-between items-center">
      <USkeleton class="h-6 w-3/4 rounded"></USkeleton>
      <USkeleton class="w-5 h-5 rounded-full"></USkeleton>
    </div>

    <!-- Description skeleton -->
    <div class="flex space-x-2 items-stretch">
      <div class="w-px bg-primary-400"></div>
      <USkeleton class="h-4 w-full rounded"></USkeleton>
    </div>

    <!-- Number of items skeleton -->
    <USkeleton class="h-4 w-1/4 rounded"></USkeleton>
  </div>
</template>
