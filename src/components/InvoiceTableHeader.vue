<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import BaseInput from './base/BaseInput.vue';
import BaseButton from './base/BaseButton.vue';
import { useAppStore } from '@/store';

const invoice = useAppStore('invoice');

const initialState = {
  name: '',
  price: '',
  quantity: '',
};

const product = reactive({ ...initialState });

const formError = ref('');

const validateForm = (): boolean => {
  const unfilledField = Object.entries(product).find(([_fieldName, value]) => !value);

  if (unfilledField) {
    const [fieldName] = unfilledField;
    formError.value = `Please fill in product ${fieldName}`;
    return false;
  }

  return true;
};

watch(product, () => {
  formError.value = '';
});

const addProduct = () => {
  const isValid = validateForm();

  if (!isValid) return;

  invoice.addProduct({
    name: product.name,
    price: parseFloat(product.price),
    quantity: parseInt(product.quantity),
  });

  Object.assign(product, initialState);
};
</script>

<template>
  <div class="mb-2">
    <form class="flex" @submit.prevent="addProduct">
      <BaseInput v-model="product.name" required placeholder="Product name" class="w-60 mr-3" />
      <BaseInput
        v-model="product.price"
        type="number"
        placeholder="Price, $"
        required
        min="0"
        class="w-24 mr-3"
      />
      <BaseInput
        v-model="product.quantity"
        type="number"
        placeholder="Qty"
        required
        min="0"
        class="w-24 mr-auto"
      />
      <BaseButton>Add</BaseButton>
    </form>
    <p class="mt-1">{{ formError }}</p>
  </div>
</template>
