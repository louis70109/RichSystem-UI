import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'
import {
  format
} from 'url'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
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
      path: '/manager',
      name: 'manager',
      component: () => import('./views/Manager')
    },
    // {
    //   path: '/',
    //   name: 'charts',
    //   component: () => import('./views/Charts')
    // },
    {
      path: '/',
      name: 'devices',
      component: () => import('./views/Devices')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
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
  let user = store.getters.getUser
  let tk = router.app.$localStorage.get('user_token')
  //LINE要例外
  const routes = [
    'sign',
    'DeviceStatus',
    'DeviceAccess',
    'DeviceSignUp',
    'DeviceTotal',
    'About'
  ]
  if (routes.includes(to.name)) {
    next()
  } else if (to.name !== 'login' && !tk) {
    next('/login')
  } else {
    if (to.query.id && to.query.token) {
      router.app.$localStorage.set('user_token', to.query.token)
      router.app.$localStorage.set('user_id', to.query.id)
      next('/')
    } else {
      axios
        .get(`"https://iotser.iots.tw"/v1/users/${tk}`)
        .then(res => {
          if (res.data.status === true) {
            store.dispatch('userCheck', res.data)
            next()
          } else next('/login')
        })
        .catch(err => {
          alert(err)
          next('/login')
        })
    }
  }
  next()
})
export default router
