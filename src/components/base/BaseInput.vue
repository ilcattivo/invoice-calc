<script setup lang="ts">
type Props = {
  modelValue: string | number;
};

defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
}>();
</script>

<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    class="border border-black rounded p-2"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
