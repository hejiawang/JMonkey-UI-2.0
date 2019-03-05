<template>
  <div>
    <Col :span="24 - mainSpan" class="app-chat-im-main-right">
      <Row class="chat-im-record" ref="testT">
        <template v-for="(c, index) in contentList">
          <CChatImContentRight :key="index" v-if="c.senderId === userC.id"
                               :name="c.senderName" :img="c.senderPhoto" :sendDate="c.senderDate" :content="c.msg"/>

          <CChatImContentLeft :key="index" v-else
                              :name="c.senderName" :img="c.senderPhoto" :sendDate="c.senderDate" :content="c.msg"/>
        </template>
      </Row>

      <CChatImTools @uploadCallBack="sendImFileHandle"/>

      <Row class="chat-im-textarea">
        <Input v-model.trim="content" type="textarea" :rows="3" ref="chatImContent" :disabled="webSocketOpening"
               :autofocus="true" placeholder="请输入发送内容 ..." @keyup.enter.native="sendImHandle"/>
      </Row>

      <Row class="chat-im-bootom">
        <Button type="success" icon="md-paper-plane" @click="sendImHandle" :disabled="webSocketOpening"> 发 送 </Button>
        <Button type="text" @click="closeMember"> 关 闭 </Button>
      </Row>
    </Col>
  </div>
</template>
<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import CChatImContentLeft from '@/components/layout/chat/im/chatImContent/chatImContentLeft'
import CChatImContentRight from '@/components/layout/chat/im/chatImContent/chatImContentRight'
import CChatImTools from '@/components/layout/chat/im/chatImContent/chatImTools'

export default {
  name: 'CChatImContent',
  components: {
    CChatImContentLeft, CChatImContentRight, CChatImTools
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * 当前聊天的人
     */
    memberC () { return store.getters.memberC },
    /**
     * 当前登录人
     */
    userC () { return store.getters.user },
    /**
     * main-left col span
     * @returns {number}
     */
    mainSpan () {
      if (store.getters.memberList.length > 1) return 5
      else return 0
    }
  },
  data () {
    return {
      contentList: [],
      content: null,
      webSocket: null,
      webSocketOpening: true
    }
  },
  watch: {
    memberC (val) {
      this.contentList = []
    }
  },
  created () {
    this.registerWebSocket()
  },
  methods: {
    /**
     * register WebSocket
     */
    registerWebSocket () {
      if ('WebSocket' in window) {
        let wsUrl = 'ws://' + window.document.location.host + '/socket/ms/chat/im?userId=' + this.userC.id + '&realName=' + this.userC.realName + '&userPhoto=' + this.userC.photo
        this.webSocket = new WebSocket(wsUrl)

        this.bindSocketEvent()
      } else {
        this.$Message.error('您使用的浏览器版本不支持WebSocket技术,无法进行快捷通讯,请更换浏览器')
      }
    },
    /**
     * 设置websocket事件
     */
    bindSocketEvent () {
      let _t = this

      _t.webSocket.onerror = function (event) { _t.$Message.error('服务器异常, 请联系管理员') }
      _t.webSocket.onopen = function (event) { _t.webSocketOpening = false }
      _t.webSocket.onclose = function (event) { _t.$Message.error('即时通讯功能已关闭, 请重新登录') }
      _t.webSocket.onmessage = function (event) { _t.receiveMessage(JSON.parse(event.data)) }
    },
    /**
     * 接收消息
     * @param msgObject
     */
    receiveMessage (msgObject) {
      if ((msgObject.imType === this.memberC.type) &&
        (msgObject.receiverId === this.memberC.id || msgObject.senderId === this.memberC.id)) {
        this.contentList.push(msgObject)

        this.$nextTick(() => {
          if (this.$refs.testT && this.$refs.testT.$el) {
            this.$refs.testT.$el.scrollTop = this.$refs.testT.$el.scrollHeight
          }
        })
      } else { // todo 消息提醒

      }
    },
    /**
     * 发送文字消息
     */
    sendImHandle () {
      if (!this.$CV.isEmpty(this.content)) {
        this.webSocket.send(this.memberC.type + '_msg_' + this.memberC.id + '_msg_' + this.content)
      }
      this.content = null
    },
    /**
     * 发送图片或文件消息
     * @param msgContent
     */
    sendImFileHandle (msgContent) {
      this.webSocket.send(this.memberC.type + '_msg_' + this.memberC.id + '_msg_' + msgContent)
    },
    /**
     * 关闭当前的聊天窗口
     */
    closeMember () {
      store.dispatch('closeChatImMember', this.memberC)
    }
  }
}
</script>
<style lang="scss">
  .app-chat-im-main-right{
    height: 500px;
    .chat-im-record{
      height: 350px;
      overflow-y: auto;
    }
    .chat-im-textarea{
      height: 70px;
      .ivu-input{
        border: 0px;
        resize: none;
      }
      .ivu-input:hover{
        border: 0px;
      }
      .ivu-input:focus{
        border: 0px;
        box-shadow: 0 0 0 0px rgba(45,140,240,.2);
      }
    }
    .chat-im-bootom{
      height: 40px;
      button{
        float: right;
      }
    }
  }
</style>
