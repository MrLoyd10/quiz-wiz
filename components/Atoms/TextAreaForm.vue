<!-- 
 <AtomsTextAreaForm v-model="value" label="label" /> 
-->
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  autocomplete: {
    type: String,
    default: "on",
  },
});

const emit = defineEmits(["update:modelValue"]);

// Emit the updated value when it changes in the input
const updateValue = (newValue: string) => {
  emit("update:modelValue", newValue);
};
</script>

<template>
  <div>
    <UFormGroup :label="props.label">
      <UTextarea
        :value="props.modelValue"
        @input="updateValue($event.target.value)"
        :autocomplete="props.autocomplete"
      />
    </UFormGroup>
  </div>
</template>
