<template>
  <Drawer title="聊天记录" width="600" v-model="isShow">
    1
  </Drawer>
</template>
<script>
/**
 * 聊天历史纪录
 */
export default {
  name: 'CChatHistoryList',
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {

  }
}
</script>
