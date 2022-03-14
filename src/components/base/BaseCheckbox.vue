<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <input
    :checked="modelValue"
    type="checkbox"
    class="base-checkbox"
    @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
  />
</template>
