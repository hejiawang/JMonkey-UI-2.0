<template>
  <div>
    <div class="app-layout-chat" @click="showChat">
      <Icon type="ios-chatbubbles-outline" size="30" color="#f8f8f9"/>
      <span class="chat-text">快捷通讯</span>
    </div>

    <CChatMain v-model="isShow"/>

    <div v-if="showWaring" class="app-layout-chat-waring animated wobble" @click="imHandle">
      <Badge :count="memberNotifyList.length">
        <Icon type="md-notifications-outline" size="30" color="#f8f8f9"/>
      </Badge>
      <span class="chat-waring-text">您有新的消息</span>
    </div>

    <CChatIm />
  </div>
</template>
<script>
import CChatMain from '@/components/layout/chat/main/chatMain'
import CChatIm from '@/components/layout/chat/im'
import store from '@/store'

export default {
  name: 'CChat',
  components: {
    CChatMain, CChatIm
  },
  computed: {
    /**
     * memberNotifyList
     */
    memberNotifyList () { return store.getters.memberNotifyList },
    /**
     * 是否显示消息提醒
     * @returns {boolean}
     */
    showWaring () { return store.getters.memberNotifyList.length > 0 }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showChat () {
      this.isShow = true
    },
    imHandle () {
      store.commit('SET_SHOWIM', true)

      store.commit('SET_MEMBERLIST', this.memberNotifyList[0])
      store.commit('SET_MEMBERC', this.memberNotifyList[0])

      store.commit('DELETE_MEMBERNOTIFYLIST')
    }
  }
}
</script>
<style lang="scss">
  .app-layout-chat-waring{
    z-index: 99;
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
    z-index: 99;
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
