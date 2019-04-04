<template>
  <Layout v-layoutIn class="ieg-enroll">
    <Row style="height: 60px;">
      <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle">新增</Button>
    </Row>
    <Row>
      <Table :height="tableHeight" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe/>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="enrollPage"/>
    </Row>

    <CIegEnrollForm v-model="showForm" :type="formType" :enroll="currentEnroll" @refresh="initList" />
    <CIegEnrollInfo v-model="showInfo" :enroll="currentEnroll"/>
  </Layout>
</template>
<script>
import store from '@/store'
import { list, del } from '@/api/ieg/enroll'
import CIegEnrollForm from '@/views/ieg/enroll/form'
import CIegEnrollInfo from '@/views/ieg/enrollInfo'

export default {
  name: 'IegEnroll',
  components: {
    CIegEnrollForm, CIegEnrollInfo
  },
  computed: {
    /**
     * 列表高度
     */
    tableHeight () {
      return store.getters.windowHeight - 280
    }
  },
  data () {
    return {
      showInfo: false,
      showForm: false,
      formType: '',
      currentEnroll: null,
      listQuery: {
        size: 10,
        total: 0
      },
      tableColumns: [],
      tableData: [],
      listLoading: false,
      courseType: { W: '文科', L: '理科' },
      degreeType: { B: '本科', Z: '专科' },
      enrollType: { Common: '普通', Art: '艺术', Gym: '体育' }
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * init table columns
     */
    initTableColumns () {
      this.tableColumns = [
        {title: '年份', key: 'year', tooltip: true},
        {
          title: '学科类型',
          key: 'courseType',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'green' } }, this.courseType[params.row.courseType])
          }
        },
        {
          title: '学历类型',
          key: 'degreeType',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'cyan' } }, this.degreeType[params.row.degreeType])
          }
        },
        {
          title: '招收类型',
          key: 'enrollType',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'purple' } }, this.enrollType[params.row.enrollType])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 300,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    /**
     * 列表按钮
     */
    bindEvent (h, params) {
      let hContent = []

      hContent.push(
        h('Button', {
          props: { type: 'warning', ghost: true },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑')
      )
      hContent.push(
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      )
      hContent.push(
        h('Button', {
          props: { type: 'success', ghost: true },
          on: { click: () => { this.enrollHandle(params.row) } }
        }, '投档分数')
      )

      return h('div', hContent)
    },
    /**
     * init table list data
     */
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.tableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})
        this.listLoading = false
      })
    },
    /**
     * 新增
     */
    raiseHandle () {
      this.currentEnroll = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改
     * @param row
     */
    modifyHandle (row) {
      this.currentEnroll = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>该条信息将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    },
    /**
     * 投档分数线详细信息
     * @param row
     */
    enrollHandle (row) {
      this.currentEnroll = row; this.showInfo = true
    }
  }
}
</script>
<style lang="scss">
  .ieg-enroll {
    .ivu-tag {
      line-height: 22px;
      font-size: 17px;
    }
  }
</style>
