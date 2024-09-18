<script setup lang="ts"></script>

<template>
  <div class="flex justify-center items-center p-8 max-w-4xl mx-auto">
    <!-- Left: Skeleton for illustration -->
    <div class="hidden md:block flex-1">
      <USkeleton class="w-3/4 mx-auto h-52" />
    </div>

    <!-- Right: Skeleton for text and buttons -->
    <div class="flex-1 text-center sm:text-left">
      <USkeleton class="w-40 h-8 mb-2 mx-auto sm:mx-0" />
      <USkeleton class="h-20 w-full mb-4" />
      <USkeleton class="h-4 w-3/4 mb-6 mx-auto sm:mx-0" />
      <div class="space-x-6">
        <USkeleton class="h-10 w-32 inline-block" />
        <USkeleton class="h-10 w-24 inline-block" />
      </div>
    </div>
  </div>
</template>
