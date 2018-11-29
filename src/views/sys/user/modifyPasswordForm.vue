<template>
  <Modal v-model="isShow" :title="title" @on-ok="ok" @on-cancel="cancel" :styles="{'top':'30%'}">
    <Form ref="passwordForm" :model="passwordForm" :rules="passwordRules" :label-width="90">
      <FormItem label="修改密码" prop="nowPassword">
        <Input type="text" v-model="passwordForm.nowPassword" />
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Input type="text" v-model="passwordForm.confirmPassword" />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'SysUser_ModifyPasswordForm',
  props: {
    value: {type: Boolean, default: false, required: true},
    userId: {type: String, default: '', required: true},
    userName: {type: String, default: '', required: false}
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
    title: function () {
      let t = '修改密码'
      if (!this.$CV.isEmpty(this.userName)) t = t + '（用户名称：' + this.userName + '）'
      return t
    }
  },
  data: function () {
    return {
      isShow: false,
      passwordForm: {
        nowPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        nowPassword: [
          { required: true, message: '请输入修改密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ok () {
      this.$Message.success('修改成功')
      this.cancel()
    },
    cancel () {
      this.$refs.passwordForm.resetFields()
      this.isShow = false
    }
  }
}
</script>
