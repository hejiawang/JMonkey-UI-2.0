<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="600">
    <Form ref="dataScopeForm" :model="dataScopeForm" :rules="dataScopeRules" :label-width="90">
      <FormItem label="规则名称" prop="name">
        <Input type="text" v-model.trim="dataScopeForm.name" :maxlength="50"/>
      </FormItem>
      <FormItem label="拦截路径" prop="url">
        <Input type="text" v-model.trim="dataScopeForm.url" :maxlength="100"/>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { save, modify, checkName, checkUrl } from '@/api/sys/dataScope'

export default {
  name: 'SysDataScope_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    dataScope: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑数据规则',
        'raise': '新增数据规则'
      }
      return titleAry[this.type]
    }
  },
  data () {
    /**
     * 校验名称是否重复
     * @param rule
     * @param value
     * @param callback
     */
    const validateName = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入规则名称'))
      } else {
        let id = this.dataScopeForm.id ? this.dataScopeForm.id : null
        checkName(id, value).then(data => {
          if (data.result) callback(new Error('规则名称已存在'))
          else callback()
        })
      }
    }

    /**
     * 校验拦截路径是否重复
     * @param rule
     * @param value
     * @param callback
     */
    const validateUrl = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入拦截路径'))
      } else {
        let id = this.dataScopeForm.id ? this.dataScopeForm.id : null
        checkUrl(id, value).then(data => {
          if (data.result) callback(new Error('拦截路径已存在'))
          else callback()
        })
      }
    }

    return {
      loading: true,
      isShow: false,
      dataScopeForm: {
        name: null,
        url: null
      },
      dataScopeRules: {
        name: { required: true, validator: validateName, trigger: 'blur' },
        url: { required: true, validator: validateUrl, trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * modal 确定事件
     */
    ok () {
      this.$refs.dataScopeForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 新增
     */
    raise () {
      save(this.dataScopeForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改
     */
    modify () {
      modify(this.dataScopeForm).then(data => {
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
      this.$refs.dataScopeForm.resetFields()

      this.dataScopeForm = {
        name: null,
        url: null
      }

      this.isShow = false
    },
    /**
     * madel visible Change
     * @param isOpen true 打开
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.dataScopeForm = Object.assign({}, this.dataScope)
      }
    }
  }
}
</script>
