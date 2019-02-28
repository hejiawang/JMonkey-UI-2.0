import { setStore, getStore } from '@/utils/store'

const chat = {
  state: {
    showIm: getStore({ name: 'showIm' }) || false,
    memberList: getStore({ name: 'memberList' }) || [],
    memberC: getStore({ name: 'memberC' }) || {}
  },
  actions: {
    /**
     * 关闭即时通讯的聊天modal
     * @param commit
     * @param state
     * @returns {Promise<any>}
     */
    closeChatIm ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_SHOWIM', false)
        commit('CLEAR_MEMBERLIST')

        resolve()
      })
    },
    /**
     * 关闭与登陆人聊天的人或群组
     * @param commit
     * @param state
     * @param member
     * @returns {Promise<any>}
     */
    closeChatImMember ({ commit, state }, member) {
      return new Promise((resolve, reject) => {
        if (state.memberList.length === 1) {
          commit('SET_SHOWIM', false)
          commit('CLEAR_MEMBERLIST')
        } else {
          commit('DELETE_MEMBER', member.id)

          if (member.id === state.memberC.id) commit('SET_MEMBERC', state.memberList[0])
        }

        resolve()
      })
    }
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
    },
    /**
     * 设置与当前用户聊天的所有人或群组
     * @param state
     * @param h
     * @constructor
     */
    SET_MEMBERLIST: (state, h) => {
      let isAdd = true
      state.memberList.forEach((tab, index) => { if (tab.id === h.id) isAdd = false })

      if (isAdd) {
        state.memberList.push(h)
        setStore({
          name: 'memberList',
          content: state.memberList,
          type: 'session'
        })
      }
    },
    /**
     * 从memberList中删除一个聊天用户或群组
     * @param state
     * @param h
     * @constructor
     */
    DELETE_MEMBER: (state, h) => {
      let mIndex = -1
      state.memberList.forEach((member, index) => {
        if (member.id === h) mIndex = index
      })

      if (mIndex > -1) state.memberList.splice(mIndex, 1)

      setStore({
        name: 'memberList',
        content: state.memberList,
        type: 'session'
      })
    },
    /**
     * 清除与当前用户聊天的所有人或群组
     * @param state
     * @constructor
     */
    CLEAR_MEMBERLIST: (state) => {
      state.memberList = []
      setStore({
        name: 'memberList',
        content: state.memberList,
        type: 'session'
      })
    },
    /**
     * 设置当前聊天用户或群组
     * @param state
     * @param h
     * @constructor
     */
    SET_MEMBERC: (state, h) => {
      state.memberC = h
      setStore({
        name: 'memberC',
        content: state.memberC,
        type: 'session'
      })
    }
  }
}

export default chat
