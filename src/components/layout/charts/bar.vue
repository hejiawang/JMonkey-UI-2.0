<template>
  <div ref="dom" class="charts chart-bar" />
</template>

<script>
import echarts from 'echarts'
import tdTheme from './style/theme.json'
import { onEvent, offEvent } from '@/utils/common'

echarts.registerTheme('tdTheme', tdTheme)

export default {
  name: 'ChartBar',
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
    /**
     * 初始化EChart
     */
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      onEvent(window, 'resize', this.resize)

      this.init()
    })
  },
  methods: {
    /**
     * 初始化柱状图
     */
    init () {
      let xAxisData = this.value.map(_ => _.name)
      let seriesData = this.value.map(_ => _.value)

      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar'
        }]
      }

      this.dom.setOption(option)
    },
    /**
     * 当窗口变化或重新赋值后调用
     */
    resize () {
      this.init()
      this.dom.resize()
    }
  },
  beforeDestroy () {
    offEvent(window, 'resize', this.resize)
  }
}
</script>
