import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { validatenull } from '@/utils/validate'
import { initRouter } from '@/utils/router'

NProgress.configure({ showSpinner: false })
// const whiteList = ['/login', '/guide', '/']

/**
 * router before
 * TODO 在系统中禁用了 router history
 */
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (store.getters.access_token) {
    if (to.path === '/login') {
      if (store.getters.isGuide) next({ path: '/guide', replace: true })
      else next({ path: '/', replace: true })
    } else {
      // 刷新页面或者重新选择系统时触发
      if (validatenull(router.options.routes[0].children) && router.options.routes.length === 3 && !validatenull(store.getters.menuList)) {
        initRouter()

        // TODO 程序走到这里后，下面的next()不好使
        router.replace(to.path)
      }

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
  // 如果用户在浏览器地址栏中随意输入地址，回到当前页
  // TODO 改进方案： 在state.common.menuList中不存在该路径,回到当前页
  // TODO 存在问题： this.$router.replace({path: '/message/publish/form'}) 时, 不能跳转页面, 改进：能遍历state.common.menuList,
  /* if (whiteList.indexOf(to.path) === -1 && to.path !== store.getters.currentMenu) {
    router.replace(store.getters.currentMenu)
  } */

  NProgress.done()
})
