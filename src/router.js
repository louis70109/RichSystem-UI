import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'DeviceSignUp',
      component: () => import('./views/DeviceSignUp.vue')
    }, {
      path: '/devices/status',
      name: 'DeviceStatus',
      component: () => import('./views/DeviceStatus.vue')
    }, {
      path: '/devices/order',
      name: 'DeviceOrder',
      component: () => import('./views/DeviceOrder.vue')
    }, {
      path: '/devices/access',
      name: 'DeviceAccess',
      component: () => import('./views/DeviceAccess.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    }, {
      path: '/sign_up',
      name: 'sign',
      component: () => import('./views/Sign')
    }, {
      path: '/charts',
      name: 'charts',
      component: () => import('./views/Charts')
    }, {
      path: '/devices',
      name: 'devices',
      component: () => import('./views/Devices')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
