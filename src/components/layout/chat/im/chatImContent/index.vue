<template>
  <div>
    <Col :span="24 - mainSpan" class="app-chat-im-main-right">
      <Row class="chat-im-record" ref="testT">
        <template v-for="(c, index) in contentList">
          <CChatImContentLeft :key="index" v-if="c.senderId !== userC.id"
                              :name="c.senderName" :img="c.senderPhoto" :sendDate="c.senderDate" :content="c.msg"/>

          <CChatImContentRight :key="index" v-else
                              :name="c.senderName" :img="c.senderPhoto" :sendDate="c.senderDate" :content="c.msg"/>
        </template>
      </Row>

      <CChatImTools @uploadCallBack="sendImFileHandle"/>

      <Row class="chat-im-textarea">
        <Input v-model.trim="content" type="textarea" :rows="3" ref="chatImContent"
               :autofocus="true" placeholder="请输入发送内容 ..." @keyup.enter.native="sendImHandle"/>
      </Row>

      <Row class="chat-im-bootom">
        <Button type="success" icon="md-paper-plane" @click="sendImHandle"> 发 送 </Button>
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
      webSocket: null
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
    registerWebSocket () {
      if ('WebSocket' in window) {
        let _t = this
        let wsUrl = 'ws://' + window.document.location.host + '/socket/ms/chat/im?userId=' + this.userC.id + '&realName=' + this.userC.realName + '&userPhoto=' + this.userC.photo
        this.webSocket = new WebSocket(wsUrl)

        this.webSocket.onerror = function (event) { this.$Message.error('服务器异常, 请联系管理员') }
        // this.webSocket.onclose = function (event) { console.info('onclose') }
        // this.webSocket.onopen = function (event) { console.info('onopen ') }

        this.webSocket.onmessage = function (event) {
          _t.receiveMessage(JSON.parse(event.data))
        }
      } else {
        this.$Message.error('您使用的浏览器版本不支持WebSocket技术,无法进行快捷通讯,请更换浏览器')
      }
    },
    /**
     * 接收消息
     * @param msgObject
     */
    receiveMessage (msgObject) {
      this.contentList.push(msgObject)

      this.$nextTick(() => {
        this.$refs.testT.$el.scrollTop = this.$refs.testT.$el.scrollHeight
      })
    },
    sendImHandle () {
      if (!this.$CV.isEmpty(this.content)) {
        this.webSocket.send(this.memberC.id + '_msg_' + this.content)
        this.content = null
      }
    },
    /**
     * sendImFileHandle
     * @param msgContent
     */
    sendImFileHandle (msgContent) {
      this.webSocket.send(this.memberC.id + '_msg_' + msgContent)
    },
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
