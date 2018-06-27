/*
* @Author: django-wong
* @Date:   2018-05-16 23:50:34
* @Last Modified by:   django-wong
* @Last Modified time: 2018-05-17 00:12:03
*/


import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../routes/index';
import iView from 'iview';
import store from '../store/index';


Vue.use(iView);

Vue.use(VueRouter);
let router = new VueRouter({
  routes: routes
});

const app = new Vue({
  router: router,
  store: store,
  data: () => {
    return {
      loading: true,
      authenticated: false
    }
  },
  async mounted() {
    await this.$store.dispatch('init');
    let { settings } = this.$store.state;
    if(settings.sourcePassword && settings.sourceName){
      this.authenticated = true;
    }
    this.loading = false;
  }
}).$mount('#app');