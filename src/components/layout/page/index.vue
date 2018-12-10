<template>
  <Page :total="listQuery.total" :current="listQuery.current" :page-size="listQuery.size" @on-change="changeCurrent" @on-page-size-change="changePageSize" show-sizer show-elevator show-total></Page>
</template>
<script>
export default {
  name: 'CPage',
  props: {
    value: {
      default: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  data: function () {
    return {
      listQuery: {}
    }
  },
  watch: {
    value (val) {
      this.listQuery = val
    },
    listQuery (val) {
      this.$emit('input', val)
    }
  },
  created () {
  },
  methods: {
    changeCurrent (current) {
      this.listQuery.current = current
      this.$emit('on-list', '')
    },
    changePageSize (pageSize) {
      this.listQuery.size = pageSize
      this.$emit('on-list', '')
    }
  }
}
</script>
