<template>
  <Drawer title="系统信息列表" width="600" v-model="isShow" @on-visible-change="showDrawer" placement="left" class="app-message-list">
    <div class="message-body">
      <Row class="message-content">
        <Card style="width: 100%">
          <p slot="title">
            <Tag color="magenta">1</Tag>
            <span style="color: #17233d">关于2019年放假的通告 一个唯独唯独未读过的未读过的息</span>
          </p>
          <a @click="readMessage" slot="extra">
            <Icon type="ios-loop-strong" /> 详情
          </a>
          <div>
            <Row class="message-content-bottom">
              <Col span="8"> <span>发布人： 超级管理员</span> </Col>
              <Col span="9"> <span>发布时间： 2019-01-01</span> </Col>
              <Col span="7"> <Rate allow-half :value="3" disabled/> </Col>
            </Row>
          </div>
        </Card>
      </Row>

      <Row class="message-content">
        <Card style="width: 100%">
          <p slot="title">
            <Tag color="magenta">2</Tag>
            <span style="color: #808695;">关于2019年放假的通告</span>
          </p>
          <a @click="readMessage" slot="extra">
            <Icon type="ios-loop-strong" /> 详情
          </a>
          <div>
            <Row class="message-content-bottom">
              <Col span="8"> <span>发布人： 超级管理员</span> </Col>
              <Col span="9"> <span>发布时间： 2019-01-01</span> </Col>
              <Col span="7"> <Rate allow-half :value="1.5" disabled/> </Col>
            </Row>
          </div>
        </Card>
      </Row>
    </div>
    <div class="message-page">
      <CPage v-model="listQuery" @on-list="initList" ref="messageListPage"/>
    </div>
  </Drawer>
</template>
<script>
export default {
  name: 'MessageList',
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      isShow: false,
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    initList () {},
    readMessage () {
      this.$emit('on-countMessage', '')
    },
    showDrawer (isOpen) {
      console.info(isOpen)
    }
  }
}
</script>
<style lang="scss">
  .app-message-list{
    .ivu-card-body {
      padding: 5px 16px;
    }
    .message-body{
      height: calc(100% - 50px);
      overflow-y: auto
    }
    .message-page{
      height: 50px;
    }
    .message-content {
      margin-bottom: 25px;
    }
    .message-content-bottom {
      span {
        line-height: 32px;
      }
    }
  }
</style>
