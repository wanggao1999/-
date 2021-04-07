import Vue from 'vue'
import router from '../../router/index'
import { login, logout } from '@/api/login'
import { hexMd5 } from '@/utils/md5.js'
import { timeFix } from '@/utils/util'
import { Message,Notification } from 'element-ui';

const user = {
  namespaced: true,
  state: {
    token: '',
    name: '',
    outlet: [],
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      window.localStorage.setItem('token',token)
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_OUTLET: (state, outlet) => {
      state.outlet = outlet
    }
  },

  actions: {
    // 登入
    loginFn({commit},data){
      return new Promise( async (reslove,reject)=>{
       const res = await login(data)
       if(res.code === 0){
         Message({
          type:'success',
          message:res.msg
        })
        commit('SET_TOKEN',res.data.token)
        router.push({path:'/'})
        Notification({
          title: data.username,
          message: timeFix() ,
          type: 'success',
          duration:2500
        });
       
      }else{
        Message({
          type:'error',
          message:res.msg
        })
      }
      })
    }
       
      
    },

    // GetAuth () { // 权限列表
    //   return new Promise ((resolve, reject) => {
    //     getRoles().then(res => {
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    GetInfo ({ commit }) { // 用户信息
      return new Promise ((resolve, reject) => {
        getInfo().then(res => {
          const result = res.data
          if (result.roleList && result.roleList.length > 0) {
            const role = res.data.roleList
            role.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            commit('SET_ROLES', result.roleList)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_OUTLET', res.data.outlets)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出
    Logout ({ commit, dispatch }) {
      return new Promise ((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        logout().then(res => {
          dispatch('clearStorage')
          window.location.reload()
          resolve(res)
        }).catch(error => {
          resolve(error)
        })
      })
    },
    clearStorage () {
      Vue.ls.remove('token')
    }
  }


export default user
