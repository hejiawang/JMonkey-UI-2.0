<template>
  <Menu :active-name="activeMenu" theme="light" width="auto" accordion @on-select="selectMenu">
    <MenuItem name="/home" to="/home"><icon type="md-home"></icon>系统首页</MenuItem>
    <MenuItem name="/sys/user" to="/sys/user"><Icon type="ios-contact" />用户管理</MenuItem>
    <MenuItem name="/sys/role" to="/sys/role"><Icon type="md-globe" />角色管理</MenuItem>
    <MenuItem name="/sys/dept" to="/sys/dept"><Icon type="logo-xbox" />部门管理</MenuItem>
    <MenuItem name="/sys/dict" to="/sys/dict"><Icon type="ios-at-outline" />字典管理</MenuItem>
    <Submenu name="1">
      <template slot="title"> <Icon type="ios-navigate"></Icon>资源管理</template>
      <MenuItem name="/sys/system" to="/sys/system">系统管理</MenuItem>
      <MenuItem name="/sys/menu" to="/sys/menu">菜单管理</MenuItem>
      <MenuItem name="/sys/button" to="/sys/button">按钮管理</MenuItem>
    </Submenu>
  </Menu>
</template>
<script>
import store from '@/store'

export default {
  name: 'CMenu',
  data () {
    return {
      activeMenu: ''
    }
  },
  created () {
    this.activeMenu = store.getters.currentMenu
  },
  methods: {
    selectMenu (name) {
      this.activeMenu = name
      store.commit('SET_CURRENTMENU', name)
    }
  }
}
</script>
