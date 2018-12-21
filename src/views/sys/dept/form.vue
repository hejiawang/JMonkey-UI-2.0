<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
    <Form ref="deptForm" :model="deptForm" :rules="deptRules" :label-width="90">
      <FormItem label="上级部门" prop="parentId">
        <CDept v-model="deptForm.parentId"/>
      </FormItem>
      <FormItem label="部门名称" prop="name">
        <Input type="text" v-model.trim="deptForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="部门编码" prop="code">
        <Input type="text" v-model.trim="deptForm.code" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="字典排序" prop="sort">
        <InputNumber :max="1000" :min="1" v-model="deptForm.sort" style="width: 100%"/>
      </FormItem>
      <FormItem label="备注"  prop="remark">
        <Input type="textarea" :rows="4" v-model.trim="deptForm.remark" :maxlength="100" clearable />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import CDept from '@/components/sys/dept'
import { checkCode, save, modify } from '@/api/sys/dept'

export default {
  name: 'SysDept_Form',
  components: { CDept },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    currentDept: {type: Object, default: null, required: false}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑部门信息',
        'raise': '新增部门信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    /**
     * 校验部门编码是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validateCode = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入部门编码'))
      } else {
        let id = this.deptForm.id ? this.deptForm.id : null
        checkCode(id, value).then(data => {
          if (data.result) callback(new Error('部门编码已存在'))
          else callback()
        })
      }
    }

    return {
      loading: true,
      isShow: false,
      deptForm: {
        parentId: null,
        name: null,
        code: null,
        sort: 1,
        remark: null
      },
      deptRules: {
        name: {required: true, message: '请输入部门名称', trigger: 'blur'},
        code: {required: true, validator: validateCode, trigger: 'blur'}
      }
    }
  },
  methods: {
    /**
     * 确定键事件
     */
    ok () {
      this.$refs.deptForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 新增部门信息
     */
    raise () {
      save(this.deptForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改部门信息
     */
    modify () {
      modify(this.deptForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 操作后回调
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * 关闭form
     */
    cancel () {
      this.$refs.deptForm.resetFields()
      this.deptForm = {
        parentId: null,
        name: null,
        code: null,
        sort: 1,
        remark: null
      }
      this.isShow = false
    },
    /**
     * modal显示/隐藏变化回调
     * @param isOpen
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.deptForm = Object.assign({}, this.currentDept)
      }
    }
  }
}
</script>
