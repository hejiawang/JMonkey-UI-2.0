<template>
  <Row :gutter="10">
    <Col :span="colSpan" v-for="index in steps" :key="index">
      <span style="height: 0px; width: 0px;display: none">{{temp}}</span>

      <Select v-model="dictValue[index - 1]" @on-change="changeDict($event, index)" clearable :disabled="disabled">
        <Option v-for="item in dictList(index - 1)" :value="item.value" :key="item.value">{{ item.lable }}</Option>
      </Select>
    </Col>
  </Row>
</template>
<script>
import { findChildren } from '@/api/sys/dict'

/**
 * 字典组件——级联字典.
 * 例子：<CDictCascader :steps="3" dict="1" v-model="dictVC"/>  data中的dictVC是数组
 * TODO 感觉不好
 */
export default {
  name: 'CDict_Cascader',
  props: {
    value: {required: true}, // v-model
    dict: {type: String, default: '', required: true}, // 父字典value
    steps: {type: Number, default: 1, required: false}, // 字典级数
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) { this.dictValue = val },
    /**
     * watch dict value
     */
    dictValue (val) {
      // TODO 在值变化时,已经赋值'', 为什么到这里变成 undefined
      val.forEach((v, i) => {
        if (typeof(v) === 'undefined') val[i] = '' // eslint-disable-line
      })

      this.$emit('input', val)
    }
  },
  computed: {
    /**
     * col span
     */
    colSpan () {
      return 24 / this.steps
    },
    dictList (index) {
      return function (index) {
        return this['dictList_' + index]
      }
    }
  },
  data () {
    return {
      temp: '',
      dictValue: []
    }
  },
  mounted () {
    this.mounteDictValue()
  },
  created () {
    this.initDictListStep()
    this.initDictList()
  },
  methods: {
    /**
     * vue mounted option
     */
    mounteDictValue () {
      this.dictValue = this.value

      // 是否设置默认值
      if (this.dictValue.length === 0) this.mounteDictValueNull()
      else this.mounteDictList()
    },
    /**
     * 如果没有初始值, 赋空值
     */
    mounteDictValueNull () {
      for (let i = 0; i < this.steps; i++) {
        this.dictValue.push('')
      }
    },
    /**
     * 如果有默认值, 初始化组件的dict list
     */
    mounteDictList () {
      for (let i = 1; i < this.steps; i++) {
        findChildren(this.dictValue[i - 1]).then(data => {
          this['dictList_' + i] = data.result
          this.temp = this.dictValue[i - 1]
        })
      }
    },
    /**
     * init dict list null
     */
    initDictListStep () {
      for (let i = 0; i < this.steps; i++) {
        this['dictList_' + i] = []
      }
    },
    /**
     * 获取字典值
     */
    initDictList () {
      findChildren(this.dict).then(data => {
        this['dictList_0'] = data.result
        this.temp = this.dict
      })
    },
    /**
     * select点击事件,组件的核心事件
     * @param value
     * @param index
     */
    changeDict (value, index) {
      // 如果是最后一个select, 无需有任何操作
      if (index >= this.steps) return

      // 将之后的select清空
      for (let i = index; i < this.steps; i++) {
        this['dictList_' + i] = []
        this.dictValue[i] = ''
      }

      // 为下一个select赋值
      findChildren(value).then(data => {
        this['dictList_' + index] = data.result

        // TODO 由于代码实现问题, 数据变化后不能重新渲染页面,所以在这里让页面渲染
        this.temp = value
      })
    }
  }
}
</script>
