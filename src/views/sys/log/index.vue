<template>
  <Layout v-layoutIn class="app-sys-log">
    <Row style="height: 60px;"><Button type="error" @click="deleteHandle">清空日志</Button></Row>
    <Row>
      <Table :height="logTableHeight" :loading="listLoading" border :columns="logTableColumns" :data="logTableData" />
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="logPage"/>
    </Row>
  </Layout>
</template>
<script>
import { list, del } from '@/api/sys/log'
import store from '@/store'
import moment from 'moment'

export default {
  name: 'SysLog',
  data () {
    return {
      listLoading: false,
      logTableColumns: [],
      logTableData: [],
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  computed: {
    /**
     * 表格高度
     */
    logTableHeight () {
      return store.getters.windowHeight - 290
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * 表格头
     */
    initTableColumns () {
      this.logTableColumns = [
        {title: '用户名称', key: 'userName', width: 120},
        {title: '操作ip', key: 'ip'},
        {title: '请求路径', key: 'url'},
        {title: '请求方式', key: 'httpMethod', width: 120},
        {title: '请求方法', key: 'classMethod'},
        {title: '请求参数', key: 'param'},
        {title: '操作时长', key: 'handleLength', width: 120},
        {
          title: '操作时间',
          key: 'createDate',
          width: 130,
          render: (h, params) => {
            let d = ''
            if (params.row.createDate) d = moment(params.row.createDate).format('YYYY-MM-DD HH:mm:ss')
            return h('span', d)
          }
        }
      ]
    },
    /**
     * 获取日志列表数据
     */
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.logTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * 清空日志信息
     */
    deleteHandle () {
      this.$CDelete({
        'content': '<p>日志清空后不能恢复</p><p>是否继续？</p>',
        'confirm': () => {
          del().then(() => {
            this.initList()
            this.$Message.success('删除成功')
          })
        }
      })
    }
  }
}
</script>
