<template>
  <Row><Button type="primary" @click="handle">Test</Button></Row>
</template>
<script>
export default {
  name: 'MessageAudit',
  methods: {
    handle () {
      this.$CConfirm({
        'content': '暂停该任务？',
        'yesConfirm': () => {
          console.info(1)
        },
        'noConfirm': () => {
          console.info(2)
        }
      })
    }
  }
}
</script>
