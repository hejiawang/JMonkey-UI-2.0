<template>
  <div v-if="system && isGuide" class="cheader-system">
    <div class="cheader-back">
      <a @click="goGuide">
        <Row class="cheader-back-title"> <Icon type="ios-undo" size="40"/> </Row>
        <Row class="cheader-back-content"> <span>返回上级</span> </Row>
      </a>
    </div>

    <div v-for="item in systemList" :key="item.id" :class="item.isAuth | systemClassFilter(item.rid)">
      <a @click="goIndex(item.rid, item.isAuth)">
        <Row class="cheader-system-title"> <Icon :type="item.icon" size="30" /> </Row>
        <Row class="cheader-system-content"> <span>{{item.name}}</span> </Row>
      </a>
    </div>
  </div>
</template>
<script>
import store from '@/store'

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
    systemClassFilter (val, systemRid) {
      if (systemRid === store.getters.currentSystem) return 'cheader-system-current'
      if (val === 'Yes') return 'cheader-system-y'
      if (val === 'No') return 'cheader-system-n'
    }
  },
  data () {
    return {
    }
  },
  methods: {
    /**
     * 返回到引导页
     */
    goGuide () {
      this.$router.push('/guide')
    },
    /**
     * 跳转首页
     * @param systemRId 系统资源id resources id
     * @param isAuth 是否有权限
     */
    goIndex (systemRId, isAuth) {
      if (isAuth === 'Yes' && systemRId !== store.getters.currentSystem) {
        store.commit('SET_CURRENTSYSTEM', systemRId)
        store.commit('SET_CURRENTMENU', '/home')

        this.$router.push({path: '/home'})
      }
    }
  }
}
</script>
