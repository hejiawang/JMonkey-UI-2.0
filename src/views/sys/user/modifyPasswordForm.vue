<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :styles="{'top':'30%'}">
    <Form ref="passwordForm" :model="passwordForm" :rules="passwordRules" :label-width="90">
      <FormItem label="修改密码" prop="nowPassword">
        <Input type="password" v-model="passwordForm.nowPassword" :maxlength="20"/>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Input type="password" v-model="passwordForm.confirmPassword" :maxlength="20"/>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { modifyPassword } from '@/api/sys/user'

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
    title () {
      let t = '修改密码'
      if (!this.$CV.isEmpty(this.userName)) t = t + '（用户名称：' + this.userName + '）'
      return t
    }
  },
  data () {
    const validConfirmPassword = (rule, value, callback) => {
      if (value !== this.passwordForm.nowPassword) callback(new Error('两次输入密码不一致!'))
      else callback()
    }

    return {
      loading: true,
      isShow: false,
      passwordForm: {
        nowPassword: null,
        confirmPassword: null
      },
      passwordRules: {
        nowPassword: [
          { required: true, message: '请输入修改密码', trigger: 'blur' },
          { min: 6, max: 100, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 6, max: 100, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 修改密码
     */
    ok () {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          modifyPassword(this.userId, this.passwordForm.nowPassword).then(data => {
            if (data.isSuccess) {
              this.$Message.success('修改成功')
              this.cancel()
            }
          })
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 关闭修改密码的弹出框
     */
    cancel () {
      this.$refs.passwordForm.resetFields()
      this.passwordForm = {
        nowPassword: null,
        confirmPassword: null
      }

      this.isShow = false
    }
  }
}
</script>
