<script setup lang="ts">
const props = defineProps({
  goTo: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();

const handleClick = (event: Event) => {
  if (route.path === props.goTo) {
    event.preventDefault(); // Prevent navigation if already on the same route
  }
};
</script>

<template>
  <div>
    <a
      :href="props.goTo"
      class="text-i-font-600"
      @click="handleClick"
      :class="
        props.isActive
          ? 'font-semibold text-i-font-900'
          : 'hover:text-i-font-900'
      "
    >
      <slot />
    </a>
  </div>
</template>
