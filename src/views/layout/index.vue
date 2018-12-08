<template>
  <Layout>
    <CHeader> </CHeader>
    <Layout>
      <Sider hide-trigger class="app-layout-sider">
        <Menu :active-name="activeMenu" theme="light" width="auto" accordion :open-names="['1']" @on-select="selectMenu">
          <MenuItem name="/home" to="/home"><icon type="md-home"></icon>系统首页</MenuItem>
          <MenuItem name="/sys/user" to="/sys/user"><Icon type="ios-contact" />用户管理</MenuItem>
          <MenuItem name="/sys/role" to="/sys/role"><Icon type="md-globe" />角色管理</MenuItem>
          <MenuItem name="/sys/dept" to="/sys/dept"><Icon type="logo-xbox" />部门管理</MenuItem>
          <Submenu name="1">
            <template slot="title"> <Icon type="ios-navigate"></Icon>资源管理</template>
            <MenuItem name="/sys/system" to="/sys/system">系统管理</MenuItem>
            <MenuItem name="/sys/menu" to="/sys/menu">菜单管理</MenuItem>
            <MenuItem name="/sys/button" to="/sys/button">按钮管理</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <!--<Breadcrumb>
          <BreadcrumbItem to="/guide"><Icon type="md-pin" size="20" color="#19be6b"/></BreadcrumbItem>
          <BreadcrumbItem>系统设置</BreadcrumbItem>
          <BreadcrumbItem>资源管理</BreadcrumbItem>
          <BreadcrumbItem>菜单管理</BreadcrumbItem>
        </Breadcrumb>-->

        <Tabs  type="card" closable class="app-layout-tabs" @on-click="tabsClick" @on-tab-remove="tabsRemove">
          <TabPane label="首页" icon="logo-apple" :closable="false" />
          <TabPane label="用户管理" icon="logo-windows" />
          <TabPane label="部门管理" icon="logo-tux" />
        </Tabs>

        <Content>
          <router-view />
        </Content>
        <Footer> 2011-2016 &copy; TalkingData </Footer >
      </Layout>
    </Layout>
  </Layout>
</template>

<script>
import store from '@/store'
import CHeader from '@/components/layout/header'

export default {
  name: 'LayoutMain',
  components: {
    CHeader
  },
  created () {
    this.activeMenu = store.getters.currentMenu
    this.$router.push(store.getters.currentMenu)
  },
  data: function () {
    return {
      activeMenu: ''
    }
  },
  mounted () {
    /**
     * 将当前窗口高度保存至store，并当窗口大小变化时更新store中的窗口高度
     */
    store.commit('SET_WINDOWHEIGHT', document.body.clientHeight)
    window.onresize = () => {
      return (() => {
        store.commit('SET_WINDOWHEIGHT', document.body.clientHeight)
      })()
    }
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
    },
    selectMenu (name) {
      this.activeMenu = name
      store.commit('SET_CURRENTMENU', name)
    }
  }
}
</script>
