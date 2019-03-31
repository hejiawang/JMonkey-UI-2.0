<template>
  <Layout v-layoutIn>
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>【 {{schoolName}} 】 院校专业信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>

    <CIegSchoolMajorForm v-model="showForm" :type="formType" :schoolId="schoolId"
                          :major="currentMajor" @refresh="initList"/>
  </Layout>
</template>
<script>
import CIegSchoolMajorForm from '@/views/ieg/schoolMajor/form'

export default {
  name: 'IegSchoolMajor',
  components: {
    CIegSchoolMajorForm
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
      currentMajor: null
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
    raiseHandle () {
      this.currentMajor = null; this.formType = 'raise'; this.showForm = true
    }
  }
}
</script>
