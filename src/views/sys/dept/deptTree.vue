<template>
  <Row class="sys-dept-tree-org">
    <Card>
      <VOrgTree :data="deptTreeData" :expand-all="true" label-width="180px" collapsable />
    </Card>
  </Row>
</template>
<script>
import Vue from 'vue'
import { tree } from '@/api/sys/dept'

export default {
  name: 'SysDeptTree',
  data () {
    return {
      deptTreeData: {}
    }
  },
  created () {
    this.initDeptTreeData()
  },
  methods: {
    initDeptTreeData () {
      tree().then(data => {
        let dataArray = this.converOrgTree(data.result)
        if (Array.isArray(dataArray)) {
          if (dataArray.length > 1) {
            this.deptTreeData = {id: 'id', label: '部门信息', children: dataArray, expand: true}
          } else {
            this.deptTreeData = dataArray[0]
          }
        } else {
          this.deptTreeData = dataArray
        }
      })
    },
    converOrgTree (data) {
      Array.from(data).forEach(tData => {
        Vue.set(tData, 'expand', true)
        Vue.set(tData, 'label', tData.name)
        // 过滤子节点key
        if (tData.children && tData.children.length > 0) this.converOrgTree(tData.children)
      })

      return data
    }
  }
}
</script>
<style lang="scss">
  .sys-dept-tree-org{
    margin-top: 20px;
    .ivu-card {
      height: 280px; width: 100%;overflow:hidden
    }
    .ivu-card-body{
      text-align: center;
    }
    .org-tree-node-label{
      background: #00cae3;
      color: white;
    }
  }
</style>
