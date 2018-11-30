<template>
  <Layout>
    <Header></Header>
    <Layout>
      <Button type="primary" @click="go">go</Button>
    </Layout>
  </Layout>
</template>
<script>
export default {
  name: 'LayoutGuide',
  created () {
  },
  methods: {
    go () {
      this.$router.push('/home')
    }
  }
}
</script>
