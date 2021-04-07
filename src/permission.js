import router from './router/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 简单配置
NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false
})

router.beforeEach( (to, from, next) => {
  // 启动进度条
  NProgress.start()

  // 修改页面标题
  document.title = to.meta.title||'加载中'

  // 从 Cookie 获取 Token
  const hasToken = window.localStorage.getItem('token')

  // 判断 Token 是否存在
  if (hasToken) {
    // 如果当前路径为 login 则直接重定向至首页
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } 
    }
    else {
      // 重定向至登录页面
      if(to.path==='/login'){ //如果是登录页面路径，就直接next()
        next();
    } else { //不然就跳转到登录；
      next(`/login?redirect=${to.path}`)
    }
  }
  next()
})
router.afterEach(() => {
  // 停止进度条
  NProgress.done()
})