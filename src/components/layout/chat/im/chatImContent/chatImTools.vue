<template>
  <Row class="chat-im-tools">
    <Col span="20">
      <Icon type="ios-image-outline"  size="25"/>
      <Icon type="ios-folder-outline" size="25"/>
    </Col>
    <Col span="4">
      <div class="chat-im-history" @click="showHistoryHandle">
        <Icon type="md-attach" size="25" />
        <span style="font-size: 14px;">历史纪录</span>
      </div>
    </Col>

    <CChatHistory v-model="showHistory" />
  </Row>
</template>
<script>
import CChatHistory from '@/components/layout/chat/im/history'

export default {
  name: 'CChatImTools',
  components: {CChatHistory},
  data () {
    return {
      showHistory: false
    }
  },
  methods: {
    showHistoryHandle () {
      this.showHistory = true
    }
  }
}
</script>
<style lang="scss">
  .chat-im-tools{
    border-top: 1px solid #F1F1F1;
    height: 40px;
    line-height: 40px;
    .ivu-icon{
      margin-left: 20px;
    }
    .chat-im-history{
      cursor:pointer;
    }
    .chat-im-history:hover span{
      color: #2b85e4;
    }
    .chat-im-history:hover i{
      color: #2b85e4;
    }
  }
</style>
