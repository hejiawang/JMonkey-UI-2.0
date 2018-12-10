<template>
  <Tabs  type="card" closable class="app-layout-tabs" @on-click="tabsClick" @on-tab-remove="tabsRemove">
    <TabPane label="首页" icon="logo-apple" :closable="false" />
    <TabPane label="用户管理" icon="logo-windows" />
    <TabPane label="部门管理" icon="logo-tux" />
  </Tabs>
</template>
<script>
export default {
  name: 'CTabs',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    /**
     * 标签页点击事件
     * @param tabsIndex 标签页索引
     */
    tabsClick (tabsIndex) {
      console.info(tabsIndex)
    },
    /**
     * 移除标签页事件
     * @param tabsIndex 标签页索引
     */
    tabsRemove (tabsIndex) {
      console.info(tabsIndex)
    }
  }
}
</script>
