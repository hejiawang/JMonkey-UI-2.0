<template>
  <Drawer :title="drawerTitle" width="500" v-model="isShow"
          @on-visible-change="showDrawer" class="ieg-enroll-info">
    1
  </Drawer>
</template>
<script>
export default {
  name: 'IegEnrollInfo',
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    enroll: { required: true }
  },
  computed: {
    /**
     * 抽屉头部tile
     */
    drawerTitle () {
      if (this.$CV.isEmpty(this.enroll)) {
        return ''
      } else {
        return '投档分数线: ' +
          this.enroll.year + '年 ' +
          this.courseType[this.enroll.courseType] + ' ' +
          this.degreeType[this.enroll.degreeType] + ' ' +
          this.enrollType[this.enroll.enrollType]
      }
    }
  },
  data () {
    return {
      isShow: false,
      courseType: { W: '文科', L: '理科' },
      degreeType: { B: '本科', Z: '专科' },
      enrollType: { Common: '普通', Art: '艺术', Gym: '体育' }
    }
  },
  methods: {
    showDrawer (isOpen) {
      if (isOpen) {
      }
    }
  }
}
</script>
