import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';
import Invoice from './modules/invoice';

const modules = {
  invoice: Invoice,
} as const;

type StoreModule = keyof typeof modules;

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

const store = createStore({
  modules,
  plugins: [vuexLocal.plugin],
});

export const useAppStore = (moduleName: StoreModule) => {
  return getModule(modules[moduleName], store);
};

export default store;
