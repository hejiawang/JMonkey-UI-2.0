<template>
  <Layout class="login">
    <Row class="content">
      <Col offset="9" span="6">
        <Card class="animated fadeInRight">
          <p slot="title"> {{website.title.login}} </p>
          <div class="login_aiwrap"/>
          <Form ref="loginForm" :rules="loginRules" :model="loginForm">
            <FormItem prop="username">
              <Input type="text" v-model.trim="loginForm.username" :maxlength="50" @keyup.enter.native="loginHandle"
                     :autofocus="true" prefix="ios-person-outline" placeholder="请输入登陆名称" />
            </FormItem>
            <FormItem prop="password">
              <Input :type="pwType" suffix="ios-eye-outline" v-model.trim="loginForm.password" :maxlength="20"
                     @keyup.enter.native="loginHandle" prefix="ios-lock-outline" placeholder="请输入登陆密码" >
                <Icon slot="suffix" type="md-eye" @click="changePWType"/>
              </Input>
            </FormItem>
            <FormItem prop="code" v-show="isCode">
              <Row :gutter="6">
                <Col span="16">
                  <Input type="text" v-model="loginForm.code" prefix="logo-html5" @keyup.enter.native="loginHandle"
                         placeholder="请输入验证码" />
                </Col>
                <Col span="8">
                  <img :src="codePath" alt="验证码" @click="refreshCode" class="login-code-img"/>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" long @click="loginHandle" :loading="isDisabled" >登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 陆</Button>
            </FormItem>
          </Form>
        </Card>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import { loginErrorNum } from '@/api/sys/user'
import { randomLenNum } from '@/utils/common'

export default {
  name: 'Login',
  computed: {
    ...mapGetters(['website'])
  },
  data () {
    /**
     * 校验是否需要输入验证码
     * @param rule
     * @param value
     * @param callback
     */
    const validateLoginError = (rule, value, callback) => {
      if (!this.$CV.isEmpty(this.loginForm.username)) {
        loginErrorNum(this.loginForm.username).then(data => {
          if (data.result >= 3) {
            this.isCode = true

            if (this.$CV.isEmpty(value)) callback(new Error('请输入验证码'))
            else callback()
          } else {
            callback()
          }
        })
      } else {
        callback()
      }
    }

    return {
      codePath: '',
      isDisabled: false,
      isCode: false,
      pwType: 'password',
      loginForm: {
        username: 'admin',
        password: '123456',
        code: '',
        randomStr: ''
      },
      loginRules: {
        username: {required: true, message: '请输入登陆名称', trigger: 'blur'},
        password: {required: true, message: '请输入登陆密码', trigger: 'blur'},
        code: [
          {required: false, validator: validateLoginError, trigger: 'blur'},
          {min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.refreshCode()
  },
  methods: {
    /**
     * 修改密码输入框可见类型
     */
    changePWType () {
      this.pwType = this.pwType === 'password' ? 'text' : 'password'
    },
    /**
     * 登陆
     */
    loginHandle () {
      this.isDisabled = true

      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          store.dispatch('LoginByUsername', this.loginForm).then(
            res => {
              if (store.getters.isGuide) this.$router.replace({path: '/guide'})
              else this.$router.replace({path: '/'})
            },
            error => { // eslint-disable-line
              this.isDisabled = false
              this.refreshCode()
            }
          )
        } else {
          this.isDisabled = false
        }
      })
    },
    /**
     * refreshCode
     */
    refreshCode () {
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(4, true)
      this.codePath = `/oauth/code/${this.loginForm.randomStr}`
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/login.scss';
</style>
