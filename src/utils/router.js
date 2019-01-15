import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { validatenull } from '@/utils/validate'

/**
 * 获取当前系统的router路径，
 * TODO 调用该方法的位置，有待商榷
 */
export const initRouter = () => {
  // 获取前三个
  router.options.routes.slice(2)
  router.options.routes[0].children = []

  let menuTreeList = store.getters.currentSystem.authMenuList
  let menuList = converToList(menuTreeList)
  menuList.forEach(menu => {
    if (!validatenull(menu.path) && !validatenull(menu.component)) {
      let meunRouter = {
        name: menu.name,
        path: menu.path,
        component: resolve => require(['@/views' + menu.component], resolve)
      }

      router.options.routes[0].children.push(meunRouter)
    }
  })

  router.addRoutes(router.options.routes)
  console.info(router)
}

/**
 * 将树形菜单转换为list
 * TODO 在多处同时使用该方法转换菜单信息，应该重构优化
 * @param treeMenu 树形菜单
 * @returns {Array} 菜单list
 */
export const converToList = (treeMenu) => {
  let menuList = []

  treeMenu.forEach(menu => {
    if (!validatenull(menu.children)) converToList(menu.children).forEach(cMenu => menuList.push(cMenu))

    // 系统形式为tab时，首页tab不可关闭
    Vue.set(menu, '_closable', menu.path !== '/home')

    menuList.push(menu)
  })

  return menuList
}
