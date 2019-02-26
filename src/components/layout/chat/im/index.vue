<template>
  <Modal v-model="isShow" width="900" :mask-closable="false" :draggable="true" :footer-hide="true" @on-cancel="cancel" class="app-chat-im-index">
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

      <Col span="19"></Col>
    </Row>
  </Modal>
</template>
<script>
export default {
  name: 'CChatIm',
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
    cancel () {
      console.info('cancel')
    },
    selectMember () {
      console.info('selectMember')
    },
    closeMember () {
      console.info('closeMember')
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
    }
  }
</style>
