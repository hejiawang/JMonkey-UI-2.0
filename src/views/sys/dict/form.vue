<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" :ok-text="okTest" @on-cancel="cancel" @on-visible-change="visibleChange">
    <Form ref="dictForm" :model="dictForm" :rules="dictRules" :label-width="90">
      <FormItem label="上级字典" v-if="dictForm.parentId">
        <Input type="text" v-model="dictForm.parentLable" readonly/>
      </FormItem>
      <FormItem label="字典标签" prop="lable">
        <Input type="text" v-model.trim="dictForm.lable" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="字典键值" prop="value">
        <Input type="text" v-model.trim="dictForm.value" :maxlength="100" clearable />
      </FormItem>
      <FormItem label="字典排序" prop="sort">
        <InputNumber :max="1000" :min="1" v-model="dictForm.sort" style="width: 100%"/>
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="textarea" :rows="4" v-model.trim="dictForm.remark" :maxlength="100" clearable />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { checkValue, save, find, modify } from '@/api/sys/dict'

export default {
  name: 'SysDict_Form',
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    parent: {type: Object, default: null, required: false},
    modifyId: {type: String, default: null, required: false}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑字典信息',
        'raise': '新增字典信息'
      }
      return titleAry[this.type]
    },
    okTest () {
      if (!this.$CV.isEmpty(this.parent) && this.type === 'raise') return '新增并继续'
      else return '确定'
    }
  },
  data () {
    const validateValue = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入字典键值'))
      } else {
        let id = this.dictForm.id ? this.dictForm.id : null
        checkValue(id, value).then(data => {
          if (data.result) callback(new Error('字典键值已存在'))
          else callback()
        })
      }
    }

    return {
      loading: true,
      isShow: false,
      dictForm: {
        parentId: null,
        parentLable: null,
        lable: null,
        value: null,
        sort: 1,
        remark: null
      },
      dictRules: {
        lable: { required: true, message: '请输入字典标签', trigger: 'blur' },
        value: {required: true, validator: validateValue, trigger: 'blur'}
      }
    }
  },
  methods: {
    /**
     * 确定键事件
     */
    ok () {
      this.$refs.dictForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 新增字典
     */
    raise () {
      save(this.dictForm).then(data => {
        if (data.isSuccess) {
          if (!this.$CV.isEmpty(this.parent)) {
            // 如果是添加下级字典信息，添加成功后清空内容，继续添加
            this.$Message.success('新增成功')
            this.dictForm.lable = null; this.dictForm.value = null; this.dictForm.remark = null

            // 除了自定义按钮，没有找到好的方法
            this.loading = false
            this.$nextTick(() => { this.loading = true })
          } else {
            this.callBack('新增成功')
          }
        }
      })
    },
    /**
     * 修改字典
     */
    modify () {
      modify(this.dictForm).then(data => {
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
      this.$refs.dictForm.resetFields()
      this.dictForm = {
        parentId: null,
        parentLable: null,
        lable: null,
        value: null,
        sort: 1,
        remark: null
      }
      this.isShow = false

      // 新增并继续后，关闭时刷新list
      if (!this.$CV.isEmpty(this.parent)) this.$emit('refresh', '')
    },
    /**
     * modal显示/隐藏变化回调
     * @param isOpen
     */
    visibleChange (isOpen) {
      if (isOpen) {
        // 如果是添加下一级字典，获取上级字典信息
        this.dictForm.parentId = this.parent ? this.parent.id : null
        this.dictForm.parentLable = this.parent ? this.parent.lable : null

        // 如果是修改字典信息，先获取字典信息
        if (this.type === 'modify') {
          find(this.modifyId).then(data => { this.dictForm = data.result })
        }
      }
    }
  }
}
</script>
