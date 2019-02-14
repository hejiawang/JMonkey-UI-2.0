<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Alert show-icon>
        消 息 审 核 通 过 后 将 发 送 给 系 统 用 户 , 审 核 拒 绝 后 会 通 知 消 息 发 布 人 重 新 修 改 消 息 后 再 次 审 核 发 布
      </Alert>
    </Row>

    <Row>
      <Table :height="messageTableHeight" :loading="listLoading" border :columns="messageTableColumns" :data="messageTableData" />
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initMessageList" ref="messagePage"/>
    </Row>

    <CMessageView v-model="showView" :messageId="viewMessageId"/>
  </Layout>
</template>
<script>
import CMessageView from '@/views/message/view'
import store from '@/store'
import moment from 'moment'
import { auditList, audit } from '@/api/message/message'

export default {
  name: 'MessageAudit',
  components: {
    CMessageView
  },
  computed: {
    messageTableHeight () {
      return store.getters.windowHeight - 290
    }
  },
  data () {
    return {
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      messageTableColumns: [ ],
      messageTableData: [ ],
      showView: false,
      viewMessageId: '',
      tagColor: {
        auditMessage: 'warning',
        publish: 'error',
        endPublish: 'success'
      }
    }
  },
  created () {
    this.initMessageTableColumns()
    this.initMessageList()
  },
  methods: {
    /**
     * init table header
     */
    initMessageTableColumns () {
      this.messageTableColumns = [
        {title: '消息标题', key: 'title'},
        {title: '发布人', key: 'createName', width: 200},
        {
          title: '发布日期',
          key: 'createDate',
          width: 200,
          render: (h, params) => {
            let createDate = ''
            if (params.row.createDate) createDate = moment(params.row.createDate).format('YYYY-MM-DD')
            return h('span', createDate)
          }
        },
        {
          title: '消息等级',
          key: 'rate',
          width: 200,
          render: (h, params) => {
            return h('Rate', {
              props: { 'allow-half': true, value: Number(params.row.rate), disabled: true }
            })
          }
        },
        {
          title: '审核状态',
          key: 'state',
          width: 200,
          render: (h, params) => {
            return h('Tag', { props: { color: this.tagColor[params.row.taskKey] } }, params.row.taskName)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 250,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    /**
     * bind table event
     * @param h
     * @param params
     * @returns {*}
     */
    bindEvent (h, params) {
      let eventArray = []
      eventArray.push(
        h('Button', {
          props: { type: 'info', ghost: true },
          on: { click: () => { this.viewHandle(params.row) } }
        }, '预览')
      )

      if (params.row.taskKey === 'auditMessage') {
        eventArray.push(
          h('Button', {
            props: { type: 'warning', ghost: true },
            on: { click: () => { this.auditHandle(params.row) } }
          }, '审核')
        )
      }

      return h('div', eventArray)
    },
    /**
     * init message data list
     */
    initMessageList () {
      this.listLoading = true
      auditList(this.listQuery).then(data => {
        this.messageTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * 查看消息
     * @param row
     */
    viewHandle (row) {
      this.showView = true; this.viewMessageId = row.id
    },
    /**
     * 审核消息
     * @param row 消息
     */
    auditHandle (row) {
      this.$CConfirm({
        'content': '请审核该消息内容',
        'yesConfirm': () => {
          audit(true, row.taskId, row.id).then(() => { this.initMessageList() })
        },
        'noConfirm': () => {
          audit(false, row.taskId, row.id).then(() => { this.initMessageList() })
        }
      })
    }
  }
}
</script>
