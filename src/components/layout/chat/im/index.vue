<template>
  <div>
    <Modal v-model="isShow" width="900" :mask-closable="false" :draggable="true"
           :footer-hide="true" @on-cancel="cancel" class="app-chat-im-index" @on-visible-change="visibleChange">
      <div slot="header" class="header">
        <Avatar shape="square" icon="ios-person" size="default" />
        <span class="member">张三李四张三李四一个</span>
        <Icon type="ios-people" size="25" color="#19be6b"/>
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
          <Row class="chat-im-record"></Row>
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
            <Button type="success" icon="md-paper-plane">发 送</Button>
            <Button type="text">关 闭</Button>
          </Row>
        </Col>
      </Row>
    </Modal>

    <CChatHistory v-model="showHistory" />
  </div>
</template>
<script>
import CChatHistory from '@/components/layout/chat/im/history'

export default {
  name: 'CChatIm',
  components: {
    CChatHistory
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
      showHistory: false,
      isShow: false,
      content: null
    }
  },
  methods: {
    visibleChange (isOpen) {
      // if (isOpen) this.$refs.chatImContent.focus()
    },
    cancel () {
      console.info('cancel')
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
