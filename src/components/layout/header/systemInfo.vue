<template>
  <div v-if="system" class="cheader-system">
    <div class="cheader-back" v-if="isGuide">
      <a @click="goGuide">
        <Row class="cheader-back-title"> <Icon type="ios-undo" size="40"/> </Row>
        <Row class="cheader-back-content"> <span>返回上级</span> </Row>
      </a>
    </div>

    <div v-for="item in systemList" :key="item.id" :class="item.isAuth | systemClassFilter(item.id)">
      <a @click="goIndex(item)">
        <Row class="cheader-system-title"> <Icon :type="item.icon" size="30" /> </Row>
        <Row class="cheader-system-content"> <span>{{item.name}}</span> </Row>
      </a>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { rebuildRouter } from '@/utils/router'

export default {
  name: 'CHeader_SystemInfo',
  props: {
    system: {type: Boolean, default: true, required: false}
  },
  computed: {
    /**
     * 是否在头部显示系统列表
     * @returns {getters.isGuide} true显示
     */
    isGuide () { return store.getters.isGuide },
    /**
     * 登陆用户系统配置信息
     */
    systemList () { return store.getters.systemList }
  },
  filters: {
    /**
     * 过滤系统信息样式
     */
    systemClassFilter (val, systemId) {
      if (systemId === store.getters.currentSystem.id) return 'cheader-system-current'
      if (val === 'Yes') return 'cheader-system-y'
      if (val === 'No') return 'cheader-system-n'
    }
  },
  methods: {
    /**
     * 返回到引导页
     */
    goGuide () {
      this.$router.replace('/guide')
    },
    /**
     * 跳转首页
     * TODO bug 左侧菜单首页菜单没有被选中（原因，store中的值变了，但是menu/index.vue中的computed没有重新计算，为什么？？？）
     * @param system 系统信息
     */
    goIndex (system) {
      if (system.isAuth === 'Yes' && system.id !== store.getters.currentSystem.id) {
        store.dispatch('renderSystem', system).then(() => {
          store.commit('SET_CURRENTMENU', store.getters.currentSystemHome)

          // 处理选择系统的router信息
          rebuildRouter()

          // 进入首页
          this.$router.replace({path: store.getters.currentSystemHome})
        })
      }
    }
  }
}
</script>
