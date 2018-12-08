<template>
  <Layout v-layoutIn>
    <Row>
      <Col span="5">
        <Menu active-name="1">
          <MenuItem name="1"> <Icon type="md-document" /> 文章管理 </MenuItem>
          <MenuItem name="2"> <Icon type="md-chatbubbles" /> 评论管理 </MenuItem>
        </Menu>
      </Col>
      <Col span="19">
        <Row>
          <Button type="primary">新增</Button>
        </Row>
        <Row style="margin-top: 20px">
          <Table :height="menuTableHeight" border :columns="menuTableColumns" :data="menuTableData" stripe></Table>
        </Row>
        <Row>
          <Page :total="100" show-sizer show-elevator show-total></Page>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'

export default {
  name: 'SysMenu',
  computed: {
    menuTableHeight: function () {
      return store.getters.windowHeight - 280
    }
  },
  data: function () {
    return {
      menuTableColumns: [
        {title: '名称', key: 'name'},
        {title: '图标', key: 'icon'},
        {title: '路由', key: 'path'},
        {title: '页面', key: 'component'},
        {title: '是否显示', key: 'ishow'},
        {title: '是否主页', key: 'isIndex'},
        {title: '路由方式', key: 'showType'},
        {title: '排序', key: 'sort'},
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            return h('div', [
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
      menuTableData: [
        { name: '1', icon: '1', path: '1', component: '1', ishow: '1', isIndex: '1', showType: '1', sort: '1' }
      ]
    }
  },
  created () {
  }
}
</script>
