<template>
  <Tabs :value="currentMunu" type="card" closable class="app-layout-tabs" @on-click="tabsClick" @on-tab-remove="tabsRemove">
    <TabPane v-for="tab in tabList" :key="tab.path" :name="tab.path" :label="tab.name" :icon="tab.icon" :closable="tab.closable" />
  </Tabs>
</template>
<script>
import store from '@/store'

export default {
  name: 'CTabs',
  data () {
    return {
    }
  },
  computed: {
    currentMunu () { return store.getters.currentMenu },
    /**
     * 当前处于激活状态的菜单
     */
    tabList () { return store.getters.tabList }
  },
  methods: {
    /**
     * 标签页点击事件
     * @param name
     */
    tabsClick (name) {
      store.commit('SET_CURRENTMENU', name)
      this.$router.replace(name)
    },
    /**
     * 移除标签页事件
     * @param name
     */
    tabsRemove (name) {
      store.commit('DEL_TABLIST', name)

      // 移除标签后，回到首页
      this.tabsClick('/home')
    }
  }
}
</script>
