import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css"
import axios from 'axios'
import VueAxios from 'vue-axios'
import myTabs from "@/components/myTabs/myTabs";
Vue.component('myTabs', myTabs)
import {
  Tabs,
  TabPane,
  Carousel,
  CarouselItem
} from 'element-ui'
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.defaults.baseURL = '/api/'
axios.defaults.withCredentials = true

router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (document.cookie.includes('loginUserName')) {
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