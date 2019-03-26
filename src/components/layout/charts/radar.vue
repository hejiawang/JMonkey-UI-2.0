<template>
  <div ref="dom" class="charts chart-circle" />
</template>

<script>
import echarts from 'echarts'
import tdTheme from './style/theme.json'
import { onEvent, offEvent } from '@/utils/common'

echarts.registerTheme('tdTheme', tdTheme)

export default {
  name: 'ChartRadar',
  props: {
    value: Array,
    indicator: Array,
    text: String,
    subtext: String,
    hint: String
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
          subtext: this.subtext
        },
        tooltip: {
          trigger: 'item'
        },
        polar: [
          {
            indicator: this.indicator
          }
        ],
        calculable: true,
        series: [
          {
            name: this.text,
            type: 'radar',
            data: [
              {
                value: this.value,
                name: this.hint
              }
            ]
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
