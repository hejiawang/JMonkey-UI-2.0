<template>
  <div>
    <div class="app-layout-chat" @click="showChat">
      <Icon type="ios-chatbubbles-outline" size="30" color="#f8f8f9"/>
      <span class="chat-text">快捷通讯</span>
    </div>

    <CChatMain v-model="isShow"/>

    <div v-if="showWaring" class="app-layout-chat-waring animated wobble" @click="imHandle">
      <Icon type="md-notifications-outline" size="30" color="#f8f8f9"/>
      <span class="chat-waring-text">您有新的消息</span>
    </div>

    <CChatIm />
  </div>
</template>
<script>
import CChatMain from '@/components/layout/chat/main/chatMain'
import CChatIm from '@/components/layout/chat/im'

export default {
  name: 'CChat',
  components: {
    CChatMain, CChatIm
  },
  data () {
    return {
      showWaring: false,
      isShow: false,
      webSocket: null
    }
  },
  created () {
    this.registerWebSocket()
  },
  methods: {
    showChat () {
      this.isShow = true
      this.showWaring = true
    },
    imHandle () {
    },
    registerWebSocket () {
      if ('WebSocket' in window) {
        var wsUrl = 'ws://' + window.document.location.host + '/socket/ms/chat/im'
        this.webSocket = new WebSocket(wsUrl)

        this.webSocket.onerror = function (event) {
          console.info('webSocket.onerror')
        }

        this.webSocket.onmessage = function (event) {
          console.info(event)
        }
      } else {
        this.$Message.error('您使用的浏览器版本不支持WebSocket技术,无法进行快捷通讯,请更换浏览器')
      }
    }
  }
}
</script>
<style lang="scss">
  .app-layout-chat-waring{
    box-shadow: 0px 5px 20px #ff9900;
    background: #ff9900;
    position: absolute;
    bottom: 0px;
    right: 47%;
    height: 50px;
    width: 180px;
    line-height: 50px;
    text-align: center;
    cursor:pointer;
    .chat-waring-text {
      color: #f8f8f9;
      margin-left: 10px;
      font-size: 17px;
    }
  }
  .app-layout-chat {
    box-shadow: 0px 5px 20px #5cadff;
    background: #5cadff;
    position: absolute;
    bottom: 0px;
    right: 0px;
    height: 50px;
    width: 180px;
    line-height: 50px;
    text-align: center;
    cursor:pointer;
    .chat-text {
      color: #f8f8f9;
      margin-left: 10px;
      font-size: 17px;
    }
  }
</style>
