import { setStore, getStore } from '@/utils/store'
import { setToken } from '@/utils/auth'
import { loginByUsername } from '@/api/login/login'

/**
 * 用户信息以及登陆信息
 * @type {{state: {access_token: (*|string)}}}
 */
const user = {
  state: {
    access_token: getStore({ name: 'access_token' }) || ''
  },
  actions: {
    /**
     * 用户登录
     * @param commit
     * @param state
     * @param dispatch
     * @param userInfo
     * @returns {Promise<any>}
     * @constructor
     */
    LoginByUsername ({ commit, state, dispatch }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo.username, userInfo.password, userInfo.code, userInfo.randomStr).then(data => {
          setToken(data.access_token)

          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mutations: {
    /**
     * 保存access_token
     * @param state
     * @param accessToken
     * @constructor
     */
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.access_token = accessToken
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    /**
     * 保存refresh_token
     * @param state
     * @param rfToken
     * @constructor
     */
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session'
      })
    }
  }
}

export default user
