/*
* @Author: django-wong
* @Date:   2018-05-16 23:50:34
* @Last Modified by:   django-wong
* @Last Modified time: 2018-05-17 00:12:03
*/


import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Vuex from "vuex";
import routes from '../routes/options';
import store from "../store/index";
import { CLIENT_RENEG_LIMIT } from 'tls';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(Vuex);

let router = new VueRouter({
  routes: routes
});

const app = new Vue({
  router,
  store,
  data() {
    return {
      inited: false
    };
  }
}).$mount('#app');

store.dispatch('init').then(() => {
  app.$data.inited = true;
});
