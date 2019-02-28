import Vue from 'vue'
import Vuex from 'vuex'
import chat from './modules/chat'
import common from './modules/common'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common, user, chat
  },
  getters
})
export default store
