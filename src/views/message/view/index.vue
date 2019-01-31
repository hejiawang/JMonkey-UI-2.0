<template>
  <Drawer :title="message.title" width="800" v-model="isShow" @on-visible-change="showDrawer" placement="left" class="app-message-view">
    <Row class="message-content">
      <Col span="8"> <span><Icon type="ios-notifications-outline" size="17" color="#ff9900"/> 发布人： {{message.createName}}</span> </Col>
      <Col span="9"> <span><Icon type="md-timer" size="17" color="#ff9900"/> 发布日期： {{message.createDate | createDateFilter}}</span> </Col>
      <Col span="7"> <Rate allow-half :value="parseInt(message.rate)" disabled/> </Col>
    </Row>
    <Row class="message-body ql-container ql-snow" >
      <Row class="ql-editor" v-html="message.content" />
    </Row>

    <Row v-if="message.fileList && message.fileList.length > 0"><Divider>消 息 附 件</Divider></Row>

    <Row class="message-file" v-for="file in message.fileList" :key="file.id">
      <a :href="website.filePath + file.path" :download="file.name">{{file.name}}</a>
    </Row>
  </Drawer>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from 'moment'
import { find } from '@/api/message/message'
import { mapGetters } from 'vuex'

export default {
  name: 'MessageView',
  props: {
    value: {type: Boolean, default: false, required: true},
    messageId: {type: String, default: '', required: true}
  },
  computed: {
    ...mapGetters(['website'])
  },
  filters: {
    createDateFilter (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      isShow: false,
      message: {}
    }
  },
  methods: {
    showDrawer (isOpen) {
      if (isOpen) {
        find(this.messageId).then(data => { this.message = data.result })
      }
    }
  }
}
</script>
<style lang="scss">
  .app-message-view{
    .message-content{
      margin-bottom: 20px;
      span{
        line-height: 32px;
        font-size: 17px;
      }
    }
    .message-body{
      margin-bottom: 20px;
    }
    .ql-container.ql-snow{
      border: 0px;
    }
    .message-file{
      font-size: 17px;
      margin-bottom: 10px;
    }
  }
</style>
