import { setStore, getStore } from '@/utils/store'

const common = {
  state: {
    windowHeight: getStore({ name: 'windowHeight' }) || 0,
    currentMenu: getStore({ name: 'currentMenu' }) || '/home'
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
    }
  }
}

export default common
