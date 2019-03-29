<template>
  <Layout v-layoutIn class="ieg-school-problem">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>【 {{schoolName}} 】 常见问题维护</Alert></Col>
      <Col span="2">
        <Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button>
      </Col>
      <Col span="2">
        <Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button>
      </Col>
    </Row>
    <Row class="ieg-school-problem-main">
      <Row v-if="problemList.length === 0" class="ieg-school-problem-none">暂无问题</Row>
      <Collapse accordion v-else>
        <Panel v-for="problem in problemList" :name="problem.id" :key="problem.id">
          {{problem.problem}}
          <p slot="content">
            <Row class="answer-body ql-container ql-snow">
              <Row class="ql-editor" v-html="problem.answer" />
            </Row>
          </p>
        </Panel>
      </Collapse>
    </Row>

    <CIegSchoolProblemForm v-model="showForm" :type="formType" :schoolId="schoolId"
                           :faculty="currentProblem" @refresh="initList"/>
  </Layout>
</template>
<script>
import CIegSchoolProblemForm from '@/views/ieg/schoolProblem/form'
import { list } from '@/api/ieg/schoolProblem'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'IegSchoolProblem',
  components: {
    CIegSchoolProblemForm
  },
  computed: {
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
      listLoading: false,
      showForm: false,
      formType: '',
      currentProblem: null,
      problemList: []
    }
  },
  created () {
    this.initList()
  },
  methods: {
    /**
     * init list data
     */
    initList () {
      this.listLoading = true
      list({schoolId: this.schoolId}).then(data => {
        this.problemList = data.result
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
     * raise school problem handle
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    }
  }
}
</script>
<style lang="scss">
  .ieg-school-problem {
    .ieg-school-problem-main {
      margin-top: 10px;
      height: calc(100% - 55px);
      overflow-y: auto;
      .answer-body {
        height: calc(100% - 110px);
        overflow-y: auto;
        border: 0px;
      }
      .ivu-collapse-header {
        font-size: 17px;
      }
      .ieg-school-problem-none {
        font-size: 17px;
        line-height: 200px;
        text-align: center;
      }
    }
  }
</style>
