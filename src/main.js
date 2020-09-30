import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import {Routes} from './routes';
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false

Vue.use(VueRouter);

const routes=Routes;

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
