<script setup lang="ts">
import { ref } from "vue";

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<template>
  <div>
    <header class="flex justify-between items-center p-6 w-full">
      <!-- Logo Section -->
      <MoleculesLogoWithText />

      <!-- Hamburger Menu for Small Screens -->
      <div class="md:hidden">
        <UButton
          icon="i-heroicons-bars-3-solid"
          color="gray"
          variant="ghost"
          aria-label="Menu"
          @click="toggleMenu"
        />
      </div>

      <!-- Navigation and User Info (Hidden on Small Screens) -->
      <div class="hidden md:flex items-center space-x-6">
        <MoleculesHomeNav />
        <div class="flex space-x-2 items-center">
          <AtomsThemeToggle />
          <AtomsUserInfo />
        </div>
      </div>
    </header>

    <!-- Mobile Navigation (Visible on Small Screens) -->
    <nav
      v-if="menuOpen"
      class="md:hidden flex justify-between items-center p-4 bg-gray-100 rounded-lg"
    >
      <MoleculesHomeNav />
      <div class="flex space-x-2 items-center">
        <AtomsThemeToggle />
        <AtomsUserInfo />
      </div>
    </nav>
  </div>
</template>
