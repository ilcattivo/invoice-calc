<template>
  <table class="invoice-table">
    <thead>
      <tr>
        <th class="w-16">
          <BaseCheckbox
            :disabled="products.length === 0"
            :value="areAllProductsChecked"
            @input="onAllProductCheck"
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
            :value="checkedProductIds.includes(product.id)"
            @input="onProductCheck($event, product.id)"
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

<script lang="ts">
import Vue from 'vue';
import formatPrice from '@/helpers/formatPrice';
import BaseButton from './base/BaseButton.vue';
import BaseCheckbox from './base/BaseCheckbox.vue';
import invoice from '@/store/modules/invoice';

export default Vue.extend({
  components: { BaseButton, BaseCheckbox },

  data(): {
    checkedProductIds: string[];
  } {
    return {
      checkedProductIds: [],
    };
  },

  computed: {
    products() {
      return invoice.products;
    },

    totalPrice(): number {
      return this.products.reduce((accum, value) => {
        return accum + value.price * value.quantity;
      }, 0);
    },

    areAllProductsChecked(): boolean {
      return this.products.length > 0 && this.products.length === this.checkedProductIds.length;
    },
  },

  methods: {
    formatPrice,

    deleteProducts(): void {
      invoice.deleteProductsById(this.checkedProductIds);
      this.checkedProductIds = [];
    },

    onProductCheck(checked: boolean, targetId: string): void {
      if (checked) {
        this.checkedProductIds.push(targetId);
      } else {
        this.checkedProductIds = this.checkedProductIds.filter(productId => productId !== targetId);
      }
    },

    onAllProductCheck(checked: boolean): void {
      this.checkedProductIds = checked ? this.products.map(product => product.id) : [];
    },
  },
});
</script>

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
