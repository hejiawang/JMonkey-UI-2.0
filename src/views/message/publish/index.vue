<template>
  <Layout v-layoutIn>
    <Row>
      <Col span="8">
        <Button type="primary" @click="raiseHandle">新增</Button>
      </Col>
      <Col span="16">
        <Form ref="messageSearchForm" :model="listQuery" :label-width="80" inline style="float: right">
          <FormItem label="消息标题">
            <Input type="text" v-model="listQuery.title" />
          </FormItem>

          <FormItem :label-width="0">
            <ButtonGroup>
              <Button icon="ios-search" @click="search" />
              <Button icon="ios-trash-outline" @click="restSearch" />
            </ButtonGroup>
          </FormItem>
        </Form>
      </Col>
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
import store from '@/store'
import moment from 'moment'
import { list, del } from '@/api/message/message'
import CMessageView from '@/views/message/view'

export default {
  name: 'MessagePublish',
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
        title: null,
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
          width: 300,
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

      if (params.row.taskKey === 'publish') {
        eventArray.push(
          h('Button', {
            props: { type: 'warning', ghost: true },
            on: { click: () => { this.modifyHandle(params.row) } }
          }, '重新发布')
        )
      }

      eventArray.push(
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      )

      return h('div', eventArray)
    },
    /**
     * init message data list
     */
    initMessageList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.messageTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * search
     */
    search () {
      this.$refs.messagePage.rest()
      this.initMessageList()
    },
    /**
     * rest seach
     */
    restSearch () {
      ['title'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 新增消息
     */
    raiseHandle () {
      this.$router.replace({path: '/message/publish/form#publish_main'})
    },
    /**
     * 删除消息
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>该消息将被删除是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.restSearch()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * modify message
     * @param row
     */
    modifyHandle (row) {
      // TODO 在浏览器地址栏看见messageId了
      this.$router.replace({path: '/message/publish/form#publish_main', query: {messageId: row.id}})
    },
    /**
     * 查看消息
     * @param row
     */
    viewHandle (row) {
      this.showView = true; this.viewMessageId = row.id
    }
  }
}
</script>
