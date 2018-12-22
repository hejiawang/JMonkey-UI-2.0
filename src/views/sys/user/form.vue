<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="800">
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
            <Input type="text" v-model.trim="userForm.username" :maxlength="50" clearable />
          </FormItem>
          <FormItem label="登录密码" prop="password">
            <Input type="password" v-model.trim="userForm.password" :maxlength="20" clearable />
          </FormItem>
          <FormItem label="真实姓名" prop="realName">
            <Input type="text" v-model.trim="userForm.realName" :maxlength="50" clearable />
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
            <DatePicker type="date" v-model="userForm.birthday" style="width: 100%"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="40">
        <Col span="12">
          <FormItem label="用户角色" prop="roleIds">
            <CRole :multiple="true" v-model="userForm.roleIds" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="归属部门" prop="deptIds">
            <CDept v-model="userForm.deptIds[0]"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import CDept from '@/components/sys/dept'
import CRole from '@/components/sys/role'
import { checkUsername, save, modify } from '@/api/sys/user'

export default {
  name: 'SysUser_Form',
  components: { CDept, CRole },
  props: {
    value: {type: Boolean, default: false, required: true},
    userInfo: {type: Object, default: null, required: false},
    type: {type: String, default: 'View', required: true}
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
      if (!this.$CV.isEmpty(value) && !this.$CV.isPhone(value)) {
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
        birthday: '',
        photo: null,
        deptIds: [],
        roleIds: []
      },
      userRules: {
        username: { required: true, validator: validateUsername, trigger: 'blur' },
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        realName: { required: true, message: '请输入用户真实姓名', trigger: 'blur' },
        phone: [
          { required: false, message: '', trigger: 'blur' },
          { required: true, validator: validatePhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
    raise () {
      save(this.userForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    modify () {
      modify(this.userForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
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
        birthday: '',
        photo: null,
        deptIds: [],
        roleIds: []
      }

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
        p{
          font-size: 17px;
        }
      }
    }
    .ivu-radio-group-item{
      margin-left: 20px;
    }
  }
</style>
