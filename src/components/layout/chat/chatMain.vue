<template>
  <div>
    <div class="app-layout-chat-main" v-if="isShow" >
      <Row class="chat-main-title">
        <Col span="22">
          <span>{{realName}}</span>
          <Icon type="ios-chatbubbles" color="#19be6b"/>
        </Col>
        <Col span="2" class="close">
          <Icon type="md-close" color="#ff9900" size="20" @click="closeChat"/>
        </Col>
      </Row>

      <Row class="chat-main-warning">
        <Alert type="warning" >7日前信息将自动清除, 重要信息请尽快保存</Alert>
      </Row>

      <Row class="chat-main-content">
        <Tabs>
          <TabPane icon="md-person"> <CChatMainSingle /> </TabPane>
          <TabPane icon="md-contacts">  <CChatMainGroup ref="ChatMainGroup" /> </TabPane>
        </Tabs>
      </Row>

      <CChatMainFooter @refreshGroup="refreshGroupList"/>
    </div>
  </div>
</template>
<script>
import CChatMainFooter from '@/components/layout/chat/chatMainFooter'
import CChatMainSingle from '@/components/layout/chat/chatMainSingle'
import CChatMainGroup from '@/components/layout/chat/chatMainGroup'
import store from '@/store'

export default {
  name: 'CChatMain',
  components: {
    CChatMainFooter, CChatMainSingle, CChatMainGroup
  },
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    realName () {
      return store.getters.user.realName
    }
  },
  methods: {
    closeChat () {
      this.isShow = false
    },
    refreshGroupList () {
      this.$refs.ChatMainGroup.initGroupList()
    }
  }
}
</script>
<style lang="scss">
  .app-layout-chat-main{
    position: absolute;
    background: #f8f8f9;
    box-shadow: 0px 5px 20px #5cadff;
    bottom: 0px;
    right: 0px;
    height: 600px;
    width: 300px;
    border-left: 0px solid #2b85e4;
    border-top: 0px solid #2b85e4;
    z-index: 999;

    .chat-main-title {
      height: 50px;
      line-height: 50px;
      font-size: 17px;
      padding: 0px 10px;

      .close{
        cursor:pointer;
      }
    }

    .chat-main-warning {
      height: 32px;
      .ivu-alert{
        font-size: 14px;
        line-height: 14px;
        padding: 8px 10px 8px 10px;
      }
    }

    .chat-main-content {
      height: 468px;

      .ivu-tabs {
        .ivu-tabs-bar {
          margin-bottom: 15px;
          .ivu-tabs-nav {
            width: 100%;
          }
          .ivu-tabs-tab {
            text-align: center;
            width: 140px;
          }
          .ivu-icon {
            font-size: 25px;
            width: 20px;
            height: 20px;
          }
        }

        .ivu-tabs-tabpane {
          line-height: 17px;
          padding: 0px 10px;
          height: 420px;
          overflow-y: auto;
        }
      }
    }
  }
</style>
