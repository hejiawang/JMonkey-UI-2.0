<template>
  <Row class="chat-im-tools">
    <Upload
      style="height: 0px;"
      class="message-image"
      action="/ms/assets/chat/im/file"
      :headers="headersObj"
      :show-upload-list="false"
      :max-size="uploadMax"
      :format="uploadFormat"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess"/>

    <Col span="20" class="chat-im-tools-file">
      <Icon type="ios-image-outline"  size="25" @click="uploadChatImImage"/>
      <Icon type="ios-folder-outline" size="25" @click="uploadChatImFile"/>
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
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

export default {
  name: 'CChatImTools',
  components: {CChatHistory},
  computed: {
    ...mapGetters(['website']),
    /**
     * token
     */
    headersObj () {
      return { Authorization: 'Bearer ' + getToken() }
    }
  },
  data () {
    return {
      showHistory: false,
      uploadFormat: [],
      uploadType: '',
      uploadMax: 1024
    }
  },
  methods: {
    /**
     * 显示历史聊天记录
     */
    showHistoryHandle () {
      this.showHistory = true
    },
    /**
     * 触发上传图片事件
     */
    uploadChatImImage () {
      this.uploadType = 'handleImageSuccess'
      this.uploadFormat = ['jpg', 'jpeg', 'png']
      this.uploadMax = 2048

      document.querySelector('.chat-im-tools input').click()
    },
    /**
     * 触发上传文件事件
     */
    uploadChatImFile () {
      this.uploadType = 'handleFileSuccess'
      this.uploadFormat = []
      this.uploadMax = 20480

      document.querySelector('.chat-im-tools input').click()
    },
    /**
     * 发送成功回调函数
     */
    handleSuccess (data, file) {
      this[this.uploadType](data, file)
    },
    /**
     * 发送图片成功回调函数
     */
    handleImageSuccess (data, file) {
      let s = "<img src='" + this.website.filePath + data.result + "' preview='0' preview-text='image'>"
      this.$emit('uploadCallBack', s)
    },
    /**
     * 发送文件成功回调函数
     */
    handleFileSuccess (data, file) {
      let s = "<a href='" + this.website.filePath + data.result + "' download='" + file.name + "'> <div></div><span>" + file.name + '</span></a>'
      this.$emit('uploadCallBack', s)
    },
    /**
     * 上传格式错误
     * @param file
     */
    handleFormatError (file) {
      this.$Message.error('发送文件格式错误')
    },
    /**
     * 上传大小超过限制
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('发送文件过大, 请压缩文件')
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
    .chat-im-tools-file{
      .ivu-icon{
        cursor:pointer;
      }
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
