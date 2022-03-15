<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    value: {
      type: [String, Number],
      default: false
    },
  },
});
</script>

<template>
  <input
    v-bind="$attrs"
    :value="value"
    class="border border-black rounded p-2"
    @input="$emit('input', $event.target.value)"
  />
</template>
