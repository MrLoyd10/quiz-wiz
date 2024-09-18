<!-- 
 <AtomsPasswordForm v-model="password" /> 
-->
<script setup lang="ts">
const password = ref("");

const emit = defineEmits(["update:modelValue"]);

watch(password, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <div>
    <UFormGroup label="Password" name="password">
      <UInput v-model="password" type="password" />
    </UFormGroup>
  </div>
</template>
