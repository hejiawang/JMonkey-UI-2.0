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
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      console.info(1)
      console.info(this.value)
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
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

      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)

      onEvent(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    offEvent(window, 'resize', this.resize)
  }
}
</script>
