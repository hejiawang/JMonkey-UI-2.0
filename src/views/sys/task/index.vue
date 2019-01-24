<template>
  <Layout v-layoutIn class="app-sys-task">
    <Row style="height: 60px;">
      <Button type="primary">新增</Button>
      <Button type="warning" :disabled="currentTaskIndex === null">启动</Button>
      <Button type="error" :disabled="currentTaskIndex === null">暂停</Button>
      <Button type="success" :disabled="currentTaskIndex === null">立即执行</Button>
    </Row>
    <Row>
      <RadioGroup v-model="currentTaskIndex" vertical>
        <Table :height="taskTableHeight" :loading="listLoading" border
               :columns="taskTableColumns" :data="taskTableData" @on-row-click="clickTable" />
      </RadioGroup>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="taskPage"/>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import moment from 'moment'
import { list } from '@/api/sys/task'

export default {
  name: 'SysLog',
  computed: {
    /**
     * 表格高度
     */
    taskTableHeight () {
      return store.getters.windowHeight - 290
    }
  },
  data () {
    return {
      yesOrNo: {'Yes': '启用', 'No': '暂停'},
      listLoading: false,
      taskTableColumns: [],
      taskTableData: [],
      currentTaskIndex: null,
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
      this.taskTableColumns = [
        {
          title: ' ',
          key: 'id',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('Radio', {
              props: { label: params.index }
            }, '  ')
          }
        },
        {title: '任务名称', key: 'name', width: 150, tooltip: true},
        {title: '任 务 组', key: 'group', width: 150, tooltip: true},
        {title: '定时规则', key: 'rule', width: 150, tooltip: true},
        {
          title: '启用状态',
          key: 'status',
          width: 120,
          tooltip: true,
          render: (h, params) => {
            if (params.row.status === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNo[params.row.status])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNo[params.row.status])
          }
        },
        {title: '任务类', key: 'className', tooltip: true},
        {
          title: '创建时间',
          key: 'createDate',
          tooltip: true,
          render: (h, params) => {
            let d = ''
            if (params.row.createDate) d = moment(params.row.createDate).format('YYYY-MM-DD HH:mm:ss')
            return h('span', d)
          }
        },
        {title: '备注', key: 'remark', tooltip: true},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    /**
     * 点击table一行时触发
     */
    clickTable (row, index) {
      this.currentTaskIndex = index
    },
    bindEvent (h, params) {
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
    },
    /**
     * 获取列表数据
     */
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.taskTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    modifyHandle (row) {

    },
    deleteHandle (row) {

    }
  }
}
</script>
<style lang="scss">
  .app-sys-task{
    .ivu-radio-inner {
      border: 1px solid #2d8cf0;
    }
  }
</style>
