<template>
  <div class="cheader-user" :style="cheaderUserBackground">
    <Row class="photo">
      <Avatar shape="square" icon="ios-person" size="default" />
    </Row>
    <Row class="menu">
      <Dropdown @on-click="dropHandle">
        <a href="javascript:void(0)">
          超级管理员
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="userInfoHandle"><Icon type="md-person" /> 个人信息</DropdownItem>
          <DropdownItem name="modifyPWHandle"><Icon type="ios-lock-outline"></Icon> 修改密码</DropdownItem>
          <DropdownItem name="layoutHandle" divided style="color: #ed4014"><Icon type="md-power" /> 安全退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'CHeader_UserInfo',
  props: {
    system: {type: Boolean, default: true, required: false}
  },
  data () {
    return {
    }
  },
  computed: {
    cheaderUserBackground () {
      if (this.system) return 'background: #2b85e4'
      else return 'background: #0022d0'
    }
  },
  methods: {
    dropHandle (name) {
      this[name]()
    },
    userInfoHandle () {},
    modifyPWHandle () {},
    /**
     * 退出登录
     */
    layoutHandle () {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>
