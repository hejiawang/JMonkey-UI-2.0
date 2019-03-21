<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="600">
    <Form ref="dataScopeRuleForm" :model="dataScopeRuleForm" :rules="dataScopeRuleRules" :label-width="90">
      <FormItem label="规则定义" prop="name">
        <Input type="text" v-model.trim="dataScopeRuleForm.name" :maxlength="50"/>
      </FormItem>
      <FormItem label="控制语句" prop="sqlSegment">
        <Input type="text" v-model.trim="dataScopeRuleForm.sqlSegment" :maxlength="500"/>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/sys/dataScopeRule'

export default {
  name: 'SysDataScopeRule_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    dataScopeRule: {type: Object, default: null, required: false},
    dataScopeId: {type: String, default: '', required: true}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑数据规则定义',
        'raise': '新增数据规则定义'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      dataScopeRuleForm: {
        name: null,
        sqlSegment: null
      },
      dataScopeRuleRules: {
        name: { required: true, message: '请输入数据规则定义名称', trigger: 'blur' },
        sqlSegment: { required: true, message: '请输入数据规则控制语句', trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * modal 确定事件
     */
    ok () {
      this.$refs.dataScopeRuleForm.validate((valid) => {
        if (valid) {
          this.dataScopeRuleForm.scopeId = this.dataScopeId

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
      save(this.dataScopeRuleForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改
     */
    modify () {
      modify(this.dataScopeRuleForm).then(data => {
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
      this.$refs.dataScopeRuleForm.resetFields()

      this.dataScopeRuleForm = {
        name: null,
        sqlSegment: null
      }

      this.isShow = false
    },
    /**
     * madel visible Change
     * @param isOpen true 打开
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.dataScopeRuleForm = Object.assign({}, this.dataScopeRule)
      }
    }
  }
}
</script>
