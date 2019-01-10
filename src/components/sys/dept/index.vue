<template>
  <Row>
    <Input type="text" v-model="deptName" icon="ios-close" @on-focus="showDeptTree" @on-click="clearDept" readonly :disabled="disabled"/>

    <Modal v-model="isShow" :title="title" @on-visible-change="visibleChange" footer-hide>
      <Tree :data="treeDate" ref="deptTree" @on-select-change="selectDept"/>
    </Modal>
  </Row>
</template>
<script>
import { find, tree } from '@/api/sys/dept'
import { converKey } from '@/utils/common'

/**
 * 选择部门组件
 */
export default {
  name: 'CDept',
  props: {
    value: {type: String, default: null, required: false},
    title: {type: String, default: '请选择部门', required: false},
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) {
      this.deptId = val

      // 根据部门id，对部门名称赋值
      if (this.$CV.isEmpty(val)) {
        this.deptName = null
      } else {
        find(val).then(data => { this.deptName = data.result.name })
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
    /**
     * 初始化要选择的部门树信息
     * @param isOpen
     */
    visibleChange (isOpen) {
      if (isOpen) {
        tree().then(data => {
          this.deptTreeDate = data.result
        })
      }
    },
    /**
     * 选择部门信息
     * @param row
     */
    selectDept (row) {
      this.deptId = row[0].id; this.deptName = row[0].name
      this.isShow = false
    },
    /**
     * 清空部门信息
     */
    clearDept () {
      if (!this.disabled) {
        this.deptId = null; this.deptName = null
      }
    },
    /**
     * 显示选择部门的modal
     */
    showDeptTree () {
      this.isShow = true
    }
  }
}
</script>
