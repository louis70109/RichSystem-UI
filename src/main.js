import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/scss/bootstrap.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'


import VCharts from 'v-charts'

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueLocalStorage from 'vue-localstorage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueLocalStorage)

Vue.use(require('vue-moment'), {
  moment,
});
Vue.use(VCharts)
// Vue.prototype.$axios = axios;


Vue.use(VueAxios, axios)
global.$ = $
Vue.prototype.$liff = window.liff
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
