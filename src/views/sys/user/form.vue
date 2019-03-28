<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="800">
    <Form ref="userForm" :model="userForm" :rules="userRules" :label-width="90" class="userForm">
      <Row  :gutter="32">
        <Col span="12">
          <CUploadImg v-model="userForm.photo" title="上传用户头像" action="/sys/user/uploadPhoto"/>
        </Col>
        <Col span="12">
          <FormItem label="用户名称" prop="username">
            <Input type="text" v-model.trim="userForm.username" :maxlength="50" :clearable="!disabled" :disabled="disabled"/>
          </FormItem>
          <FormItem label="登录密码" prop="password">
            <Input type="password" v-model.trim="userForm.password" :maxlength="20" :clearable="type != 'modify'" :disabled="type === 'modify'"/>
          </FormItem>
          <FormItem label="真实姓名" prop="realName">
            <Input type="text" v-model.trim="userForm.realName" :maxlength="5" clearable />
          </FormItem>
          <FormItem label="手机号码" prop="phone">
            <Input type="text" v-model.trim="userForm.phone" :maxlength="11" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="40">
        <Col span="12">
          <FormItem label="用户性别" prop="sex">
            <RadioGroup v-model="userForm.sex">
              <Radio label="Man">男</Radio>
              <Radio label="Woman">女</Radio>
              <Radio label="Other">其他</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="出生日期" prop="birthday">
            <DatePicker type="date" v-model="userForm.birthday" style="width: 100%" />
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="40">
        <Col span="12">
          <FormItem label="用户角色" prop="roleIds">
            <CRole :multiple="true" v-model="userForm.roleIds" :disabled="disabled"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="归属部门" prop="deptIds">
            <CDept v-model="userForm.deptIds[0]" :disabled="disabled"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import CDept from '@/components/sys/dept'
import CRole from '@/components/sys/role'
import CUploadImg from '@/components/layout/uploadImg'
import { checkUsername, save, modify } from '@/api/sys/user'

export default {
  name: 'SysUser_Form',
  components: { CDept, CRole, CUploadImg },
  props: {
    value: {type: Boolean, default: false, required: true},
    userInfo: {type: Object, default: null, required: false},
    type: {type: String, default: 'raise', required: true},
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑用户信息',
        'raise': '新增用户信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    /**
     * 校验用户名是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validateUsername = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入用户名称'))
      } else {
        let id = this.userForm.id ? this.userForm.id : null
        checkUsername(id, value).then(data => {
          if (data.result) callback(new Error('用户名称已存在'))
          else callback()
        })
      }
    }

    /**
     *
     * @param rule
     * @param value
     * @param callback
     */
    const validatePhone = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入手机号码'))
      } else if (!this.$CV.isPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }

    return {
      loading: true,
      isShow: false,
      userForm: {
        id: null,
        username: null,
        password: '123456',
        realName: null,
        phone: null,
        sex: 'Man',
        birthday: null,
        photo: null,
        deptIds: [],
        roleIds: []
      },
      userRules: {
        username: { required: true, validator: validateUsername, trigger: 'blur' },
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 100, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        realName: { required: true, message: '请输入用户真实姓名', trigger: 'blur' },
        phone: { required: true, validator: validatePhone, trigger: 'blur' },
        birthday: { required: true, type: 'date', message: '请输入出生日期', trigger: 'change' }
      }
    }
  },
  methods: {
    /**
     * modal 确定事件
     */
    ok () {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 新增用户
     */
    raise () {
      save(this.userForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改用户信息
     */
    modify () {
      modify(this.userForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 操作后
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * 关闭modal
     */
    cancel () {
      this.$refs.userForm.resetFields()

      // TODO 怎么才能改进呢？？？
      this.userForm = {
        id: null,
        username: null,
        password: '123456',
        realName: null,
        phone: null,
        sex: 'Man',
        birthday: null,
        photo: null,
        deptIds: [],
        roleIds: []
      }

      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.userForm = Object.assign({}, this.userInfo)
      }
    }
  }
}
</script>
<style lang="scss">
  .userForm{
    .ivu-radio-group-item{
      margin-left: 20px;
    }
  }
</style>
