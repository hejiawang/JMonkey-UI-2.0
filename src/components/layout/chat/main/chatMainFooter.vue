<template>
  <Row>
    <Row class="chat-main-footer">
      <Icon type="ios-add-circle-outline" size="20" @click="handleGroup"/>
      <Icon type="ios-information-circle-outline" size="20" @click="handleWarning"/>
    </Row>

    <CChatGroup v-model="showGroup" @refresh="refreshGroupList"/>
  </Row>
</template>
<script>
import CChatGroup from '@/components/layout/chat/group/chatGroup'

export default {
  name: 'CChatMainFooter',
  components: {
    CChatGroup
  },
  data () {
    return {
      showGroup: false
    }
  },
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
     * 新建群组
     */
    handleGroup () {
      this.showGroup = true
    },
    refreshGroupList () {
      this.$emit('refreshGroup', null)
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
