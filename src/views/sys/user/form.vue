<template>
  <Modal v-model="isShow" :title="title" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="800">
    <Form ref="userForm" :model="userForm" :rules="userRules" :label-width="90" class="userForm">
      <Row  :gutter="32">
        <Col span="12" class="userForm-upload">
          <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/" :show-upload-list="false">
            <div class="userForm-upload-context">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>上传用户头像</p>
            </div>
          </Upload>
        </Col>
        <Col span="12">
          <FormItem label="用户名称" prop="username">
            <Input type="text" v-model="userForm.username" clearable />
          </FormItem>
          <FormItem label="登录密码" prop="username">
            <Input type="password" v-model="userForm.password" clearable />
          </FormItem>
          <FormItem label="真实姓名" prop="username">
            <Input type="text" v-model="userForm.realName" clearable />
          </FormItem>
          <FormItem label="手机号码" prop="username">
            <Input type="text" v-model="userForm.phone" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="40">
        <Col span="12">
          <FormItem label="用户性别">
            <RadioGroup v-model="userForm.sex">
              <Radio label="Man">男</Radio>
              <Radio label="Woman">女</Radio>
              <Radio label="Other">其他</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="出生日期">
            <DatePicker type="date" v-model="userForm.birthday" style="width: 100%"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="40">
        <Col span="12">
          <FormItem label="用户角色">
            <Select v-model="userForm.phone" style="width:100%">
              <Option value="admin" >超级管理员</Option>
              <Option value="common" >普通用户</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="归属部门">
            <Input type="text" v-model="userForm.phone" clearable />
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'SysUser_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    userInfo: {type: Object, default: null, required: false},
    type: {type: String, default: 'View', required: true}
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    title () {
      let titleAry = {
        'View': '查看用户信息',
        'Modify': '编辑用户信息',
        'Raise': '新增用户信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      isShow: false,
      userForm: {
        id: '',
        username: '',
        password: '123456',
        realName: '',
        phone: '',
        sex: 'Man',
        birthday: '',
        photo: ''
      },
      userRules: {
        username: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ok () {
      this.$emit('refresh', '')
      this.isShow = false
    },
    cancel () {
      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen) {
        console.info(this.userInfo)
      }
    }
  }
}
</script>
<style lang="scss">
  .userForm{
    .userForm-upload{
      .ivu-upload .ivu-upload-drag{
        height: 220px;
      }
      .userForm-upload-context{
        padding: 20px 0;
        margin-top: 50px;
      }
    }
    .ivu-radio-group-item{
      margin-left: 20px;
    }
  }
</style>
