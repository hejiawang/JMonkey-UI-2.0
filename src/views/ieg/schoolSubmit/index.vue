<template>
  <Layout v-layoutIn class="ieg-school-submit">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>【 {{schoolName}} 】 投档单位信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>

    <Row>
      <Table :height="tableHeight" border :columns="tableColumns" :data="tableList" :loading="listLoading" stripe />
    </Row>

    <CIegSchoolSubmitForm v-model="showForm" :type="formType" :schoolId="schoolId"
                         :submit="currentSubmit" @refresh="initList"/>
  </Layout>
</template>
<script>
import { list, del } from '@/api/ieg/schoolSubmit'
import store from '@/store'
import CIegSchoolSubmitForm from '@/views/ieg/schoolSubmit/form'

export default {
  name: 'IegSchoolSubmit',
  components: {
    CIegSchoolSubmitForm
  },
  computed: {
    /**
     * 列表高度
     */
    tableHeight () {
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
      tableColumns: [],
      tableList: [],
      listLoading: false,
      currentSubmit: null,
      showForm: false,
      formType: ''
    }
  },
  created () {
    this.initList()
    this.initTableColumns()
  },
  methods: {
    /**
     * init table colums
     */
    initTableColumns () {
      this.tableColumns = [
        {title: '投档单位编码', key: 'code', tooltip: true, width: 200},
        {title: '信息描述', key: 'describe', tooltip: true},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 450,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    /**
     * bind event
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
    /**
     * init list
     */
    initList () {
      this.listLoading = true
      list({schoolId: this.schoolId}).then(data => {
        this.tableList = data.result

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
     * 新增
     */
    raiseHandle () {
      this.currentSubmit = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * modifyHandle
     */
    modifyHandle (row) {
      this.currentSubmit = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * delete handle
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>编码为 <span style="color: #f60">' + row.code + '</span> 的投档单位将被删除</p><p>是否继续？</p>',
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
