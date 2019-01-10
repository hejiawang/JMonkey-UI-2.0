<template>
  <div class="cheader-user" :style="cheaderUserBackground">
    <Row class="photo">
      <Avatar v-if="currenUser.photo" shape="square" size="default" :src="website.filePath + currenUser.photo" />
      <Avatar v-else shape="square" icon="ios-person" size="default" />
    </Row>
    <Row class="menu">
      <Dropdown @on-click="dropHandle">
        <a href="javascript:void(0)">
          {{currenUser.realName}}
          <Icon type="ios-arrow-down" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="userInfoHandle"><Icon type="md-person" /> 个人信息</DropdownItem>
          <DropdownItem name="modifyPWHandle"><Icon type="ios-lock-outline"></Icon> 修改密码</DropdownItem>
          <DropdownItem name="layoutHandle" divided style="color: #ed4014"><Icon type="md-power" /> 安全退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Row>

    <!-- 修改用户密码 -->
    <CModifyPassword v-model="showModifyPassword" :userId="currenUser.id" :userName="currenUser.username" />

    <!-- 修改用户信息 -->
    <CUserForm v-model="showForm" :userInfo="currenUser" type="modify" :disabled="true" @refresh="reLogin" />
  </div>
</template>
<script>
import store from '@/store'
import CModifyPassword from '@/views/sys/user/modifyPasswordForm'
import CUserForm from '@/views/sys/user/form'
import { mapGetters } from 'vuex'

export default {
  name: 'CHeader_UserInfo',
  components: {
    CModifyPassword, CUserForm
  },
  props: {
    system: {type: Boolean, default: true, required: false}
  },
  data () {
    return {
      showForm: false,
      showModifyPassword: false
    }
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * guide页与index页显示的背景色不同
     */
    cheaderUserBackground () {
      if (this.system) return 'background: #2b85e4'
      else return 'background: none'
    },
    /**
     * 获取当前登录用户
     */
    currenUser () {
      let userDto = Object.assign({}, store.getters.user)

      let deptIds = []
      store.getters.deptList.forEach(dept => { deptIds.push(dept.id) })
      userDto.deptIds = deptIds

      let roleIds = []
      store.getters.roleList.forEach(role => { roleIds.push(role.id) })
      userDto.roleIds = roleIds

      return userDto
    }
  },
  methods: {
    dropHandle (name) {
      this[name]()
    },
    userInfoHandle () {
      this.showForm = true
    },
    /**
     * 修改登陆密码
     * TODO 应该重新登陆
     */
    modifyPWHandle () {
      this.showModifyPassword = true
    },
    /**
     * 退出登录
     */
    layoutHandle () {
      this.$store.dispatch('LogOut').then(() => { this.$router.push({ path: '/login' }) })
    },
    /**
     * 修改个人信息成功后重新登陆
     * TODO 交互方式有待改进
     */
    reLogin () {
      this.$Message.success('请重新登陆')
      this.layoutHandle()
    }
  }
}
</script>
