<template>
  <Select v-model="facultyId" style="width:100%" clearable >
    <Option v-for="f in facultyList" :key="f.id" :value="f.id" >{{f.name}}</Option>
  </Select>
</template>
<script>
import { list } from '@/api/ieg/faculty'

export default {
  name: 'CIegFacultySelect',
  props: {
    value: {type: String, default: '', required: true},
    schoolId: {type: String, default: '', required: true}
  },
  watch: {
    value (val) { this.facultyId = val },
    facultyId (val) { this.$emit('input', val) }
  },
  data: function () {
    return {
      facultyId: null,
      facultyList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      list({schoolId: this.schoolId}).then(data => {
        this.facultyList = data.result
      })
    }
  }
}
</script>
