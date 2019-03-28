<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;"><Button type="primary" @click="raiseHandle">新增</Button></Row>
  </Layout>
</template>
<script>
export default {
  name: 'IegSchool',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    raiseHandle () {
      this.$router.replace({path: '/ieg/school/form'})
    }
  }
}
</script>
<style lang="scss">

</style>
