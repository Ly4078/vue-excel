import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';

import VueAxios from 'vue-axios'

import GLOBAL from './untils/config';
Vue.prototype.$GLOBAL = GLOBAL;
Vue.prototype.$axios = axios;
// 通过use方法加载axios插件
Vue.use(VueAxios,axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
