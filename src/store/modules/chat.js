import { setStore, getStore } from '@/utils/store'

const chat = {
  state: {
    showIm: getStore({ name: 'showIm' }) || false
  },
  actions: {

  },
  mutations: {
    /**
     * 设置聊天窗口是否可见
     * @param state
     * @param h
     * @constructor
     */
    SET_SHOWIM: (state, h) => {
      state.showIm = h
      setStore({
        name: 'showIm',
        content: state.showIm,
        type: 'session'
      })
    }
  }
}

export default chat
