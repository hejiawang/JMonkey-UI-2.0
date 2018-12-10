<template>
  <Drawer width="500" v-model="isShow">
    1
  </Drawer>
</template>
<script>
export default {
  name: 'SysRole_Authorize',
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  data () {
    return {
      isShow: false
    }
  }
}
</script>
