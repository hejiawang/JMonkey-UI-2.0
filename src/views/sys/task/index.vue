<template>
  <Layout v-layoutIn class="app-sys-task">
    <Row style="height: 60px;">
      <Button type="primary" @click="raiseHandle">新增</Button>
      <Button type="warning" @click="resumeHandle" :disabled="currentTaskIndex === null">恢复</Button>
      <Button type="error" @click="pauseHandle" :disabled="currentTaskIndex === null">暂停</Button>
      <Button type="success" @click="startNowHandle" :disabled="currentTaskIndex === null">立即执行</Button>
    </Row>
    <Row>
      <RadioGroup v-model="currentTaskIndex" vertical style="width: 100%;">
        <Table :height="taskTableHeight" :loading="listLoading" border
               :columns="taskTableColumns" :data="taskTableData" @on-row-click="clickTable" />
      </RadioGroup>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="taskPage"/>
    </Row>

    <CTaskForm  v-model="showForm" :taskInfo="handleTask" :type="formType" @refresh="initList" />
  </Layout>
</template>
<script>
import store from '@/store'
import moment from 'moment'
import { list, del, pause, resume, startNow } from '@/api/sys/task'
import CTaskForm from '@/views/sys/task/form'

/**
 * TODO bug：table中有单选按钮，记录的是当前条的index，这样会导致在翻页时第二页还显示相同index的数据，
 */
export default {
  name: 'SysLog',
  components: { CTaskForm },
  computed: {
    /**
     * 表格高度
     */
    taskTableHeight () {
      return store.getters.windowHeight - 290
    },
    /**
     * 当前选中的任务信息
     */
    currentTask () {
      return this.$CV.isEmpty(this.currentTaskIndex) ? null : this.taskTableData[this.currentTaskIndex]
    }
  },
  data () {
    return {
      handleTask: null,
      formType: '',
      showForm: false,
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
    /**
     * initial table title
     */
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
          width: 200,
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
    /**
     * table 按钮事件
     */
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
      this.currentTaskIndex = null

      this.listLoading = true
      list(this.listQuery).then(data => {
        this.taskTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * 修改任务信息
     * @param row 任务信息
     */
    modifyHandle (row) {
      this.handleTask = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 新增任务信息
     */
    raiseHandle () {
      this.handleTask = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * 删除任务信息
     * @param row 任务信息
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的任务将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    },
    /**
     * 暂停任务
     */
    pauseHandle () {
      this.$CSure({
        'content': '暂停该任务？',
        'confirm': () => {
          pause(this.currentTask).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('暂停任务成功')
            else this.$Message.error('暂停任务失败')
          })
        }
      })
    },
    /**
     * 恢复任务
     */
    resumeHandle () {
      this.$CSure({
        'content': '恢复该任务？',
        'confirm': () => {
          resume(this.currentTask).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('恢复任务成功')
            else this.$Message.error('恢复任务失败')
          })
        }
      })
    },
    /**
     * 立即执行一次任务
     */
    startNowHandle () {
      this.$CSure({
        'content': '立即执行该任务？',
        'confirm': () => {
          startNow(this.currentTask).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('立即执行任务成功')
            else this.$Message.error('立即执行任务失败')
          })
        }
      })
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
