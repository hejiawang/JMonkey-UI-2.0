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
    /**
     * 当前选中的菜单项
     */
    currentMunu () { return store.getters.currentMenu },
    // currentSystem () { return store.getters.currentSystem },
    /**
     * 当前处于激活状态的菜单
     */
    tabList () { return store.getters.tabList },
    changeMenu () {

    },
    changeSystem () {}
  },
  watch: {
    currentMunu (val) { this.buildTabsInfo(1) }
    // currentSystem (val) { this.buildTabsInfo(2) }
  },
  created () {
    this.initTabsInfo(3)
  },
  methods: {
    initTabsInfo () {
      console.info('build tabs info ' + 3)
      // console.info(this.currentMunu)
      // console.info(this.currentSystem)
    },
    buildTabsInfo (v) {
      console.info('build tabs info ' + v)
    },
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

      // 移除当前标签页后，回到首页
      if (name === this.currentMunu) this.tabsClick('/home')
    }
  }
}
</script>
