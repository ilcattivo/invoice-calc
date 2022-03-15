import type { Product } from '@/types';
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators';
import { v4 as uuidv4 } from 'uuid';
import store, { PERSISTANCE_KEY } from '../index';

@Module({
  name: 'invoice',
  preserveState: localStorage.getItem(PERSISTANCE_KEY) !== null,
  store,
  dynamic: true
})
class Invoice extends VuexModule {
  products: Product[] = [];

  @Mutation
  addProduct(product: Omit<Product, 'id'>) {
    this.products.push({
      ...product,
      id: uuidv4(),
    });
  }
  @Mutation
  deleteProductsById(ids: string[]) {
    this.products = this.products.filter(product => !ids.includes(product.id));
  }
}

export default getModule(Invoice);
