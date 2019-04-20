<template>
  <Layout v-layoutIn>
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>【 {{schoolName}} 】 【{{majorName}}】 专业历年录取信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>

    <Row>
      <Table :height="enrollTableHeight" border :columns="enrollTableColumns"
             :data="enrollTableData" :loading="listLoading" stripe />
    </Row>

    <CIegSchoolMajorEnrollRecordForm v-model="showForm" :type="formType" :majorId="majorId"
                         :record="currentRecord" @refresh="initList"/>
  </Layout>
</template>
<script>
import CIegSchoolMajorEnrollRecordForm from '@/views/ieg/schoolMajorEnrollRecord/form'
import { list, del } from '@/api/ieg/schoolMajorEnrollRecord'
import store from '@/store'

export default {
  name: 'IegSchoolMajorEnrollRecord',
  components: {
    CIegSchoolMajorEnrollRecordForm
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
    schoolName () { return this.$route.query.schoolName },
    /**
     * 当前院校id
     * @returns {*}
     */
    schoolId () { return this.$route.query.schoolId },
    /**
     * 专业名称
     * @returns {*}
     */
    majorName () { return this.$route.query.majorName },
    /**
     * 专业id
     * @returns {*}
     */
    majorId () { return this.$route.query.majorId }
  },
  data () {
    return {
      showForm: false,
      formType: '',
      currentRecord: null,
      enrollTableColumns: [],
      enrollTableData: [],
      listLoading: false,
      courseType: { W: '文科', L: '理科' }
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    initTableColumns () {
      this.enrollTableColumns = [
        {title: '录取年份', key: 'year', tooltip: true},
        {
          title: '学科类型',
          key: 'type',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: 'green' } }, this.courseType[params.row.type])
          }
        },
        {title: '计划招收人数', key: 'planNumber', tooltip: true},
        {title: '实际招收人数', key: 'realNumber', tooltip: true},
        {title: '最低分', key: 'scoreMin', tooltip: true},
        {title: '最高分', key: 'scoreMax', tooltip: true},
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

      return h('div', hContent)
    },
    initList () {
      this.listLoading = true
      list({schoolMajorId: this.majorId}).then(data => {
        this.enrollTableData = data.result
        this.listLoading = false
      })
    },
    /**
     * 返回学院专业列表页
     */
    goBack () {
      this.$router.replace(
        {
          path: '/ieg/schoolMajor',
          query: {schoolId: this.schoolId, schoolName: this.schoolName}
        }
      )
    },
    /**
     * raise handle
     */
    raiseHandle () {
      this.currentRecord = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * modify handle
     */
    modifyHandle (row) {
      this.currentRecord = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * delte handle
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p> <span style="color: #f60">' + row.year + '年' + '</span> 的录取信息将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    }
  }
}
</script>
