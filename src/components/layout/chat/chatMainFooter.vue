<template>
  <Row class="chat-main-footer">
    <Icon type="md-search" size="20"/>
    <Icon type="ios-add-circle-outline" size="20"/>
    <Icon type="ios-trash-outline" size="20" @click="handleDelete"/>
    <Icon type="ios-information-circle-outline" size="20" @click="handleWarning"/>
  </Row>
</template>
<script>
export default {
  name: 'CChatMainFooter',
  methods: {
    /**
     * 提示
     */
    handleWarning () {
      this.$CSure({
        'content': '重要信息请及时存储！！！',
        'confirm': () => { }
      })
    },
    /**
     * 清空聊天记录
     */
    handleDelete () {
      this.$CDelete({
        'content': '<p>聊天记录将被清空</p><p>是否继续？</p>',
        'confirm': () => { }
      })
    }
  }
}
</script>
<style lang="scss">
  .chat-main-footer {
    height: 50px;
    padding: 0px 20px;
    .ivu-icon {
      cursor:pointer;
      margin-right: 15px;
    }
  }
</style>
