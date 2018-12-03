<template>
  <Layout>
    <Header> </Header>
    <Layout>
      <Sider hide-trigger >
        <Menu active-name="0" theme="light" width="auto" accordion :open-names="['0']">
          <MenuItem name="0" to="/home">
            <icon type="ios-navigate"></icon>
            首页
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              系统设置
            </template>
            <MenuItem name="1-1" to="/sys/user">用户管理</MenuItem>
            <MenuItem name="1-2" to="/sys/role">角色管理</MenuItem>
            <MenuItem name="1-3" to="/sys/dept">部门管理</MenuItem>
            <MenuItem name="1-4" to="/sys/button">按钮管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </template>
            <MenuItem name="2-1"> Option 1 </MenuItem>
            <MenuItem name="2-2">  Option 2 </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <!--<Breadcrumb>
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>-->

        <Tabs  type="card" closable class="app-layout-tabs">
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
export default {
  name: 'LayoutMain',
  created () {
    this.$router.push('/home')
  }
}
</script>
