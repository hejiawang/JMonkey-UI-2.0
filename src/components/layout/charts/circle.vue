<template>
  <div ref="dom" class="charts chart-circle" />
</template>

<script>
import echarts from 'echarts'
import tdTheme from './style/theme.json'
import { onEvent, offEvent } from '@/utils/common'

echarts.registerTheme('tdTheme', tdTheme)

export default {
  name: 'ChartCircle',
  props: {
    value: Array,
    text: String,
    subtext: String
  },
  watch: {
    value (val) {
      this.resize()
    }
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      onEvent(window, 'resize', this.resize)

      this.init()
    })
  },
  methods: {
    resize () {
      this.init()
      this.dom.resize()
    },
    init () {
      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {d}%'
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: this.value,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      this.dom.setOption(option)
    }
  },
  beforeDestroy () {
    offEvent(window, 'resize', this.resize)
  }
}
</script>
