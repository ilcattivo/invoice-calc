<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
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
