<template>
  <Drawer title="系统信息列表" width="800" v-model="isShow" @on-visible-change="showDrawer" placement="left" class="app-message-list">
    1
  </Drawer>
</template>
<script>
export default {
  name: 'MessageView',
  props: {
    value: {type: Boolean, default: false, required: true},
    messageId: {type: String, default: '', required: true}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showDrawer (isOpen) {
    }
  }
}
</script>
