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
  </Layout>
</template>
<script>
import store from '@/store'
import moment from 'moment'
import { list } from '@/api/message/message'

export default {
  name: 'MessagePublish',
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
      messageTableData: [ ]
    }
  },
  created () {
    this.initMessageTableColumns()
    this.initMessageList()
  },
  methods: {
    initMessageTableColumns () {
      this.messageTableColumns = [
        {title: '消息标题', key: 'title'},
        {title: '发布人', key: 'createBy', width: 200},
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
            if (params.row.state === 'No') return h('Tag', { props: { color: 'error' } }, '审核拒绝')
            else if (params.row.state === 'Yes') return h('Tag', { props: { color: 'success' } }, '审核通过')
            return h('Tag', { props: { color: 'warning' } }, '正在审核')
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    bindEvent (h, params) {
      return h('div', [
        h('Button', {
          props: { type: 'warning', ghost: true }
        }, '编辑'),
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      ])
    },
    initMessageList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.messageTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    search () {

    },
    restSearch () {

    },
    raiseHandle () {
      this.$router.replace({path: '/message/publish/form#publish_main'})
    },
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>该消息将被删除是否继续？</p>',
        'confirm': () => {
          console.info(1)
        }
      })
    }
  }
}
</script>
