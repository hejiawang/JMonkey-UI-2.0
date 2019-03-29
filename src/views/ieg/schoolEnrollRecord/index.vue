<template>
  <Layout v-layoutIn>
    <Row :gutter="32">
      <Col span="18"><Alert show-icon>【 {{schoolName}} 】 历年录取信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
      <Col span="2"><Button long type="success" icon="md-git-compare"> 预 览 </Button></Col>
      <Col span="2"><Button long type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新 增 </Button></Col>
    </Row>

    <CIegEnrollRecordForm v-model="showForm" :type="formType" :schoolId="schoolId"
                          :record="currentRecord" @refresh="initList"/>
  </Layout>
</template>
<script>
import CIegEnrollRecordForm from '@/views/ieg/schoolEnrollRecord/form'

export default {
  name: 'IegSchoolEnrollRecord',
  components: {
    CIegEnrollRecordForm
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
      currentRecord: null
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
      this.formType = 'raise'; this.showForm = true
    }
  }
}
</script>
