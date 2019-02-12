<template>
  <Select v-model="dictValue" :multiple="multiple" v-if="type == 'select'" :disabled="disabled" clearable>
    <Option v-for="item in dictList" :value="item.value" :key="item.value">
      {{ item.lable }}
    </Option>
  </Select>

  <RadioGroup v-model="dictValue" v-else-if="type == 'radio' && !multiple">
    <Radio v-for="item in dictList" :label="item.value" :key="item.value" :disabled="disabled">
      {{ item.lable }}
    </Radio>
  </RadioGroup>

  <CheckboxGroup v-model="dictValue" v-else>
    <Checkbox v-for="item in dictList" :label="item.value" :key="item.value" :disabled="disabled">
      {{ item.lable }}
    </Checkbox>
  </CheckboxGroup>
</template>
<script>
import { findChildren } from '@/api/sys/dict'

/**
 * 字典组件——一级字典
 */
export default {
  name: 'CDict_Select',
  props: {
    value: {required: true}, // v-model
    dict: {type: String, default: '', required: true}, // 父字典value
    type: {type: String, default: 'select', required: false}, // 组件类型 select或radio 默认select
    multiple: {type: Boolean, default: false, required: false}, // 是否多选，默认false
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) { this.dictValue = val },
    dictValue (val) { this.$emit('input', val) }
  },
  mounted () {
    // 有默认值时
    this.dictValue = this.value
  },
  data () {
    return {
      dictValue: null,
      dictList: []
    }
  },
  created () {
    this.initDictList()
  },
  methods: {
    /**
     * 获取字典值
     */
    initDictList () {
      findChildren(this.dict).then(data => { this.dictList = data.result })
    }
  }
}
</script>
