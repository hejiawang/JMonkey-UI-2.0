<template>
  <Modal v-model="isShow" title="批量导入一分一段表" :loading="loading" @on-ok="ok" @on-cancel="cancel" width="500" >
    1
  </Modal>
</template>
<script>
import moment from 'moment'

export default {
  name: 'IegGrade_Import',
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      loading: true,
      isShow: false
    }
  },
  created () {
    this.buildNowYear()
  },
  methods: {
    buildNowYear () {
      this.gradeForm.year = parseInt(moment(new Date()).format('YYYY'))
    },
    ok () {
      this.$refs.gradeForm.validate((valid) => {
        if (valid) {
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    cancel () {
      this.buildNowYear()

      this.isShow = false
    }
  }
}
</script>
