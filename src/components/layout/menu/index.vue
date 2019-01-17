<template>
  <Menu :active-name="activeMenu" theme="light" width="auto" accordion @on-select="selectMenu">
    <!-- TODO 最多支持两级菜单 -->
    <template v-for="menu in menuList" v-if="menu.isShow == 'Yes'">
      <!-- 两层菜单的遍历方式 -->
      <Submenu :key="menu.id" v-if="menu.children && menu.children.length > 0" name="1" >
        <template slot="title"> <Icon v-if="menu.icon" :type="menu.icon" />{{menu.name}}</template>

        <!-- 遍历第二层菜单 -->
        <MenuItem v-for="menuChildren in menu.children" :key="menuChildren.id" v-if="menuChildren.isShow == 'Yes'"
                  :name="menuChildren.path" :to="menuChildren.path" :replace="true">
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
    activeMenu () { return store.getters.currentMenu },
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
    }
  }
}
</script>
