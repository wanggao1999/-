import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routerMap = asyncRoutes, roles) {
  const res = []
  for (let i = 0; i < routerMap.length; i++) {
    if (routerMap[i].noCache) {
      res.push(routerMap[i])
      continue
    }
    for (let j = 0; j < roles.length; j++) {
      if (routerMap[i].name === roles[j].url) {
        if (routerMap[i].childPermissions && routerMap[i].childPermissions.length > 0) {
          routerMap[i].childPermissions = filterAsyncRoutes(routerMap[i].childPermissions, roles[j].childPermissions)
        }
        res.push(routerMap[i])
      }
    }
  }
  return res
}

const permission = {

  state: {
    routes: constantRoutes,
    addRouters: []
  },
  
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routes = constantRoutes.concat(routers)
    }
  },
  
  actions: {
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, data) 
        commit('SET_ROUTERS', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }

}

export default permission
