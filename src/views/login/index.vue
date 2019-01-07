<template>
  <Layout class="login">
    <Row class="content">
      <Col offset="9" span="6">
        <Card class="animated fadeInRight">
          <p slot="title">
            欢迎登陆综合业务管理系统
          </p>
          <Form  ref="loginForm" :rules="loginRules" :model="loginForm">
            <FormItem prop="username">
              <Input type="text" v-model.trim="loginForm.username" :maxlength="50" prefix="ios-person-outline" placeholder="请输入登陆名称" />
            </FormItem>
            <FormItem prop="password">
              <Input :type="pwType" suffix="ios-eye-outline" v-model.trim="loginForm.password" :maxlength="20" prefix="ios-lock-outline" placeholder="请输入登陆密码" >
                <Icon slot="suffix" type="md-eye" @click="changePWType"/>
              </Input>
            </FormItem>
            <FormItem prop="code" v-if="isCode">
              <Row :gutter="6">
                <Col span="16">
                  <Input type="text" v-model="loginForm.code" prefix="logo-html5" placeholder="请输入验证码" />
                </Col>
                <Col span="8">
                  <img src="../../assets/images/login/code.jpg" alt="验证码" class="login-code-img"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" long @click="loginHandle" :disabled="isDisabled">登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 陆</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      isDisabled: false,
      isCode: false,
      pwType: 'password',
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      loginRules: {
        username: {required: true, message: '请输入登陆名称', trigger: 'blur'},
        password: {required: true, message: '请输入登陆密码', trigger: 'blur'}
      }
    }
  },
  created () {
  },
  methods: {
    /**
     * 修改密码输入框可见类型
     */
    changePWType () {
      this.pwType = this.pwType === 'password' ? 'test' : 'password'
    },
    /**
     * 登陆
     */
    loginHandle () {
      this.isDisabled = true

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(
            res => {
              this.$router.push({path: '/'})
              // this.$router.push({path: '/guide'})
            },
            error => { // eslint-disable-line
              this.isDisabled = false
            }
          )
        } else {
          this.isDisabled = false
        }
      })
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/login.scss';
</style>
