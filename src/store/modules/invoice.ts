import type { Product } from '@/types';
import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { v4 as uuidv4 } from 'uuid';

@Module({ name: 'invoice', preserveState: true })
export default class Invoice extends VuexModule {
  products: Product[] = [];

  get allProducts() {
    return this.products;
  }

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
