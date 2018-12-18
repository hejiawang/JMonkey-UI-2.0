<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
    <Form ref="dictForm" :model="dictForm" :rules="dictRules" :label-width="90">
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
import { checkValue, save } from '@/api/sys/dict'

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
    type: {type: String, default: 'raise', required: true}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑字典信息',
        'raise': '新增字典信息'
      }
      return titleAry[this.type]
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
    raise () {
      save(this.dictForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    modify () {

    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.dictForm.resetFields()
      this.isShow = false
    },
    visibleChange () {}
  }
}
</script>
