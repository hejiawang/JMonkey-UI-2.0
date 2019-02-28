<template>
  <Modal v-model="isShow" width="900" :mask-closable="false" :draggable="true"
         :footer-hide="true" @on-cancel="cancel" class="app-chat-im-index">
    <div slot="header" >
      <CChatImHeader />
    </div>

    <Row class="main">
      <CChatImMember />
      <CChatImContent />
    </Row>
  </Modal>
</template>
<script>
import CChatImHeader from '@/components/layout/chat/im/chatImHeader'
import CChatImMember from '@/components/layout/chat/im/chatImMember'
import CChatImContent from '@/components/layout/chat/im/chatImContent'
import store from '@/store'

export default {
  name: 'CChatIm',
  components: {
    CChatImHeader, CChatImMember, CChatImContent
  },
  computed: {
    /**
     * is show im modal
     */
    isShow () { return store.getters.showIm }
  },
  methods: {
    cancel () {
      store.dispatch('closeChatIm')
    }
  }
}
</script>
<style lang="scss">
  .app-chat-im-index{
    .ivu-modal-header{
      padding: 10px;
    }
    .ivu-modal-content{
      box-shadow: 1px 1px 50px rgba(0,0,0,.5);
    }
    .ivu-modal-body{
      padding: 0px;
    }

    .main {
      height: 500px;
    }
  }
</style>
