<template>
  <input
    :checked="value"
    type="checkbox"
    class="base-checkbox"
    @change="$emit('input', ($event.target as HTMLInputElement).checked)"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
