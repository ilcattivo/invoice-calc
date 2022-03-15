import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

export const PERSISTANCE_KEY = 'vuex';

const vuexLocal = new VuexPersistence({
  key: PERSISTANCE_KEY,
});

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
});

export default store;
