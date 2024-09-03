<script setup lang="ts"></script>

<template>
  <div>
    <div class="flex items-center justify-between px-10 h-24 w-full bg-white">
      <!-- Logo on the left -->
      <div>
        <img
          src="/assets/pictures/QuizWiz.png"
          alt="QuizWiz Logo"
          class="h-16 w-auto"
        />
      </div>

      <!-- List in the center -->
      <div>
        <ul class="flex justify-center space-x-10 text-gray-500">
          <li class="text-lg font-medium">
            <NuxtLink to="/dashboard">Quizzes</NuxtLink>
          </li>

          <li class="text-lg font-medium">
            <NuxtLink to="/history">History</NuxtLink>
          </li>

          <li class="text-lg font-medium">Stats</li>
        </ul>
      </div>

      <!-- Button on the right -->
      <div class="flex items-center space-x-4 w-60">
        <NuxtLink to="/quiz" class="flex-grow">
          <UButton color="primary" size="lg" variant="solid" block
            >Create Quiz</UButton
          >
        </NuxtLink>
        <ClickableAvatar />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
