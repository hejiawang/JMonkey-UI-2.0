import { setStore, getStore } from '@/utils/store'
import { setToken, removeToken } from '@/utils/auth'
import { loginByUsername } from '@/api/login/login'
import { getUserInfoByUsername } from '@/api/sys/user'

/**
 * 用户信息以及登陆信息
 * @type {{state: {access_token: (*|string)}}}
 */
const user = {
  state: {
    access_token: getStore({ name: 'access_token' }) || '',
    user: getStore({ name: 'user' }) || {},
    roleList: getStore({ name: 'roleList' }) || [],
    deptList: getStore({ name: 'deptList' }) || [],
    permissions: getStore({ name: 'permissions' }) || {},
    isGuide: getStore({ name: 'isGuide' }) || false
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

          // 登陆成功后，获取用户信息放到store中
          getUserInfoByUsername(userInfo.username).then(data => {
            commit('SET_USER_INFO', data.result.user)
            commit('SET_ROLELIST', data.result.roleList)
            commit('SET_DEPTLIST', data.result.deptList)
            commit('SET_PERMISSIONS', data.result.permissionList)
            commit('SET_ISGUIDE', data.result.guide)

            resolve()
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    /**
     * 退出登陆状态
     * @param commit
     * @param state
     * @returns {Promise<any>}
     * @constructor
     */
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        removeToken()

        commit('SET_USER_INFO', {})
        commit('SET_ROLELIST', [])
        commit('SET_DEPTLIST', [])
        commit('SET_PERMISSIONS', [])
        commit('SET_ISGUIDE', false)

        resolve()
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
    },
    /**
     * 保存用户信息
     * @param state
     * @param data
     * @constructor
     */
    SET_USER_INFO: (state, data) => {
      state.user = data
      setStore({
        name: 'user',
        content: state.user,
        type: 'session'
      })
    },
    /**
     * 保存用户角色信息
     * @param state
     * @param data
     * @constructor
     */
    SET_ROLELIST: (state, data) => {
      state.roleList = data
      setStore({
        name: 'roleList',
        content: state.roleList,
        type: 'session'
      })
    },
    /**
     * 保存用户部门信息
     * @param state
     * @param data
     * @constructor
     */
    SET_DEPTLIST: (state, data) => {
      state.deptList = data
      setStore({
        name: 'deptList',
        content: state.deptList,
        type: 'session'
      })
    },
    /**
     * 保存用户授权的权限标识
     * @param state
     * @param data
     * @constructor
     */
    SET_PERMISSIONS: (state, data) => {
      let permisssionObj = {}
      data.forEach(permission => { permisssionObj[permission] = true })

      state.permissions = permisssionObj
      setStore({
        name: 'permissions',
        content: state.permissions,
        type: 'session'
      })
    },
    /**
     * 是否需要引导页
     * @param state
     * @param data
     * @constructor
     */
    SET_ISGUIDE: (state, data) => {
      state.isGuide = data
      setStore({
        name: 'isGuide',
        content: state.isGuide,
        type: 'session'
      })
    }
  }
}

export default user
