<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="700">
    <Form ref="buttonForm" :model="buttonForm" :rules="buttonRules" :label-width="90">
      1
    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'SysButton_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true}
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
      buttonForm: {},
      buttonRules: {}
    }
  },
  methods: {
    ok () {
      this.$refs.buttonForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    raise () {

    },
    modify () {

    },
    cancel () {
      this.$refs.buttonForm.resetFields()
      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen) {
      }
    }
  }
}
</script>
