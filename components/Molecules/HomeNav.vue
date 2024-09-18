<script setup lang="ts">
const route = useRoute();

const isHomeActive = route.path === "/home";
const isAttemptsActive = route.path === "/my-attempts";
</script>

<template>
  <div>
    <nav class="flex space-x-6">
      <AtomsMenuItem :is-active="isHomeActive" go-to="/home"
        >Home</AtomsMenuItem
      >
      <AtomsMenuItem :is-active="isAttemptsActive" go-to="/my-attempts"
        >My Attempts</AtomsMenuItem
      >
    </nav>
  </div>
</template>
