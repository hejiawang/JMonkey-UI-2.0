<template>
  <Drawer title="系统信息列表" width="800" v-model="isShow" @on-visible-change="showDrawer" placement="left" class="app-message-list">
    <div class="message-body">
      <Row class="message-content" v-for="(ms, index) in messageTableData" :key="index">
        <Card style="width: 100%">
          <p slot="title">
            <Tag color="magenta">{{index + 1}}</Tag>
            <span v-if="ms.readState === 'No'" style="color: #17233d">{{ms.title}}</span>
            <span v-else style="color: #808695;">{{ms.title}}</span>
          </p>
          <a @click="readMessage(ms.id)" slot="extra">
            <Icon type="ios-loop-strong" /> 详情
          </a>
          <div>
            <Row class="message-content-bottom">
              <Col span="8"> <span><Icon type="ios-notifications-outline" size="17" color="#ff9900"/> 发布人： {{ms.createName}}</span> </Col>
              <Col span="9"> <span><Icon type="md-timer" size="17" color="#ff9900"/> 发布日期： {{ms.createDate | createDateFilter}}</span> </Col>
              <Col span="7"> <Rate allow-half :value="parseInt(ms.rate)" disabled/> </Col>
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
import { readList } from '@/api/message/message'
import { read } from '@/api/message/read'
import moment from 'moment'

export default {
  name: 'MessageList',
  props: {
    value: {type: Boolean, default: false, required: true}
  },
  filters: {
    createDateFilter (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      isShow: false,
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      messageTableData: [ ]
    }
  },
  methods: {
    /**
     * init message list data
     */
    initList () {
      readList(this.listQuery).then(data => {
        this.messageTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})
      })
    },
    /**
     * read message detail
     */
    readMessage (messageId) {
      read(messageId).then(() => {
        this.$emit('on-countMessage', '')

        // TODO go read message
      })
    },
    /**
     * drawer open, init message list data
     * @param isOpen true is open
     */
    showDrawer (isOpen) {
      if (isOpen) this.initList()
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
