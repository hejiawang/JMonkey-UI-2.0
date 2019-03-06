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
               :autofocus="true" :maxlength="200" placeholder="请输入发送内容 ..." @keyup.enter.native="sendImHandle"/>
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
import CChatImContentLeft from '@/components/layout/chat/im/chatImContent/chatImContentLeft'
import CChatImContentRight from '@/components/layout/chat/im/chatImContent/chatImContentRight'
import CChatImTools from '@/components/layout/chat/im/chatImContent/chatImTools'
import { list } from '@/api/message/chatHistory'

/**
 * 聊天内容
 */
export default {
  name: 'CChatImContent',
  components: {
    CChatImContentLeft, CChatImContentRight, CChatImTools
  },
  computed: {
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
    /**
     * 当正在对话的人变了的时候, 获取聊天记录
     * TODO bug： 刷新页面后没有显示历史聊天记录（暂不修改）
     */
    memberC (val) {
      let listQuery = {
        current: 1,
        size: 10,
        type: val.type,
        senderId: this.userC.id,
        receiverId: val.id
      }
      list(listQuery).then(data => {
        this.contentList = data.rows

        this.$nextTick(() => {
          if (this.$refs.testT && this.$refs.testT.$el) {
            this.$refs.testT.$el.scrollTop = this.$refs.testT.$el.scrollHeight
          }
        })
      })
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
      _t.webSocket.onclose = function (event) { _t.webSocketOpening = true }
      _t.webSocket.onmessage = function (event) { _t.receiveMessage(JSON.parse(event.data)) }
    },
    /**
     * 接收消息
     * @param msgObject
     */
    receiveMessage (msgObject) {
      // TODO bug 当跟自己聊天时，其他人发来消息是，在跟自己聊天的窗口能收到消息。。。
      if ((msgObject.imType === this.memberC.type) &&
        (msgObject.receiverId === this.memberC.id || msgObject.senderId === this.memberC.id)) {
        // 如果开着聊天窗口，显示聊天内容
        this.receiveMessageContent(msgObject)
      } else {
        // 如果聊天窗口处于关闭状态，提示有新消息
        this.nofityMessage(msgObject)
      }
    },
    /**
     * 接收到消息后显示消息
     */
    receiveMessageContent (msgObject) {
      this.contentList.push(msgObject)

      // 滚动条到最下方
      this.$nextTick(() => {
        if (this.$refs.testT && this.$refs.testT.$el) {
          this.$refs.testT.$el.scrollTop = this.$refs.testT.$el.scrollHeight
        }
      })
    },
    /**
     * 接收到消息后提醒
     */
    nofityMessage (msgObject) {
      let o, photoPath
      if (msgObject.imType === 'Single') {
        photoPath = msgObject.senderPhoto === 'null' ? null : msgObject.senderPhoto
        o = {type: msgObject.imType, id: msgObject.senderId, name: msgObject.senderName, img: photoPath}
      } else {
        photoPath = msgObject.receiverImg === 'null' ? null : msgObject.receiverImg
        o = {type: msgObject.imType, id: msgObject.receiverId, name: msgObject.receiverName, img: photoPath}
      }

      store.commit('SET_MEMBERNOTIFYLIST', o)
    },
    /**
     * 发送文字消息
     */
    sendImHandle () {
      if (!this.$CV.isEmpty(this.content)) {
        this.webSocket.send(this.memberC.type + '_msg_' + this.memberC.id + '_msg_' + this.memberC.name + '_msg_' + this.memberC.img + '_msg_' + this.content)
      }

      this.content = null
    },
    /**
     * 发送图片或文件消息
     * @param msgContent
     */
    sendImFileHandle (msgContent) {
      this.webSocket.send(this.memberC.type + '_msg_' + this.memberC.id + '_msg_' + this.memberC.name + '_msg_' + this.memberC.img + '_msg_' + msgContent)
    },
    /**
     * 关闭当前的聊天窗口
     */
    closeMember () {
      store.dispatch('closeChatImMember', this.memberC)
    }
  },
  /**
   * vue实例销毁的回调函数
   */
  destroyed () {
    // 当websocket关闭后, 关闭聊天窗口
    store.dispatch('closeChatIm')

    /*
    * 这个if很重要，如果没有这个if，会出现bug : WebSocket is closed before the connection is established.
    * 导致原因： 由引导页进入一个全屏模块时，要在index页面中跳转，
    *   而index页面会包含聊天组件，在链接websocket时，可能还没有连上就要跳转下一个页面了，而这时调用websocket.close，
    *   就会触发webSocket.onerror事件
    * */
    // 注意：一定要关闭webSocket的链接
    if (!this.webSocketOpening) this.webSocket.close()
    this.webSocket = null
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
