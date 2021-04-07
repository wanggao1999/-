import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { VueAxios } from './utils/request'
import '@/styles/index.scss' // global css
import './filters/filter' // global filter
import './icons' // icon
import './permission'
Vue.config.productionTip = false;

Vue.use(VueAxios)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
