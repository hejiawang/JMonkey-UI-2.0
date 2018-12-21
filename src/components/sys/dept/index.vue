<template>
  <Row>
    <Input type="text" v-model="deptName" icon="ios-close" @on-focus="showDeptTree" @on-click="clearDept" readonly/>

    <Modal v-model="isShow" :title="title" @on-visible-change="visibleChange" footer-hide>
      <Tree :data="treeDate" ref="deptTree" @on-select-change="selectDept"/>
    </Modal>
  </Row>
</template>
<script>
import { find, tree } from '@/api/sys/dept'
import { converKey } from '@/utils/common'

export default {
  name: 'CDept',
  props: {
    value: {type: String, default: null, required: false},
    title: {type: String, default: '请选择部门', required: false}
  },
  watch: {
    value (val) {
      this.deptId = val

      if (this.$CV.isEmpty(val)) {
        this.deptName = null
      } else {
        find(val).then(data => {
          this.deptName = data.result.name
        })
      }
    },
    deptId (val) { this.$emit('input', val) }
  },
  computed: {
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.deptTreeDate) ? this.deptTreeDate : [this.deptTreeDate]
      return converKey(tmpTreeData)
    }
  },
  data: function () {
    return {
      deptId: null,
      deptName: null,
      isShow: false,
      deptTreeDate: []
    }
  },
  methods: {
    visibleChange (isOpen) {
      if (isOpen) {
        tree().then(data => {
          this.deptTreeDate = data.result
        })
      }
    },
    selectDept (row) {
      this.deptId = row[0].id; this.deptName = row[0].name
      this.isShow = false
    },
    clearDept () {
      this.deptId = null; this.deptName = null
    },
    showDeptTree () {
      this.isShow = true
    }
  }
}
</script>
