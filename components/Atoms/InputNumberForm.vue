<!-- 
 <AtomsInputNumberForm v-model="value" label="label" /> 
-->
<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  autocomplete: {
    type: String,
    default: "on",
  },
});
const value = ref("");

const emit = defineEmits(["update:modelValue"]);

watch(value, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <div>
    <UFormGroup :label="props.label">
      <UInput
        v-model="value"
        type="number"
        :autocomplete="props.autocomplete"
      />
    </UFormGroup>
  </div>
</template>
