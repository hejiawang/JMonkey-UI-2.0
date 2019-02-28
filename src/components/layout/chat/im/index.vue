<template>
  <div>
    <Modal v-model="isShow" width="900" :mask-closable="false" :draggable="true"
           :footer-hide="true" @on-cancel="cancel" class="app-chat-im-index" @on-visible-change="visibleChange">
      <div slot="header" class="header">
        <Avatar shape="square" icon="ios-person" size="default" />
        <span class="member">{{memberC.name}}</span>
        <Icon type="ios-people" size="25" color="#19be6b" v-if="memberC.type === 'Group'"/>
      </div>
      <Row class="main">
        <Col span="5" class="main-left">
          <div class="member-info" >
            <div @click="selectMember" class="member-select">
              <Avatar shape="square" icon="ios-person" size="default" />
              <span class="member-name" style="">张三李四张是<Icon type="ios-more" /></span>
            </div>
            <Icon type="md-close" size="20" color="#ff9900" class="member-close" @click="closeMember"/>
          </div>

          <div class="member-info" style="background: #F3F3F3;">
            <div @click="selectMember" class="member-select">
              <Avatar shape="square" icon="ios-person" size="default" />
              <span class="member-name" style="">张三</span>
            </div>
            <Icon type="md-close" size="20" color="#ff9900" class="member-close" @click="closeMember"/>
          </div>
          <div class="member-info" >
            <div @click="selectMember" class="member-select">
              <Avatar shape="square" icon="ios-person" size="default" />
              <span class="member-name" style="">李四</span>
            </div>
            <Icon type="md-close" size="20" color="#ff9900" class="member-close" @click="closeMember"/>
          </div>
        </Col>

        <Col span="19" class="main-right">
          <Row class="chat-im-record">
            <Row class="chat-im-record-left">
              <div class="chat-im-record-image">
                <Avatar shape="square" icon="ios-person" size="default" />
              </div>
              <div class="chat-im-record-content">
                <div class="chat-im-record-user">
                  <span class="chat-im-record-user-name">张三</span>
                  <span>2019-02-27 12:21:00</span>
                </div>

                <div class="chat-im-record-text">
                  这是一些聊天
                </div>
              </div>
            </Row>
            <Row class="chat-im-record-left">
              <div class="chat-im-record-image">
                <Avatar shape="square" icon="ios-person" size="default" />
              </div>
              <div class="chat-im-record-content">
                <div class="chat-im-record-user">
                  <span class="chat-im-record-user-name">张三</span>
                  <span>2019-02-27 12:21:00</span>
                </div>

                <div class="chat-im-record-text">
                  <img src="http://49.4.54.245:8080/assets/message/chat/image/c05be91f7f1149b8933993fc83c265dd_42.jpg" preview="0" preview-text="1efsfe">
                </div>
              </div>
            </Row>

            <Row class="chat-im-record-right">
              <div class="chat-im-record-image">
                <Avatar shape="square" icon="ios-person" size="default" />
              </div>
              <div class="chat-im-record-content">
                <div class="chat-im-record-user">
                  <span class="chat-im-record-user-name">李四</span>
                  <span>2019-02-27 12:21:00</span>
                </div>

                <div class="chat-im-record-text">
                  这是
                </div>
              </div>
            </Row>
            <Row class="chat-im-record-right">
              <div class="chat-im-record-image">
                <Avatar shape="square" icon="ios-person" size="default" />
              </div>
              <div class="chat-im-record-content">
                <div class="chat-im-record-user">
                  <span class="chat-im-record-user-name">李四</span>
                  <span>2019-02-27 12:21:00</span>
                </div>

                <div class="chat-im-record-text">
                  <Tooltip content="重要文件请及时单击下载保存" placement="top">
                    <a ><Icon type="ios-folder-outline" size="25"/><span>要下载的文.txt</span></a>
                  </Tooltip>
                </div>
              </div>
            </Row>
            <Row class="chat-im-record-left">
              <div class="chat-im-record-image">
                <Avatar shape="square" icon="ios-person" size="default" />
              </div>
              <div class="chat-im-record-content">
                <div class="chat-im-record-user">
                  <span class="chat-im-record-user-name">李四</span>
                  <span>2019-02-27 12:21:00</span>
                </div>

                <div class="chat-im-record-text">
                  <Tooltip content="重要文件请及时单击下载保存" placement="top">
                    <a ><Icon type="ios-folder-outline" size="25"/><span>要下载的文.txt</span></a>
                  </Tooltip>
                </div>
              </div>
            </Row>
          </Row>

          <Row class="chat-im-tools">
            <Col span="20">
              <Icon type="ios-image-outline"  size="25"/>
              <Icon type="ios-folder-outline" size="25"/>
            </Col>
            <Col span="4">
              <div class="chat-im-history" @click="showHistoryHandle">
                <Icon type="md-attach" size="25" />
                <span style="font-size: 14px;">历史纪录</span>
              </div>
            </Col>
          </Row>

          <Row class="chat-im-textarea">
            <Input v-model="content" type="textarea" :rows="3" ref="chatImContent"
                   :autofocus="true" placeholder="请输入发送内容 ..." />
          </Row>

          <Row class="chat-im-bootom">
            <Button type="success" icon="md-paper-plane"> 发 送 </Button>
            <Button type="text"> 关 闭 </Button>
          </Row>
        </Col>
      </Row>
    </Modal>

    <CChatHistory v-model="showHistory" />
  </div>
</template>
<script>
import CChatHistory from '@/components/layout/chat/im/history'
import store from '@/store'

export default {
  name: 'CChatIm',
  components: {
    CChatHistory
  },
  computed: {
    isShow () { return store.getters.showIm },
    memberList () { return store.getters.memberList },
    memberC () { return store.getters.memberC }
  },
  data () {
    return {
      showHistory: false,
      content: null
    }
  },
  methods: {
    visibleChange (isOpen) {
      // if (isOpen) this.$refs.chatImContent.focus()
    },
    cancel () {
      store.commit('SET_SHOWIM', false)
      store.commit('CLEAR_MEMBERLIST')
    },
    selectMember () {
      console.info('selectMember')
    },
    closeMember () {
      console.info('closeMember')
    },
    showHistoryHandle () {
      this.showHistory = true
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

    .header{
      height: 35px;
      line-height: 35px;
      .member {
        margin: 0px 10px;
        font-size: 20px;
        color: #17233d;
        display: inline-block;
        text-align: center;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        vertical-align: middle;
        height: 32px;
      }
    }

    .main {
      height: 500px;
      .main-left{
        height: 500px;
        overflow-y: auto;
        background: #dcdee2;
        .member-info{
          cursor:pointer;
          padding: 8px 0px 8px 10px;
          line-height: 32px;
          font-size: 15px;
          height: 48px;
          .member-select{
            width: 150px;
            float: left;
            height: 32px;
          }
          .member-name{
            margin-left: 5px
          }
        }
        .member-close {
          float: right;
          line-height: 32px;
          margin-right: 5px;
          display: none;
        }
        .member-info:hover {
          background: #e8eaec;
        }
        .member-info:hover .member-close{
          display: block;
        }
      }

      .main-right{
        height: 500px;
        .chat-im-record{
          height: 350px;
          overflow-y: auto;
          .chat-im-record-right{
            margin: 15px;
            .chat-im-record-image{
              float: right;
              height: 40px;
              width: 50px;
              span{
                float: right;
              }
            }
            .chat-im-record-content{
              float: right;
              .chat-im-record-user{
                height: 21px;
                font-size: 14px;
                span{
                  float: right;

                }
                .chat-im-record-user-name{
                  color: #17233d;
                  margin-left: 10px;
                }
              }
              .chat-im-record-text{
                float: right;
                color: white;
                font-size: 14px;
                background: #19be6b;
                padding: 10px;
                border-radius: 3px;
                margin-top: 5px;
                max-width: 500px;
                img {
                  cursor: pointer;
                  max-height: 200px;
                  max-width: 200px;
                }
                a {
                  color: white;
                  span{
                    margin-left: 10px;
                  }
                }
              }
              .chat-im-record-text:after {
                content: '';
                position: absolute;
                right: 40px;
                top: 40px;
                width: 0;
                height: 0;
                border-style: solid dashed dashed;
                border-color: #19be6b transparent transparent;
                overflow: hidden;
                border-width: 10px;
              }
            }
          }
          .chat-im-record-left{
            margin: 15px;
            .chat-im-record-image{
              float: left;
              height: 40px;
              width: 50px;
            }
            .chat-im-record-content{
              float: left;
              .chat-im-record-user{
                font-size: 14px;
                .chat-im-record-user-name{
                  color: #17233d;
                  margin-right: 10px;
                }
              }
              .chat-im-record-text{
                float: left;
                font-size: 14px;
                background: #e8eaec;
                padding: 10px;
                border-radius: 3px;
                margin-top: 5px;
                max-width: 500px;
                img {
                  cursor: pointer;
                  max-height: 200px;
                  max-width: 200px;
                }
                a {
                  color: #515a6e;
                  span{
                    margin-left: 10px;
                  }
                }
              }
              .chat-im-record-text:after {
                content: '';
                position: absolute;
                left: 40px;
                top: 40px;
                width: 0;
                height: 0;
                border-style: solid dashed dashed;
                border-color: #e8eaec transparent transparent;
                overflow: hidden;
                border-width: 10px;
              }
            }
          }
        }
        .chat-im-tools{
          border-top: 1px solid #F1F1F1;
          height: 40px;
          line-height: 40px;
          .ivu-icon{
            margin-left: 20px;
          }
          .chat-im-history{
            cursor:pointer;
          }
          .chat-im-history:hover span{
            color: #2b85e4;
          }
          .chat-im-history:hover i{
            color: #2b85e4;
          }
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
    }
  }
</style>
