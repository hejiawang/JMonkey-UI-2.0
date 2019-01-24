<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" >

  </Modal>
</template>
<script>
export default {
  name: 'SysMenu_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑任务信息',
        'raise': '新增任务信息'
      }
      return titleAry[this.type]
    }
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
  methods: {
    ok () {},
    cancel () {},
    visibleChange (isOpen) {}
  }
}
</script>
