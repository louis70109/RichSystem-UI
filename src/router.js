import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/devices',
      name: 'DeviceSignUp',
      children: [{
        path: '/status',
        name: 'DeviceStatus',
        component: () => import('./views/DeviceStatus.vue')
      }, {
        path: '/order',
        name: 'DeviceOrder',
        component: () => import('./views/DeviceOrder.vue')
      }, {
        path: '/access',
        name: 'DeviceAccess',
        component: () => import('./views/DeviceAccess.vue')
      }],
      component: () => import('./views/DeviceSignUp.vue')
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
      path: '/',
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


router.beforeEach((to, from, next) => {
  let token = router.app.$localStorage.get('user_token')
  //LINE要例外
  if (to.name === "sign") {
    next()
  } else if (to.name !== "login" && !token) {
    next('/login')
  } else {
    axios.get(`http://louis70109.asuscomm.com:3000/v1/users/${token}`).then(res => {
      if (res.data.status === true) {
        router.app.$localStorage.set('user_token', res.data.token)
        router.app.$localStorage.set('user_id', res.data.id)
        next()
      } else next('/login')
    }).catch(err => {
      next('/login')
    })
  }
  next()
})
export default router
