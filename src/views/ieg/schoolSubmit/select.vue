<template>
  <Select v-model="submitId" style="width:100%" clearable >
    <Option v-for="f in submitList" :key="f.id" :value="f.id" >{{f.code}}</Option>
  </Select>
</template>
<script>
import { list } from '@/api/ieg/schoolSubmit'
export default {
  name: 'CIegSubmitSelect',
  props: {
    value: {type: String, default: '', required: true},
    schoolId: {type: String, default: '', required: true}
  },
  watch: {
    value (val) { this.submitId = val },
    submitId (val) { this.$emit('input', val) }
  },
  data: function () {
    return {
      submitId: null,
      submitList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      list({schoolId: this.schoolId}).then(data => {
        this.submitList = data.result
      })
    }
  }
}
</script>
