import Vue from 'vue';
import Vuex from 'vuex';
import settings from './modules/settings';
import example from './modules/example';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    example
  },
  strict: true
});