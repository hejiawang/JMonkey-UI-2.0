<template>
  <Layout v-layoutIn>
    <Row :gutter="32" style="height: 100%;">
      <Col span="5" style="height: 100%;">
        <Card style="height: 100%;">
          <p slot="title">
            <Icon type="md-apps"></Icon>
            <Tag color="warning">未选择菜单</Tag>
          </p>
          <Tree :data="treeDate" :render="renderTreeContent"></Tree>
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

export default {
  name: 'SysButton',
  data: function () {
    return {
      treeDate: [
        {
          title: '系统 1',
          type: 'System',
          children: [
            {
              title: '菜单 1-1',
              type: 'Menu',
              children: [
                {
                  title: '菜单 1-1-1',
                  type: 'Menu'
                },
                {
                  title: '菜单 1-1-2',
                  type: 'Menu'
                }
              ]
            },
            {
              title: '菜单 1-2',
              type: 'Menu'
            }
          ]
        },
        {
          title: '系统 2',
          type: 'System',
          children: [
            {
              title: '菜单 2-1',
              type: 'Menu'
            },
            {
              title: '菜单 2-2',
              type: 'Menu'
            }
          ]
        }
      ],
      buttonTableColumns: [
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
      ],
      buttonTableData: [
        {id: 'id1', name: '新增', method: 'Get', path: '/sys/button/save', perrison: 'sys_button_add'},
        {id: 'id2', name: '修改', method: 'Get', path: '/sys/button/save', perrison: 'sys_button_add'}
      ]
    }
  },
  computed: {
    buttonTableHeight: function () {
      return store.getters.windowHeight - 230
    }
  },
  methods: {
    renderTreeContent (h, { root, node, data }) {
      let iconType = ''
      if (node.node.type === 'System') iconType = 'md-apps'
      else if (node.node.type === 'Menu') iconType = 'ios-menu'

      return h('span', { class: 'ivu-tree-title' }, [
        h('Icon', {
          props: { type: iconType },
          style: { marginRight: '8px' }
        }),
        h('span', data.title)
      ])
    }
  }
}
</script>
