<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1200" class="ieg-school-major-form">
    <Form ref="schoolMajorForm" :model="schoolMajorForm" :rules="schoolMajorRules" :label-width="120">
      1
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/ieg/schoolMajor'

export default {
  name: 'IegSchoolMajor_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    schoolId: {type: String, default: '', required: true},
    major: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑院校专业信息',
        'raise': '新增院校专业信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      schoolMajorForm: {
      },
      schoolMajorRules: {
      }
    }
  },
  methods: {
    /**
     * ok handle
     */
    ok () {
      this.$refs.schoolMajorForm.validate((valid) => {
        if (valid) {
          this.schoolMajorForm.schoolId = this.schoolId
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
      save(this.schoolMajorForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      modify(this.schoolMajorForm).then(data => {
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
      this.$refs.schoolMajorForm.resetFields()

      this.schoolMajorForm = {
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
    }
  }
}
</script>
