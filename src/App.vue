<script setup lang="ts">
import InvoiceTableHeader from './components/InvoiceTableHeader.vue';
import InvoiceTable from './components/InvoiceTable.vue';
</script>

<template>
  <main class="flex justify-center items-center mt-12">
    <div>
      <h1 class="text-3xl font-bold mb-3">Vue Invoice Calc</h1>
      <InvoiceTableHeader />
      <InvoiceTable />
    </div>
  </main>
</template>

<style>
@import './assets/base.css';
</style>
