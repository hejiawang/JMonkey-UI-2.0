import Vue from 'vue'
import { validatenull } from '@/utils/validate'

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
    Vue.set(menu, '_closable', menu.path !== '/home')

    menuList.push(menu)
  })

  return menuList
}
