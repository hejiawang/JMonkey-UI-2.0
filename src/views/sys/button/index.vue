<template>
  <Layout v-layoutIn>
    <Row :gutter="32" style="height: 100%;">
      <Col span="5" style="height: 100%;">
        <Card style="height: 100%;">
          <p slot="title">
            <Icon type="md-apps"></Icon>
            <Tag color="warning">未选择菜单</Tag>
          </p>
          <Tree :data="resourceTreeDate" :render="renderTreeContent" ref="resourceTree"></Tree>
        </Card>
      </Col>
      <Col span="19">
        <Row style="height: 53px;"> <Button type="primary">新增</Button> </Row>
        <Table :height="buttonTableHeight" border :columns="buttonTableColumns" :data="buttonTableData" stripe></Table>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { smtree } from '@/api/sys/resource'

export default {
  name: 'SysButton',
  data () {
    return {
      resourceTreeDate: [],
      buttonTableColumns: [],
      buttonTableData: [
        {id: 'id1', name: '新增', method: 'Get', path: '/sys/button/save', perrison: 'sys_button_add'},
        {id: 'id2', name: '修改', method: 'Get', path: '/sys/button/save', perrison: 'sys_button_add'}
      ]
    }
  },
  computed: {
    buttonTableHeight () {
      return store.getters.windowHeight - 230
    }
  },
  created () {
    this.initTableColumns()
    this.initResourceTree()
  },
  methods: {
    initTableColumns () {
      this.buttonTableColumns = [
        {title: '名称', key: 'name'},
        {title: '请求方式', key: 'method'},
        {title: '请求路径', key: 'path'},
        {title: '权限标识', key: 'perrison'},
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'primary', ghost: true }
              }, '查看'),
              h('Button', {
                props: { type: 'warning', ghost: true }
              }, '编辑'),
              h('Button', {
                props: { type: 'error', ghost: true }
              }, '删除')
            ])
          }
        }
      ]
    },
    initResourceTree () {
      smtree().then(data => {
        this.resourceTreeDate = data.result
      })
    },
    renderTreeContent (h, { root, node, data }) {
      let iconType = ''
      if (data.type === 'System') iconType = 'md-apps'
      else if (data.type === 'Menu') iconType = 'ios-menu'

      return h('span',
        {
          class: 'ivu-tree-title',
          on: { click: (e) => {
            this.buildTreeStyle(e)
            // this.initButtonTable(data)
          }}
        },
        [
          h('Icon', {
            props: { type: iconType },
            style: { marginRight: '8px' }
          }),
          h('span', data.name)
        ]
      )
    },
    buildTreeStyle (e) {
      /* console.info(e)
      console.info(this.$refs.resourceTree.$el)
      this.$nextTick(() => {
        let btns = this.$refs.resourceTree.$el.querySelectorAll('.ivu-tree-title')
        for (let i = 0; i < btns.length; i++) {
          btns[i].style.backgroundColor = '#fff'
        }

        console.info(e.path)
        e.path[1].style.backgroundColor = '#2d8cf0'
      }) */
    }
  }
}
</script>
