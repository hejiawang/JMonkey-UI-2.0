<template>
  <Layout><Button type="primary" @click="reGuide">这是个全屏的测试页面，点击返回引导页</Button></Layout>
</template>
<script>
export default {
  name: 'DefaultHome',
  methods: {
    reGuide () {
      this.$router.replace('/guide')
    }
  }
}
</script>
