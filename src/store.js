import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
Vue.use(Vuex)
const md5 = require('md5');
export default new Vuex.Store({
  state: {
    user: {
      id: null,
      token: "",
      name: "",
      level: null
    },
    backend_ip: "https://iotser.iots.tw"
  },
  mutations: {
    LOGIN_USER(state, user) {
      state.user.id = user.id
      state.user.token = user.token
      state.user.name = user.name
      state.user.level = user.level
      localStorage.setItem('user_token', user.token)
      localStorage.setItem('user_id', user.id)
      router.push('/')
    },
    USER_PROFILE_UPDATE(state, user) {
      state.user.id = user.id
      state.user.token = user.token
      state.user.name = user.name
      state.user.level = user.level
      localStorage.setItem('user_token', user.token)
      localStorage.setItem('user_id', user.id)
    }
  },
  actions: {
    userCheck(context, user) {
      context.commit('USER_PROFILE_UPDATE', {
        id: user.id,
        token: user.token,
        name: user.name,
        level: user.level
      })
    },
    loginUser(context, user) {
      axios
        .post(`${context.state.backend_ip}/v1/users/login`, {
          account: user.account,
          password: user.password
        })
        .then(res => {
          if (res.data.status === true) {
            let d = res.data;
            context.commit('LOGIN_USER', {
              id: d.id,
              token: d.token,
              name: d.name,
              level: d.level
            })
          } else {
            alert("帳號或密碼輸入錯誤");
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getIP: state => {
      return state.backend_ip
    }
  }
})
