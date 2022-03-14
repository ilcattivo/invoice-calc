<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  }
);

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <button
    class="border-2 border-slate-400 rounded-sm px-2 py-0.5"
    :class="{ 'bg-slate-100 opacity-70': disabled }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
