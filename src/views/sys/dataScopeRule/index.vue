<template>
  <Card class="app-sys-dataScope-rule">
    <Row v-if="dataScope === null">
      <Alert show-icon type="warning">未 选 择 数 据 规 则</Alert>
    </Row>
    <Row v-else class="app-sys-dataScope-rule-main">
      <Row style="height: 60px;" :gutter="32">
        <Col span="21"><Alert show-icon>数据规则： {{dataScope.name}}</Alert></Col>
        <Col span="3"><Button type="primary" ghost @click="raiseHandle">新增</Button></Col>
      </Row>
      <Row>
        <Table :height="tableHeight" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe />
      </Row>
      <Row>
        <CPage v-model="listQuery" @on-list="initList" ref="dataScopeRulePage"/>
      </Row>

      <CDataScopRuleForm v-model="showForm" :type="formType" :dataScopeId="dataScope.id"
                         :dataScopeRule="dataScopeRuleC" @refresh="initList"/>
    </Row>
  </Card>
</template>
<script>
import store from '@/store'
import CDataScopRuleForm from '@/views/sys/dataScopeRule/form'
import { list, del } from '@/api/sys/dataScopeRule'

export default {
  name: 'SysDataScopeRule',
  components: {
    CDataScopRuleForm
  },
  props: {
    dataScope: {type: Object, default: null, required: false}
  },
  watch: {
    dataScope (val) { this.initList() }
  },
  computed: {
    /**
     * 列表高度
     */
    tableHeight () {
      return store.getters.windowHeight - 310
    }
  },
  data () {
    return {
      listLoading: false,
      tableColumns: [],
      tableData: [],
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      showForm: false,
      formType: '',
      dataScopeRuleC: null
    }
  },
  created () {
    this.initTableColumns()
  },
  methods: {
    /**
     * initTableColumns
     */
    initTableColumns () {
      this.tableColumns = [
        {title: '规则定义', key: 'name', tooltip: true, width: 250},
        {title: '控制语句', key: 'sqlSegment', tooltip: true},
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          align: 'center',
          width: 200,
          render: (h, params) => { return this.bindTableEvent(h, params) }
        }
      ]
    },
    /**
     * bindTableEvent
     */
    bindTableEvent (h, params) {
      let hContent = []
      hContent.push(h('Button', {
        props: { type: 'warning', ghost: true },
        on: { click: () => { this.modifyHandle(params.row) } }
      }, '编辑'))
      hContent.push(
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      )

      return h('div', hContent)
    },
    /**
     * initList
     */
    initList () {
      this.listLoading = true
      this.listQuery.scopeId = this.dataScope.id
      list(this.listQuery).then(data => {
        this.tableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * raiseHandle
     */
    raiseHandle () {
      this.dataScopeRuleC = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * modifyHandle
     */
    modifyHandle (rule) {
      this.dataScopeRuleC = rule; this.formType = 'modify'; this.showForm = true
    },
    /**
     * deleteHandle
     * @param rule
     */
    deleteHandle (rule) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + rule.name + '</span> 的规则定义将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(rule.id).then(() => {
            this.initList()
            this.$Message.success('删除成功')
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .app-sys-dataScope-rule {
    height: 100%;
    .ivu-card-body {
      height: 100%;
      .app-sys-dataScope-rule-main {
        height: calc(100% - 45px);
      }
    }
  }
</style>
