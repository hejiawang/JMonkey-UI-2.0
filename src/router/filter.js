import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { validatenull } from '@/utils/validate'
// import { initRouter } from '@/utils/router'

NProgress.configure({ showSpinner: false })

/**
 * router before
 * TODO 在系统中禁用了 router history
 * TODO 缺：在地址栏中随便输入地址，应该返回引导页或首页
 */
router.beforeEach((to, from, next) => {
  console.info('router filter beforeEach')
  console.info(router)
  NProgress.start()

  if (store.getters.access_token) {
    if (to.path === '/login') {
      if (store.getters.isGuide) next({ path: '/guide', replace: true })
      else next({ path: '/', replace: true })
    } else {
      /* if (validatenull(router.options.routes[0].children)) { // 刷新页面
        console.info('router filter beforeEach initRouter')
        initRouter()
      } */

      next()
    }
  } else {
    if (to.path === '/login') next()
    else next({ path: '/login', replace: true })
  }
})

/**
 * router after
 */
router.afterEach((to, from) => {
  NProgress.done()
})
