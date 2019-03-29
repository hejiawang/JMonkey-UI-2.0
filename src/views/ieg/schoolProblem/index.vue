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

    </Row>

    <CIegSchoolProblemForm v-model="showForm" :type="formType" :schoolId="schoolId"
                           :faculty="currentProblem" @refresh="initList"/>
  </Layout>
</template>
<script>
import CIegSchoolProblemForm from '@/views/ieg/schoolProblem/form'

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
      showForm: false,
      formType: '',
      currentProblem: null
    }
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {},
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
    }
  }
</style>
