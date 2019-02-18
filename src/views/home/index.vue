<template>
  <Layout>
    <Row>
      <Button type="primary" @click="reGuide">这是个全屏的测试页面，点击返回引导页</Button>
    </Row>
    <Row>
      <div style="height: 400px; width: 100%" v-html="pageOfficeHtml"></div>
    </Row>
  </Layout>
</template>
<script>
import { pageOfficeTest } from '@/api/message/message'

export default {
  name: 'DefaultHome',
  data () {
    return {
      pageOfficeHtml: ''
    }
  },
  created () {
    this.initPageOffice()
  },
  methods: {
    initPageOffice () {
      pageOfficeTest().then(data => {
        this.pageOfficeHtml = data.result
      })
    },
    reGuide () {
      this.$router.replace('/guide')
    }
  }
}
</script>
