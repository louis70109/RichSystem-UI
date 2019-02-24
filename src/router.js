import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import { format } from 'url'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/line_devices',
      name: 'DeviceSignUp',
      component: () => import('./views/DeviceSignUp.vue')
    },
    {
      path: '/line_devices/status',
      name: 'DeviceStatus',
      component: () => import('./views/DeviceStatus.vue')
    },
    {
      path: '/line_devices/total',
      name: 'DeviceTotal',
      component: () => import('./views/DeviceTotal.vue')
    },
    {
      path: '/line_devices/order',
      name: 'DeviceOrder',
      component: () => import('./views/DeviceOrder.vue')
    },
    {
      path: '/line_devices/access',
      name: 'DeviceAccess',
      component: () => import('./views/DeviceAccess.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login')
    },
    {
      path: '/sign_up',
      name: 'sign',
      component: () => import('./views/Sign')
    },
    {
      path: '/',
      name: 'charts',
      component: () => import('./views/Charts')
    },
    {
      path: '/devices',
      name: 'devices',
      component: () => import('./views/Devices')
    },
    {
      path: '/users/profile',
      name: 'userProfile',
      component: () => import('./views/UserProfile')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = router.app.$localStorage.get('user_token')
  //LINE要例外
  const routes = [
    'sign',
    'DeviceStatus',
    'DeviceOrder',
    'DeviceAccess',
    'DeviceSignUp',
    'DeviceTotal'
  ]
  if (routes.includes(to.name)) {
    next()
  } else if (to.name !== 'login' && !token) {
    next('/login')
  } else {
    if (to.query.id && to.query.token) {
      router.app.$localStorage.set('user_token', to.query.token)
      router.app.$localStorage.set('user_id', to.query.id)
      next('/')
    } else {
      axios
        .get(`https://iotsboard.iots.tw/v1/users/${token}`)
        .then(res => {
          if (res.data.status === true) {
            router.app.$localStorage.set('user_token', res.data.token)
            router.app.$localStorage.set('user_id', res.data.id)
            next()
          } else next('/login')
        })
        .catch(err => {
          next('/login')
        })
    }
  }
  next()
})
export default router
