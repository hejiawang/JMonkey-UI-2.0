<template>
  <Layout class="login">
    <Row style="position: absolute;top: 30%;left: 0; bottom: 0; right: 0;">
      <Col offset="15" span="5">
        <Card class="animated fadeInRight">
          <p slot="title" style="color: #2d8cf0">
            欢迎登陆综合业务管理系统
          </p>
          <Form :model="loginForm">
            <FormItem prop="user">
              <Input type="text" v-model="loginForm.username" prefix="ios-person-outline" placeholder="请输入登陆名称" />
            </FormItem>
            <FormItem prop="password">
              <Input type="password" suffix="ios-eye-outline" v-model="loginForm.password" prefix="ios-lock-outline" placeholder="请输入登陆密码" />
            </FormItem>
            <FormItem prop="password">
              <Row :gutter="6">
                <Col span="16">
                  <Input type="text" v-model="loginForm.password" prefix="logo-html5" placeholder="请输入验证码" />
                </Col>
                <Col span="8">
                  <img src="../../assets/images/login/code.jpg" alt="验证码" class="login-code-img"/>
                </Col>
              </Row>

            </FormItem>
            <FormItem>
              <Button type="primary" long>登陆</Button>
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
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
  @import '../../assets/css/login.scss';
</style>
