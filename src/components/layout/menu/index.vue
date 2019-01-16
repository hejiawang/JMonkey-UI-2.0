<template>
  <Menu :active-name="activeMenu" theme="light" width="auto" accordion @on-select="selectMenu">
    <!-- TODO 最多支持两级菜单 -->
    <template v-for="menu in menuList" >
      <!-- 两层菜单的遍历方式 -->
      <Submenu :key="menu.id" v-if="menu.children && menu.children.length > 0" name="1" >
        <template slot="title"> <Icon v-if="menu.icon" :type="menu.icon" />{{menu.name}}</template>

        <!-- 遍历第二层菜单 -->
        <MenuItem v-for="menuChildren in menu.children" :key="menuChildren.id" :name="menuChildren.path"
                  :to="menuChildren.path" :replace="true">
          <icon v-if="menuChildren.icon" :type="menuChildren.icon" />{{menuChildren.name}}
        </MenuItem>
      </Submenu>

      <!-- 一层菜单的遍历 -->
      <MenuItem :key="menu.id" v-else :name="menu.path" :to="menu.path" :replace="true">
        <icon :key="menu.id" v-if="menu.icon" :type="menu.icon" />{{menu.name}}
      </MenuItem>
    </template>
  </Menu>
</template>
<script>
import store from '@/store'

export default {
  name: 'CMenu',
  computed: {
    /**
     * 当前处于激活状态的菜单
     */
    activeMenu () {
      return store.getters.currentMenu
    },
    /**
     * 用于遍历菜单树
     */
    menuList () { return store.getters.currentSystem.authMenuList }
  },
  methods: {
    /**
     * 记录选择的菜单
     * @param name router path
     */
    selectMenu (name) {
      // 设置当前激活的菜单
      store.commit('SET_CURRENTMENU', name)

      // this.buildTabInfo(name)
    }
    /**
     * 如果当前系统展现方式为tab，记录tabList
     * @param path 菜单路径
     */
    /* buildTabInfo (path) {
      if (!this.checkTab(path)) return

      let menuInfo = {}
      this.authMenuList.forEach(menu => {
        if (menu.path === path) {
          menuInfo = {name: menu.name, path: menu.path, icon: menu.icon, closable: menu._closable}
        }
      })
      store.commit('SET_TABLIST', menuInfo)
    }, */
    /**
     * 判断是否需要添加tab信息
     * @param path 菜单路径
     * @returns {boolean} true 需要
     */
    /* checkTab (path) {
      // 如果系统展现方式不是tab页，return false
      if (store.getters.currentSystem.showType !== 'Tabs') return false

      // 如果已经存在tab信息，return false
      let isExist = false
      store.getters.tabList.forEach(tab => {
        if (tab.path === path) isExist = true
      })
      if (isExist) return false

      return true
    } */
  }
}
</script>
