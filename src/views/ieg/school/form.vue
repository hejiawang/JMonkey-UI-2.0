<template>
  <Layout v-layoutIn class="ieg-school-form">
    <Row :gutter="32">
      <Col span="20"><Alert show-icon>院 校 信 息 维 护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack">取 消</Button></Col>
      <Col span="2">
        <Button long type="success" icon="ios-chatbubbles-outline" >确 定</Button>
      </Col>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'IegSchoolForm',
  data () {
    return {}
  },
  created () {
  },
  methods: {
    goBack () {
      this.$CSure({
        'content': '放弃本次编辑内容？',
        'confirm': () => { this.$router.replace({path: '/ieg/school'}) }
      })
    }
  }
}
</script>
