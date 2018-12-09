<template>
  <Layout v-layoutIn class="app-sys-menu">
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
          <Table :height="menuTableHeight" border :columns="menuTableColumns" :data="menuTreeTableData" stripe :row-class-name="showTableTree"></Table>
        </Row>
      </Col>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import { treeToArray } from '@/utils/common'

export default {
  name: 'SysMenu',
  components: {
  },
  computed: {
    menuTableHeight: function () {
      return store.getters.windowHeight - 235
    },
    menuTreeTableData: function () {
      let tmpTreeData = Array.isArray(this.menuTableData) ? this.menuTableData : [this.menuTableData]
      return treeToArray(tmpTreeData, false)
    }
  },
  data: function () {
    return {
      menuTableColumns: [],
      menuTableData: [
        {
          name: '系统设置',
          icon: 'md-apps',
          path: '1',
          component: '1',
          isShow: 'Yes',
          isIndex: 'Yes',
          showType: 'Home',
          sort: '1',
          children: [
            { name: '用户管理', icon: 'md-apps', path: '1', component: '1', isShow: 'Yes', isIndex: 'Yes', showType: 'Home', sort: '1' },
            { name: '角色管理', icon: 'md-apps', path: '1', component: '1', isShow: 'Yes', isIndex: 'No', showType: 'Screen', sort: '1' }
          ]
        },
        { name: '足球系会', icon: 'md-apps', path: '1', component: '1', isShow: 'No', isIndex: 'No', showType: 'Home', sort: '1' },
        { name: '就是一样', icon: 'md-apps', path: '1', component: '1', isShow: 'Yes', isIndex: 'No', showType: 'Screen', sort: '1' }
      ],
      yesOrNo: {'Yes': '是', 'No': '否'},
      showTypeConver: {'Home': '内置页', 'Screen': '独立页'}
    }
  },
  created () {
    this.initMenuTableColumns()
  },
  methods: {
    initMenuTableColumns () {
      this.menuTableColumns = [
        {
          title: '名称',
          key: 'name',
          width: 200,
          render: (h, params) => {
            let renderContent = []

            // 缩进
            for (let i = 0; i < (params.row._level - 1); i++) {
              renderContent.push(h('span', {
                style: { width: '40px', display: 'inline-block' }
              }))
            }

            // 判断是否显示下级图标
            if (!this.$CV.isEmpty(params.row.children)) {
              let iconType = params.row.children[0]._show ? 'ios-arrow-down' : 'ios-arrow-forward'
              let renderIcon = h('Icon', {
                props: { type: iconType, size: 25 }
              })
              renderContent.push(renderIcon)
            }

            // 显示菜单名称
            let renderSpan = h('span', ' ' + params.row.name)
            renderContent.push(renderSpan)

            return h('div', {
              style: { cursor: 'pointer' },
              on: { click: () => { this.showChildren(params.index) } }
            }, renderContent)
          }
        },
        {
          title: '图标',
          key: 'icon',
          width: 80,
          render: (h, params) => {
            return h('Icon', { props: { type: params.row.icon } })
          }
        },
        {title: '路由', key: 'path', tooltip: true},
        {title: '页面', key: 'component', tooltip: true},
        {
          title: '是否显示',
          key: 'isShow',
          width: 110,
          render: (h, params) => {
            if (params.row.isShow === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNo[params.row.isShow])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNo[params.row.isShow])
          }
        },
        {
          title: '是否主页',
          key: 'isIndex',
          width: 110,
          render: (h, params) => {
            if (params.row.isIndex === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNo[params.row.isIndex])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNo[params.row.isIndex])
          }
        },
        {
          title: '路由方式',
          key: 'showType',
          width: 110,
          render: (h, params) => {
            return h('span', this.showTypeConver[params.row.showType])
          }
        },
        {title: '排序', key: 'sort', width: 80},
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
      ]
    },
    showChildren (index) {
      if (!this.$CV.isEmpty(this.menuTableData[index])) {
        this.menuTableData[index].children.forEach(menu => {
          menu._show = !menu._show
        })
      }
    },
    showTableTree (row, index) {
      return row._show ? '' : 'switchTableTree'
    }
  }
}
</script>
<style lang="scss">
  .app-sys-menu{
    .switchTableTree{
      display:none;
    }
  }
</style>
