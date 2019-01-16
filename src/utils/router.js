import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import { validatenull } from '@/utils/validate'

/**
 * 将router还原为原始状态
 */
export const rebuildRouter = () => {
  // 获取前三个
  router.options.routes = router.options.routes.slice(0, 3)
  router.options.routes[0].children = []
}

/**
 * 获取当前系统的router路径，
 * TODO 调用该方法的位置，有待商榷
 */
export const initRouter = () => {
  rebuildRouter()

  let menuList = converToList(store.getters.menuList)
  menuList.forEach(menu => {
    if (!validatenull(menu.path) && !validatenull(menu.component)) {
      let meunRouter = {
        name: menu.name,
        path: menu.path,
        component: resolve => require(['@/views' + menu.component], resolve)
      }

      if (menu.showType === 'Home') {
        router.options.routes[0].children.push(meunRouter)
      } else if (menu.showType === 'Screen') {
        router.options.routes.push(meunRouter)
      }
    }
  })

  router.addRoutes(router.options.routes)
}

/**
 * 将树形菜单转换为list
 * @param treeMenu 树形菜单
 * @returns {Array} 菜单list
 */
export const converToList = (treeMenu) => {
  let menuList = []

  treeMenu.forEach(menu => {
    if (!validatenull(menu.children)) converToList(menu.children).forEach(cMenu => menuList.push(cMenu))

    // 系统形式为tab时，首页tab不可关闭
    Vue.set(menu, '_closable', menu.isIndex === 'No')

    menuList.push(menu)
  })

  return menuList
}
