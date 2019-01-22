<template>
  <div ref="dom" class="charts chart-pie" />
</template>

<script>
import echarts from 'echarts'
import tdTheme from './style/theme.json'
import { onEvent, offEvent } from '@/utils/common'

echarts.registerTheme('tdTheme', tdTheme)

export default {
  name: 'ChartPie',
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
      let legend = this.value.map(_ => _.name)

      let option = {
        title: {
          text: this.text,
          subtext: this.subtext,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legend
        },
        series: [
          {
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
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
