import { setStore, getStore } from '@/utils/store'
import website from '@/const/website'
import { converToList } from '@/utils/router'

const common = {
  state: {
    website: website,
    windowHeight: getStore({ name: 'windowHeight' }) || 0,
    currentMenu: getStore({ name: 'currentMenu' }) || '/', // TODO 考虑使用this.$router.currentRouter重构
    menuList: getStore({ name: 'menuList' }) || [], // 当前系统中菜单信息list，不是treelist
    currentSystem: getStore({ name: 'currentSystem' }) || {},
    currentSystemHome: getStore({ name: 'currentSystemHome' }) || '/', // 当前系统首页
    tabList: getStore({ name: 'tabList' }) || [] // 格式： {name: '首页', path: '/home', icon: 'logo-apple', closable: false}
  },
  actions: {
    /**
     * 构建系统信息
     * @param commit
     * @param state
     * @param dispatch
     * @param system
     * @returns {Promise<any>}
     */
    renderSystem ({ commit, state, dispatch }, system) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENTSYSTEM', system)

        let menuList = converToList(system.authMenuList)
        commit('SET_MENULIST', menuList)
        commit('SET_SET_CURRENTSYSTEMHOME', menuList)

        resolve()
      })
    }
  },
  mutations: {
    /**
     * 将窗口高度保存至store，方便计算列表高度
     * @param state
     * @param h 窗口高度
     * @constructor
     */
    SET_WINDOWHEIGHT: (state, h) => {
      state.windowHeight = h
      setStore({
        name: 'windowHeight',
        content: state.windowHeight,
        type: 'session'
      })
    },
    /**
     * 记录当前激活菜单，达到刷新网页后还是当前激活菜单的效果
     * @param state
     * @param menu 菜单名称
     * @constructor
     */
    SET_CURRENTMENU: (state, menu) => {
      state.currentMenu = menu
      setStore({
        name: 'currentMenu',
        content: state.currentMenu,
        type: 'session'
      })
    },
    /**
     * 记录菜单list信息，（不是tree）
     * @param state
     * @param menuList
     * @constructor
     */
    SET_MENULIST: (state, menuList) => {
      state.menuList = menuList
      setStore({
        name: 'menuList',
        content: state.menuList,
        type: 'session'
      })
    },
    /**
     * 记录当前系统的home首页
     * @param state
     * @param menuList
     * @constructor
     */
    SET_SET_CURRENTSYSTEMHOME: (state, menuList) => {
      let systemtHome = '/'
      menuList.forEach(menu => {
        if (menu.isIndex === 'Yes') systemtHome = menu.path
      })

      state.currentSystemHome = systemtHome
      setStore({
        name: 'currentSystemHome',
        content: state.currentSystemHome,
        type: 'session'
      })
    },
    /**
     * 记录当前进入的系统Rid
     * @param state
     * @param system
     * @constructor
     */
    SET_CURRENTSYSTEM: (state, system) => {
      state.currentSystem = system
      setStore({
        name: 'currentSystem',
        content: state.currentSystem,
        type: 'session'
      })
    },
    /**
     * 标签页list
     * @param state
     * @param tabList
     * @constructor
     */
    SET_TABLIST: (state, tabInfo) => {
      state.tabList.push(tabInfo)
      setStore({
        name: 'tabList',
        content: state.tabList,
        type: 'session'
      })
    },
    /**
     * 移除标签页
     * @param state
     * @param path
     * @constructor
     */
    DEL_TABLIST: (state, path) => {
      let tabIndex = -1
      state.tabList.forEach((tab, index) => {
        if (tab.path === path) tabIndex = index
      })

      if (tabIndex > -1) state.tabList.splice(tabIndex, 1)

      setStore({
        name: 'tabList',
        content: state.tabList,
        type: 'session'
      })
    },
    /**
     * 清空标签页list
     * @param state
     * @constructor
     */
    CLEAR_TABLIST: (state) => {
      state.tabList = []
      setStore({
        name: 'tabList',
        content: state.tabList,
        type: 'session'
      })
    }
  }
}

export default common
