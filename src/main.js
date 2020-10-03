import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';

import {Routes} from './routes';
import vuetify from './plugins/vuetify';







Vue.config.productionTip = false

Vue.use(VueRouter);

const routes=Routes;

const store=Vue.observable({
  favorite:{
    items:[],
    add(item){
      store.favorite.items.push(item)
    },
  },
})

Vue.prototype.$store=store;

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
