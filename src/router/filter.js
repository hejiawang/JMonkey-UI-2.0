import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
const whiteList = ['/login', '/404', '/401']

/**
 * router before
 */
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (store.getters.access_token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) next()
    else next('/login')
  }
})

/**
 * router after
 */
router.afterEach((to, from) => {
  NProgress.done()
})
