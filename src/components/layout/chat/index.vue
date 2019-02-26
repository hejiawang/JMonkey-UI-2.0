<template>
  <div>
    <div class="app-layout-chat" @click="showChat">
      <Icon type="ios-chatbubbles-outline" size="30" color="#f8f8f9"/>
      <span class="chat-text">快捷通讯</span>
    </div>

    <CChatMain v-model="isShow"/>
  </div>
</template>
<script>
import CChatMain from '@/components/layout/chat/main/chatMain'

export default {
  name: 'CChat',
  components: {
    CChatMain
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showChat () {
      this.isShow = true
    }
  }
}
</script>
<style lang="scss">
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
