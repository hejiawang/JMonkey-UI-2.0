<template>
  <Layout v-layoutIn class="app-sys-dept">
    <Row :gutter="32" style="height: 100%;">
      <Col span="5" style="height: 100%;">
        <Card class="dept-tree">
          <p slot="title">
            <Icon type="md-apps"></Icon> 部门层级关系
          </p>
          <Tree :data="treeDate" ref="deptTree" @on-select-change="selectDept"/>
        </Card>
      </Col>
      <Col span="19">
        <Row style="height: 53px;"> <Button type="primary" @click="raiseHandle">新增</Button> </Row>
        <Table border stripe :columns="deptTableColumns" :data="deptTableData" no-data-text="暂未查看部门信息"/>
      </Col>
    </Row>

    <CDeptForm v-model="showForm" :type="formType" :currentDept="currentDept" @refresh="initDeptTreeData"/>
  </Layout>
</template>
<script>
import CDeptForm from '@/views/sys/dept/form'
import { tree, del } from '@/api/sys/dept'
import { converKey } from '@/utils/common'

export default {
  name: 'SysDept',
  components: { CDeptForm },
  data () {
    return {
      showForm: false,
      formType: '',
      deptTreeDate: [],
      deptTableColumns: [],
      currentDept: null
    }
  },
  computed: {
    /**
     * 将当前选中的部门 转换 为列表需要的数组数据
     * @returns {*}
     */
    deptTableData () {
      return this.$CV.isEmpty(this.currentDept) ? [] : [this.currentDept]
    },
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.deptTreeDate) ? this.deptTreeDate : [this.deptTreeDate]
      return converKey(tmpTreeData)
    }
  },
  created () {
    this.initTableColumns()
    this.initDeptTreeData()
  },
  methods: {
    /**
     * init 部门详细信息table
     */
    initTableColumns () {
      this.deptTableColumns = [
        {title: '部门名称', key: 'name'},
        {title: '部门编码', key: 'code'},
        {title: '排序', key: 'sort'},
        {title: '备注', key: 'remark'},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'warning', ghost: true },
                on: { click: () => { this.modifyHandle(params.row) } }
              }, '编辑'),
              h('Button', {
                props: { type: 'error', ghost: true },
                on: { click: () => { this.deleteHandle(params.row) } }
              }, '删除')
            ])
          }
        }
      ]
    },
    /**
     * init 部门树数据
     */
    initDeptTreeData () {
      this.currentDept = null

      tree().then(data => {
        this.deptTreeDate = data.result
      })
    },
    /**
     * 新增部门信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改部门信息
     */
    modifyHandle () {
      this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除部门信息
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的部门将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.initDeptTreeData()
            this.currentDept = null

            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 选择部门树节点时，在右侧table中显示详细信息
     * @param row
     */
    selectDept (row) {
      this.currentDept = row[0]
    }
  }
}
</script>
<style lang="scss">
  .app-sys-dept{
    .dept-tree{
      height: 100%;
      .ivu-card-body{
        height: calc(100% - 54px);
      }
      .ivu-tree{
        height: 100%;
        overflow-y: auto;
      }
    }
  }
</style>
