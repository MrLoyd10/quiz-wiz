<!-- 
 <AtomsEmailForm v-model="email" /> 
-->
<script setup lang="ts">
const email = ref("");

const emit = defineEmits(["update:modelValue"]);

watch(email, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <div>
    <UFormGroup label="Email" name="email">
      <UInput v-model="email" />
    </UFormGroup>
  </div>
</template>
