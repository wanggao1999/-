import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import { Notification } from 'element-ui'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/', // api base_url
  timeout: 30000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = window.sessionStorage.getItem('token')
    if (data.code === '403') {
      Notification.error({
        title: 'Forbidden',
        message: data.msg || 'Error',
      })
    }
    if (data.code === '404') {
      Notification.error({
        title: 'url ' + error.response.request.responseURL + ' not found.',
        message: data.msg || 'Error',
      })
    }
    if (data.code === '401') {
      Notification.error({
        title: '错误',
        message: data.message
      })
      if (token) {
        Notification.warning({
          title: '消息',
          message: 'token失效，请重新登录'
        })
        // setTimeout(() => {
        //   store.dispatch('user/Logout').then(() => {
        //     setTimeout(() => {
        //       window.location.reload()
        //     }, 100)
        //   })
        // }, 1500)
      }
    }
  } else {
    Notification.error({
      title: '错误',
      message: '请求超时'
    })
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
   const token = window.sessionStorage.getItem('token')
  // config.headers['Content-Type'] = 'application/x-www- form-urlencoded'
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  // const whiteList = []
  // 没权限
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
