const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // token: state => state.user.token,
  // roles: state => state.user.roles,
  // outlet: state => state.user.outlet,
  // addRouters: state => state.permission.addRouters,
  // name: state => state.user.name,
}
export default getters
