import Vue from 'vue'
import App from './App.vue'

import VueRouter from "vue-router";
import router from "@/router";

import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from "axios";
import './assets/css/global.css'
import less from 'less'
import 'windi.css'

Vue.config.productionTip = false
axios.defaults.baseURL="/api"

//设置token请求头
axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.use(less)
Vue.use(VueRouter)
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
