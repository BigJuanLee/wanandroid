import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css"
import axios from 'axios'
import VueAxios from 'vue-axios'
import Tabs from "@/components/Tabs/Tabs";
Vue.component('Tabs', Tabs)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.defaults.baseURL = '/api/'

router.beforeEach((to, from, next) => {
  if(to.meta.needLogin) {
    if(localStorage.getItem("token")) {
      next();
    } else {
      next({
        name: 'login'
      })
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
