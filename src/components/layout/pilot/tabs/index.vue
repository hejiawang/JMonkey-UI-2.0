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
     * 当前系统首页路径
     */
    currentSystemHome () { return store.getters.currentSystemHome },
    /**
     * 当前选中的菜单项
     */
    currentMunu () { return store.getters.currentMenu },
    /**
     * 当前处于激活状态的菜单
     */
    tabList () { return store.getters.tabList }
  },
  watch: {
    /**
     * 选择的菜单变化是重构tab页
     */
    currentMunu (val) { this.buildTabsInfo() },
    /**
     * 当前系统变化时，重构tab页
     */
    currentSystemHome (val) {
      store.commit('CLEAR_TABLIST')
      this.buildTabsInfo()
    }
  },
  created () {
    this.initTabsInfo()
  },
  methods: {
    /**
     * 页面创建时创建tab页信息
     */
    initTabsInfo () {
      store.commit('CLEAR_TABLIST')

      let pathArray = [this.currentMunu]
      if (this.currentMunu !== this.currentSystemHome) pathArray.push(this.currentSystemHome)
      this.setTablist(pathArray)
    },
    /**
     * 系统或菜单变化时，构建tab页信息
     */
    buildTabsInfo () {
      if (!this.checkTab()) return

      this.setTablist([this.currentMunu])
    },
    /**
     * SET_TABLIST
     */
    setTablist (pathArray) {
      store.getters.menuList.forEach(menu => {
        if (pathArray.indexOf(menu.path) !== -1) {
          let tabInfo = { name: menu.name, path: menu.path, icon: menu.icon, closable: menu._closable }
          store.commit('SET_TABLIST', tabInfo)
        }
      })
    },
    /**
     * 校验是否需要向tab list中添加信息
     */
    checkTab () {
      let isExist = false
      store.getters.tabList.forEach(tab => {
        if (tab.path === this.currentMunu) isExist = true
      })
      if (isExist) return false

      return true
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
      if (name === this.currentMunu) this.tabsClick(this.currentSystemHome)
    }
  }
}
</script>
