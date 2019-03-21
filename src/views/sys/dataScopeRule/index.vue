<template>
  <Card class="app-sys-dataScope-rule">
    <Row v-if="dataScope === null">
      <Alert show-icon type="warning">未 选 择 数 据 规 则</Alert>
    </Row>
    <Row v-else class="app-sys-dataScope-rule-main">
      <Row style="height: 60px;" :gutter="32">
        <Col span="21"><Alert show-icon>数据规则： {{dataScope.name}}</Alert></Col>
        <Col span="3"><Button type="primary" ghost>新增</Button></Col>

      </Row>
      <Row>
        <Table :height="tableHeight" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe />
      </Row>
      <Row>
        <CPage v-model="listQuery" @on-list="initList" ref="dataScopeRulePage"/>
      </Row>
    </Row>
  </Card>
</template>
<script>
import store from '@/store'

export default {
  name: 'SysDataScopeRule',
  props: {
    dataScope: {type: Object, default: null, required: false}
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
      }
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    initTableColumns () {
      this.tableColumns = [
        {title: '规则名称', key: 'name', tooltip: true, width: 250},
        {title: '控制语句', key: 'sql_segment', tooltip: true},
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
    initList () {},
    modifyHandle (rule) {},
    deleteHandle (rule) {}
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
