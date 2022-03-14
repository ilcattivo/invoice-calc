<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAppStore } from '@/store';
import formatPrice from '@/helpers/formatPrice';
import BaseButton from './base/BaseButton.vue';
import BaseCheckbox from './base/BaseCheckbox.vue';

const invoiceStore = useAppStore('invoice');

const products = computed(() => invoiceStore.allProducts);

const totalPrice = computed(() => {
  return products.value.reduce((accum, value) => {
    return accum + value.price * value.quantity;
  }, 0);
});

const checkedProductIds = ref<string[]>([]);

const deleteProducts = () => {
  invoiceStore.deleteProductsById(checkedProductIds.value);
  checkedProductIds.value = [];
};

const onProductCheck = (checked: boolean, targetId: string): void => {
  if (checked) {
    checkedProductIds.value.push(targetId);
  } else {
    checkedProductIds.value = checkedProductIds.value.filter(productId => productId !== targetId);
  }
};

const areAllProductsChecked = computed(() => {
  return products.value.length > 0 && products.value.length === checkedProductIds.value.length;
});

const onAllProductCheck = (checked: boolean): void => {
  checkedProductIds.value = checked ? products.value.map(product => product.id) : [];
};
</script>

<template>
  <table class="invoice-table">
    <thead>
      <tr>
        <th class="w-16">
          <BaseCheckbox
            :disabled="products.length === 0"
            :modelValue="areAllProductsChecked"
            @update:modelValue="onAllProductCheck"
          />
        </th>
        <th class="w-52">Product name</th>
        <th class="w-24">Price</th>
        <th class="w-20">Qta</th>
        <th class="w-24">Sum</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!products.length">
        <td colspan="5">
          <p class="text-center">The table is empty</p>
        </td>
      </tr>
      <tr v-for="product of products" :key="product.id">
        <td>
          <BaseCheckbox
            :modelValue="checkedProductIds.includes(product.id)"
            @update:modelValue="onProductCheck($event, product.id)"
          />
        </td>
        <td>{{ product.name }}</td>
        <td>{{ formatPrice(product.price) }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ formatPrice(product.price * product.quantity) }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>
          <BaseButton :disabled="!checkedProductIds.length" @click="deleteProducts">
            Delete
          </BaseButton>
        </td>
        <td colspan="2"></td>
        <td colspan="2">Total {{ formatPrice(totalPrice) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
$cell-border: 1px solid black;

.invoice-table {
  border-top: $cell-border;

  td,
  th {
    border-left: $cell-border;
    border-right: $cell-border;
    padding-left: 8px;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #ddd;
    border-bottom: $cell-border;
  }

  td {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tfoot {
    td {
      border: none;
      padding-left: 0;
    }
    border-top: $cell-border;
  }
}
</style>
