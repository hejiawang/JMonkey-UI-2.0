<template>
  <Select v-model="roleIds" style="width:100%" :multiple="multiple" clearable :disabled="disabled" >
    <Option v-for="r in roleListData" :key="r.id" :value="r.id" >{{r.name}}</Option>
  </Select>
</template>
<script>
import { listAll } from '@/api/sys/role'

/**
 * 选择角色组件， multiple是否为多选
 */
export default {
  name: 'CRole',
  props: {
    value: {},
    multiple: {type: Boolean, default: false, required: false},
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) { this.roleIds = val },
    roleIds (val) { this.$emit('input', val) }
  },
  data: function () {
    return {
      roleIds: null,
      roleListData: []
    }
  },
  created () {
    this.initRoleList()
  },
  methods: {
    initRoleList () {
      listAll().then(data => { this.roleListData = data.result })
    }
  }
}
</script>
