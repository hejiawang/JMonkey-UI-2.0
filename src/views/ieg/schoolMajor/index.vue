<template>
  <Layout v-layoutIn class="ieg-school-major">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>【 {{schoolName}} 】 院校专业信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>
    <Row :gutter="32" class="ieg-school-major-event">
      <Col span="24">
        <span style="margin-right: 20px;">投档单位: </span>
        <template v-for="m in submitList">
          <Button v-if="m.id === currentSubmitId" type="info" ghost :key="m.id" @click="selectSubmitHandle(m.id)">{{m.code}}</Button>
          <Button v-else type="text" :key="m.id" @click="selectSubmitHandle(m.id)">{{m.code}}</Button>
        </template>
      </Col>
    </Row>
    <Row>
      <Table :height="tableHeight" border :columns="schoolMajorColumns"
             :data="schoolMajorList" :loading="listLoading" stripe />
    </Row>

    <CIegSchoolMajorForm v-model="showForm" :type="formType" :schoolId="schoolId"
                          :major="currentMajor" @refresh="initSubmitList"/>
  </Layout>
</template>
<script>
import CIegSchoolMajorForm from '@/views/ieg/schoolMajor/form'
import { list, del } from '@/api/ieg/schoolMajor'
import store from '@/store'
import { list as submitList } from '@/api/ieg/schoolSubmit'

export default {
  name: 'IegSchoolMajor',
  components: {
    CIegSchoolMajorForm
  },
  computed: {
    /**
     * 列表高度
     */
    tableHeight () {
      return store.getters.windowHeight - 300
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
      currentMajor: null,
      submitList: [],
      currentSubmitId: null,
      schoolMajorList: [],
      schoolMajorColumns: [],
      listLoading: false,
      degreeType: {
        B: '本科',
        Z: '专科',
        A: '全部'
      },
      courseType: {
        W: '文科',
        L: '理科',
        A: '文科/理科'
      }
    }
  },
  created () {
    this.initSubmitList()
    this.initTableColumns()
  },
  methods: {
    /**
     * initTableColumns
     */
    initTableColumns () {
      this.schoolMajorColumns = [
        {title: '专业名称', key: 'name', tooltip: true},
        {title: '专业编码', key: 'code', tooltip: true},
        {
          title: '学历层次',
          key: 'degreeType',
          tooltip: true,
          render: (h, params) => { return h('span', this.degreeType[params.row.degreeType]) }
        },
        {
          title: '学科类型',
          key: 'courseType',
          tooltip: true,
          render: (h, params) => { return h('span', this.courseType[params.row.courseType]) }
        },
        {title: '校内排名', key: 'sort', tooltip: true},
        {title: '学费(元)', key: 'money', tooltip: true},
        {title: '学制(年)', key: 'studyLength', tooltip: true},
        {title: '归属院系', key: 'facultyName', tooltip: true},
        {
          title: '专业特性',
          key: 'features',
          tooltip: true,
          render: (h, params) => {
            let renderContent = []
            params.row.featureNames.forEach(f => {
              renderContent.push(
                h('Tag', { props: { color: '#FFA2D3' } }, f)
              )
            })

            return h('div', renderContent)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 400,
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
      /* hContent.push(
        h('Button', {
          props: { type: 'primary', ghost: true },
          on: { click: () => { this.viewHandle(params.row) } }
        }, '查看')
      ) */
      hContent.push(
        h('Button', {
          props: { type: 'success', ghost: true },
          on: { click: () => { this.problemHandle(params.row) } }
        }, '常见问题')
      )
      hContent.push(
        h('Button', {
          props: { type: 'info', ghost: true },
          on: { click: () => { this.enrollHandle(params.row) } }
        }, '录取信息')
      )
      return h('div', hContent)
    },
    /**
     * 初始化院校所有的专业门类
     */
    initSubmitList () {
      submitList({schoolId: this.schoolId}).then(data => {
        this.submitList = data.result
        if (this.submitList.length > 0) {
          this.currentSubmitId = this.submitList[0].id

          this.initList()
        }
      })
    },
    /**
     * 选择专业门类
     * @param majorOneId
     */
    selectSubmitHandle (sId) {
      this.currentSubmitId = sId
      this.initList()
    },
    /**
     * 获取院校专业信息
     */
    initList () {
      this.listLoading = true
      list({schoolId: this.schoolId, submitId: this.currentSubmitId}).then(data => {
        this.schoolMajorList = data.result

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
      this.currentMajor = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改
     */
    modifyHandle (row) {
      this.currentMajor = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.majorName + '</span> 的专业将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then((data) => {
            this.initSubmitList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    },
    /**
     * 专业信息查看
     */
    viewHandle (row) {},
    /**
     * 常见问题
     */
    problemHandle (row) {
      this.$router.replace(
        {
          path: '/ieg/schoolMajorProblem',
          query: {
            schoolId: this.schoolId,
            schoolName: this.schoolName,
            majorId: row.id,
            majorName: row.majorName
          }
        }
      )
    },
    /**
     * 历年录取信息
     */
    enrollHandle (row) {
      this.$router.replace(
        {
          path: '/ieg/schoolMajorEnrollRecord',
          query: {
            schoolId: this.schoolId,
            schoolName: this.schoolName,
            majorId: row.id,
            majorName: row.name
          }
        }
      )
    }
  }
}
</script>
<style lang="scss">
  .ieg-school-major {
    .ieg-school-major-event {
      margin-top: 10px;
      margin-bottom: 10px;
      height: 40px;
      span {
        font-size: 17px;
      }
    }
  }
</style>
