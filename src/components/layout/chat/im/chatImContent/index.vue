<template>
  <div>
    <Col :span="24 - mainSpan" class="app-chat-im-main-right">
      <Row class="chat-im-record">
        <CChatImContentLeft name="章第三" img="" sendDate="2019-02-27 12:21:00" content="发送一个内同"/>
        <CChatImContentRight name="里斯" img="" sendDate="2019-02-27 12:21:00" content="发送一个内同"/>

        <CChatImContentLeft name="章第三" img="" sendDate="2019-02-27 12:21:00"
                            content="<img src='http://49.4.54.245:8080/assets/message/chat/image/c05be91f7f1149b8933993fc83c265dd_42.jpg' preview='0' preview-text='1efsfe'>"/>
        <CChatImContentRight name="章第三" img="" sendDate="2019-02-27 12:21:00"
                            content="<img src='http://49.4.54.245:8080/assets/message/chat/image/c05be91f7f1149b8933993fc83c265dd_42.jpg' preview='0' preview-text='1efsfe'>"/>

        <CChatImContentLeft name="里斯" img="" sendDate="2019-02-27 12:21:00"
                             content="<a > <div></div><span>要下载as的文要文.txt</span></a>"/>
        <CChatImContentRight name="里斯" img="" sendDate="2019-02-27 12:21:00"
                            content="<a > <div></div><span>要下载as的文要文.txt</span></a>"/>
      </Row>

      <CChatImTools />

      <Row class="chat-im-textarea">
        <Input v-model="content" type="textarea" :rows="3" ref="chatImContent" :autofocus="true" placeholder="请输入发送内容 ..." />
      </Row>

      <Row class="chat-im-bootom">
        <Button type="success" icon="md-paper-plane" @click="sendImHadnle"> 发 送 </Button>
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
      content: null
    }
  },
  methods: {
    sendImHadnle () {
      console.info('sendImHadnle')
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
