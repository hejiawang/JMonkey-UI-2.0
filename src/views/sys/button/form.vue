<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="500">
    <Form ref="buttonForm" :model="buttonForm" :rules="buttonRules" :label-width="90">
      <FormItem label="上级资源">
        <Input type="text" v-model.trim="resource.name" readonly/>
      </FormItem>
      <FormItem label="按钮名称" prop="name">
        <Input type="text" v-model.trim="buttonForm.name" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="权限标识" prop="permission">
        <Input type="text" v-model.trim="buttonForm.permission" :maxlength="100" clearable />
      </FormItem>
      <FormItem label="请求链接" prop="url">
        <Input type="text" v-model.trim="buttonForm.url" :maxlength="100" clearable />
      </FormItem>
      <FormItem label="请求方式" prop="method">
        <RadioGroup v-model="buttonForm.method">
          <Radio label="Get">Get</Radio>
          <Radio label="Post">Post</Radio>
          <Radio label="Put">Put</Radio>
          <Radio label="Delete">Delete</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/sys/button'

export default {
  name: 'SysButton_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    button: {type: Object, default: null, required: false},
    resource: {type: Object, default: null, required: true}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑按钮信息',
        'raise': '新增按钮信息'
      }
      return titleAry[this.type]
    }
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      buttonForm: {
        name: '',
        permission: '',
        url: '',
        method: 'Get'
      },
      buttonRules: {
        name: {required: true, message: '请输入按钮名称', trigger: 'blur'}
      }
    }
  },
  methods: {
    /**
     * 弹出框【确定】事件
     */
    ok () {
      this.$refs.buttonForm.validate((valid) => {
        if (valid) {
          this.buttonForm.parentId = this.resource.id
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 新增按钮信息
     */
    raise () {
      save(this.buttonForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改按钮信息
     */
    modify () {
      modify(this.buttonForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 弹出框关闭事件
     * @param msg
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * 新增/修改按钮信息成功回调
     */
    cancel () {
      this.$refs.buttonForm.resetFields()
      this.buttonForm = {
        name: '',
        permission: '',
        url: '',
        method: 'Get'
      }
      this.isShow = false
    },
    /**
     * 弹出框显示事件
     * @param isOpen
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify' && !this.$CV.isEmpty(this.button)) {
        // 修改按钮信息时，将按钮历史信息赋值给form
        this.buttonForm = Object.assign({}, this.button)
      }
    }
  }
}
</script>
