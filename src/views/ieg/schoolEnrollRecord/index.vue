<template>
  <Layout v-layoutIn>
    <Row :gutter="32">
      <Col span="18"><Alert show-icon>【 {{schoolName}} 】 历年录取信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="success" icon="md-git-compare"> 预 览 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>
    <Row>
      <Table :height="enrollTableHeight" border :columns="enrollTableColumns"
             :data="enrollTableData" :loading="listLoading" stripe />
    </Row>

    <CIegEnrollRecordForm v-model="showForm" :type="formType" :schoolId="schoolId"
                          :record="currentRecord" @refresh="initList"/>
  </Layout>
</template>
<script>
import CIegEnrollRecordForm from '@/views/ieg/schoolEnrollRecord/form'
import store from '@/store'
import { list, del } from '@/api/ieg/schoolEnrollRecord'

export default {
  name: 'IegSchoolEnrollRecord',
  components: {
    CIegEnrollRecordForm
  },
  computed: {
    /**
     * 列表高度
     */
    enrollTableHeight () {
      return store.getters.windowHeight - 250
    },
    /**
     * 当前院校名称
     * @returns {*}
     */
    schoolName () {
      return this.$route.query.schoolName
    },
    /**
     * 当前院校id
     * @returns {*}
     */
    schoolId () {
      return this.$route.query.schoolId
    }
  },
  data () {
    return {
      showForm: false,
      formType: '',
      currentRecord: null,
      enrollTableColumns: [],
      enrollTableData: [],
      listLoading: false
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * initTableColumns
     */
    initTableColumns () {
      this.enrollTableColumns = [
        {title: '录取年份', key: 'year', tooltip: true},
        {title: '全国录取人数', key: 'allNumber', tooltip: true},
        {title: '全国最高分', key: 'allScoreMax', tooltip: true},
        {title: '全国最低分', key: 'allScoreMin', tooltip: true},
        {title: '本地录取人数', key: 'localNumber', tooltip: true},
        {title: '本地最高分', key: 'localScoreMax', tooltip: true},
        {title: '本地最低分', key: 'localScoreMin', tooltip: true},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 410,
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
          props: { type: 'primary', ghost: true },
          on: { click: () => { this.viewHandle(params.row) } }
        }, '查看')
      )
      return h('div', hContent)
    },
    /**
     * init table list data
     */
    initList () {
      this.listLoading = true
      list({schoolId: this.schoolId}).then(data => {
        this.enrollTableData = data.result
        this.listLoading = false
      })
    },
    /**
     * 返回学院列表页
     */
    goBack () {
      this.$router.replace({path: '/ieg/school'})
    },
    /**
     * 新增录取信息
     */
    raiseHandle () {
      this.currentRecord = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改录取信息
     * @param row
     */
    modifyHandle (row) {
      this.currentRecord = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除录取信息
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p> <span style="color: #f60">' + this.schoolName + '  ' + row.year + '年' + '</span> 的录取信息将被删除</p><p>是否继续？</p>',
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
     * 查看录取信息
     * @param row
     */
    viewHandle (row) {}
  }
}
</script>
