<template>
  <div>
    <div class="app-layout-chat-main" v-if="isShow" >
      <Row class="chat-main-title">
        <Col span="22">
          <span>超级管理员</span>
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
          <TabPane icon="md-person">
            <Collapse simple class="chat-mian-content-single">
              <Panel name="1">
                技术部 <span>(1)</span>
                <div slot="content">
                  <div class="chat-user-info">
                    <Avatar shape="square" icon="ios-person" size="default" />
                    <span class="chat-user-info-name">超级管理员</span>
                  </div>
                  <div class="chat-user-info">
                    <Avatar shape="square" icon="ios-person" size="default" />
                    <span class="chat-user-info-name">办案好几十</span>
                  </div>
                  <div class="chat-user-info">
                    <Avatar shape="square" icon="ios-person" size="default" />
                    <span class="chat-user-info-name">张三</span>
                  </div>
                </div>
              </Panel>
              <Panel name="2">
                研发部 <span>(0)</span>
                <div slot="content">
                  <div class="chat-user-none">
                    <span>该部门暂无人员</span>
                  </div>
                </div>
              </Panel>
              <Panel name="3">
                开发部 <span>(0)</span>
                <div slot="content">
                  <div class="chat-user-none">
                    <span>该部门暂无人员</span>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </TabPane>

          <TabPane icon="md-contacts">
            <div class="chat-mian-content-group">
              <div class="chat-group-info" >
                <div class="chat-group-img">
                  <Avatar shape="square" icon="ios-people" size="default" />
                </div>
                <div class="chat-group-name">
                  <a href="#" @click="handleIM">第不知道几次会议交流群</a>
                </div>
                <div class="chat-group-option">
                  <span>创建人: </span>
                  <span> 超级管理员 </span>

                  <Icon type="ios-trash-outline" size="17" @click="handleIMClear"/>
                  <Icon type="ios-build" size="17" @click="handleIMSetting"/>
                </div>
              </div>

              <div class="chat-group-info">
                <div class="chat-group-img">
                  <Avatar shape="square" icon="ios-people" size="default" />
                </div>
                <div class="chat-group-name">
                  <a href="#" @click="handleIM">没事聊一聊</a>
                </div>
                <div class="chat-group-option">
                  <span>创建人: </span>
                  <span> 里斯 </span>

                  <Icon type="ios-trash-outline" size="17"/>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Row>

      <CChatMainFooter />
    </div>
  </div>
</template>
<script>
import CChatMainFooter from '@/components/layout/chat/chatMainFooter'

export default {
  name: 'CChatMain',
  components: {
    CChatMainFooter
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
  methods: {
    closeChat () {
      this.isShow = false
    },
    handleIM () {
      console.info('handleIM')
    },
    handleIMClear () {
      console.info('handleIMClear')
    },
    handleIMSetting () {
      console.info('handleIMSetting')
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

      .chat-mian-content-single {
        border: 0px;

        .ivu-collapse-item {
          border: 0px;
          .ivu-collapse-header {
            margin-right: 10px;
            font-size: 17px;
            padding-left: 0px;
            .ivu-icon {
              margin-right: 5px;
            }
            span {
              color: #c5c8ce;
            }
          }

          .ivu-collapse-content{
            .chat-user-info {
              padding: 0px 15px;
              cursor:pointer;
              height: 40px;
              line-height: 40px;
              .chat-user-info-name {
                margin-left: 10px;
                font-size: 17px;
              }
            }
            .chat-user-info:hover {
              background: #e8eaec;
              color: #17233d;
            }
            .chat-user-none {
              padding: 0px 15px;
              height: 30px;
              line-height: 30px;
              span {
                font-size: 14px;
                color: #c5c8ce;
              }
            }
          }
        }
      }

      .chat-mian-content-group {
        .chat-group-info {
          height: 60px;
          margin-bottom: 10px;
          .chat-group-img {
            float: left;
            line-height: 60px;
            .ivu-avatar {
              width: 40px;
              height: 40px;
              font-size: 30px;
              line-height: 40px;
              background: #5cadff;
            }
          }

          .chat-group-name{
            margin-left: 10px;
            height: 30px;
            float: left;
            width: 200px;
            font-size: 17px;
            line-height: 40px;
            a{
              color: #17233d;
            }
            a:hover {
              color: #5cadff;
            }
          }

          .chat-group-option{
            margin-left: 10px;
            color: #808695;
            float: left;
            width: 200px;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            .ivu-icon {
              float: right;
              line-height: 30px;
              margin-left: 10px;
              cursor:pointer;
            }
            .ivu-icon:hover {
              color: #ff9900;
            }
          }
        }
        .chat-group-info:hover {
          background: #e8eaec;
        }
      }
    }
  }
</style>
