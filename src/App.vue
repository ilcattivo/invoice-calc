<template>
  <main class="w-full flex justify-center items-center mt-12">
    <div>
      <h1 class="text-3xl font-bold mb-3">Vue Invoice Calc</h1>
      <InvoiceTableHeader />
      <InvoiceTable />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import InvoiceTableHeader from './components/InvoiceTableHeader.vue';
import InvoiceTable from './components/InvoiceTable.vue';

export default Vue.extend({
  name: 'App',
  components: {
    InvoiceTableHeader,
    InvoiceTable,
  },
});
</script>

<style>
@import './assets/base.css';
</style>
