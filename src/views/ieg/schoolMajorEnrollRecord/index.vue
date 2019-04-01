<template>
  <Layout v-layoutIn>
    <Row :gutter="32">
      <Col span="18"><Alert show-icon>【 {{schoolName}} 】 【{{majorName}}】 专业历年录取信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="success" icon="md-git-compare"> 预 览 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'IegSchoolMajorEnrollRecord',
  computed: {
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
    return {}
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {},
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
    raiseHandle () {}
  }
}
</script>
