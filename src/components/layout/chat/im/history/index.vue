<template>
  <Drawer title="聊天记录" width="700" v-model="isShow" class="app-chat-im-history" @on-visible-change="visibleChange">
    <Row class="app-chat-im-history-body">
      <template v-for="(c, index) in contentList">
        <CChatImContentRight :key="index" v-if="c.senderId === userC.id"
                             :name="c.senderName" :img="c.senderPhoto" :sendDate="c.senderDate" :content="c.msg"/>

        <CChatImContentLeft :key="index" v-else
                            :name="c.senderName" :img="c.senderPhoto" :sendDate="c.senderDate" :content="c.msg"/>
      </template>
    </Row>
    <Row class="app-chat-im-history-bottom">
      <CPage v-model="listQuery" @on-list="initChatImHistoryList" ref="chatImHistoryPage"/>
    </Row>
  </Drawer>
</template>
<script>
import CChatImContentLeft from '@/components/layout/chat/im/chatImContent/chatImContentLeft'
import CChatImContentRight from '@/components/layout/chat/im/chatImContent/chatImContentRight'
import store from '@/store'
import { list } from '@/api/message/chatHistory'

/**
 * 聊天历史纪录
 */
export default {
  name: 'CChatHistoryList',
  components: {
    CChatImContentLeft, CChatImContentRight
  },
  computed: {
    /**
     * 当前聊天的人
     */
    memberC () { return store.getters.memberC },
    /**
     * 当前登录人
     */
    userC () { return store.getters.user }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) },
    memberC (val) {
      if (this.isShow) {
        this.listQuery = { current: 1, size: 10, total: 0 }
        this.initChatImHistoryList()
      }
    }
  },
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  data () {
    return {
      isShow: false,
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      contentList: []
    }
  },
  methods: {
    initChatImHistoryList () {
      this.listQuery.type = this.memberC.type
      this.listQuery.senderId = this.userC.id
      this.listQuery.receiverId = this.memberC.id

      list(this.listQuery).then(data => {
        this.contentList = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})
      })
    },
    visibleChange (isOpen) {
      if (isOpen) this.initChatImHistoryList()
    }
  }
}
</script>
<style lang="scss">
  .app-chat-im-history{
    .app-chat-im-history-body{
      height: calc(100% - 60px);
      overflow-y: auto;
    }
    .app-chat-im-history-bottom{
      position: absolute;
      width: calc(100% - 20px);
      height: 60px;
      border-top: 1px solid #e8e8e8;
      padding: 10px;
      bottom: 0px;
    }
  }
</style>
