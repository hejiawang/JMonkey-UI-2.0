<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="500">
    <Form ref="submitForm" :model="submitForm" :rules="submitRules" :label-width="90">
      <FormItem label="编码" prop="code">
        <Input type="text" v-model.trim="submitForm.code" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="描述" prop="describe">
        <Input type="text" v-model.trim="submitForm.describe" :maxlength="50" clearable />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/ieg/schoolSubmit'

export default {
  name: 'IegSchoolSubmit_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    schoolId: {type: String, default: '', required: true},
    submit: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑投档单位信息',
        'raise': '新增投档单位信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      submitForm: {
        code: null,
        describe: null
      },
      submitRules: {
        code: { required: true, message: '请输入投档单位编码', trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * ok handle
     */
    ok () {
      this.$refs.submitForm.validate((valid) => {
        if (valid) {
          this.submitForm.schoolId = this.schoolId
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * raise faculty
     */
    raise () {
      save(this.submitForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      modify(this.submitForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 操作成功
     * @param msg
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * close modal
     */
    cancel () {
      this.$refs.submitForm.resetFields()

      this.submitForm = {
        code: null,
        describe: null
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') this.submitForm = Object.assign({}, this.submit)
    }
  }
}
</script>
