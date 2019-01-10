<template>
  <Layout v-layoutIn class="app-sys-menu">
    <Row>
      <!-- 左侧菜单 -->
      <Col span="5">
        <Menu :active-name="currentSystemRId" @on-select="selectMenu">
          <MenuItem v-for="system in systemList" :key="system.rid" :name="system.rid">
            <Icon :type="system.icon" /> {{system.name}}
          </MenuItem>
        </Menu>
      </Col>
      <!-- 右侧菜单树形列表 -->
      <Col span="19">
        <Row>
          <Button type="primary" @click="raiseHandle">新增</Button>
        </Row>
        <Row style="margin-top: 20px">
          <Table :height="menuTableHeight" border :columns="menuTableColumns" :data="menuTreeTableData" stripe :row-class-name="showTableTree" :loading="listLoading"/>
        </Row>
      </Col>
    </Row>

    <CMenuForm v-model="showForm" :type="formType" :systemRId="currentSystemRId" :menuId="currentMenuId" @refresh="initMenuTreeList"/>
  </Layout>
</template>
<script>
import store from '@/store'
import { treeToArray } from '@/utils/common'
import { list as systemList } from '@/api/sys/system'
import { treeList, del } from '@/api/sys/menu'
import CMenuForm from '@/views/sys/menu/form'

export default {
  name: 'SysMenu',
  components: {
    CMenuForm
  },
  computed: {
    menuTableHeight () {
      return store.getters.windowHeight - 235
    },
    /**
     * 将树形属性转换为树形表格需要的数据
     */
    menuTreeTableData () {
      let tmpTreeData = Array.isArray(this.menuTableData) ? this.menuTableData : [this.menuTableData]
      return treeToArray(tmpTreeData, false)
    }
  },
  data () {
    return {
      menuTableColumns: [],
      menuTableData: [],
      yesOrNo: {'Yes': '是', 'No': '否'},
      showTypeConver: {'Home': 'Home页', 'Screen': '全屏页'},
      systemList: [],
      currentSystemRId: '',
      currentMenuId: '',
      listLoading: false,
      formType: '',
      showForm: false
    }
  },
  created () {
    this.initMenuTableColumns()
    this.initSystemList()
  },
  methods: {
    /**
     * 初始化菜单树形表格头
     */
    initMenuTableColumns () {
      this.menuTableColumns = [
        {
          title: '名称',
          key: 'name',
          width: 170,
          render: (h, params) => { return this.bindTreeEvent(h, params) }
        },
        {
          title: '图标',
          key: 'icon',
          width: 80,
          render: (h, params) => {
            return h('Icon', { props: { type: params.row.icon, size: 25 } })
          }
        },
        {title: '路由', key: 'path', tooltip: true},
        {title: '页面', key: 'component', tooltip: true},
        {
          title: '显示',
          key: 'isShow',
          width: 80,
          render: (h, params) => {
            if (params.row.isShow === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNo[params.row.isShow])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNo[params.row.isShow])
          }
        },
        {
          title: '引导页',
          key: 'isGuide',
          width: 90,
          render: (h, params) => {
            if (params.row.isGuide === 'No') return h('Tag', { props: { color: 'error' } }, this.yesOrNo[params.row.isGuide])
            else return h('Tag', { props: { color: 'success' } }, this.yesOrNo[params.row.isGuide])
          }
        },
        {
          title: '主页',
          key: 'isIndex',
          width: 80,
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
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    /**
     * 树形表格展示事件
     */
    bindTreeEvent (h, params) {
      let renderContent = []

      // 缩进
      for (let i = 0; i < (params.row._level - 1); i++) {
        renderContent.push(h('span', {
          style: { width: '25px', display: 'inline-block' }
        }))
      }

      // 判断是否显示图标
      if (!this.$CV.isEmpty(params.row.children)) {
        let iconType = params.row.children[0]._show ? 'ios-arrow-down' : 'ios-arrow-forward'
        let renderIcon = h('Icon', {
          props: { type: iconType, size: 25 }
        })
        renderContent.push(renderIcon)
      } else {
        renderContent.push(h('span', {
          style: { width: '25px', display: 'inline-block' }
        }))
      }

      // 显示菜单名称
      let renderSpan = h('span', ' ' + params.row.name)
      renderContent.push(renderSpan)

      return h('div', {
        style: { cursor: 'pointer' },
        on: { click: () => { this.showChildren(params.row._indexArray) } }
      }, renderContent)
    },
    /**
     * 显示子菜单
     * @param index 菜单在树形表格的序号
     */
    showChildren (indexArray) {
      let menuP = Object.assign({}, this.menuTableData)
      indexArray.forEach(i => { menuP = menuP[i].children })

      menuP.forEach(menu => {
        if (menu._show) this.hidenChildren(menu)
        else menu._show = !menu._show
      })
    },
    /**
     * 隐藏子菜单时，将孙子以下菜单也隐藏
     */
    hidenChildren (menu) {
      menu._show = false

      if (!this.$CV.isEmpty(menu.children)) {
        menu.children.forEach(menuChildren => { this.hidenChildren(menuChildren) })
      }
    },
    /**
     * 树形表格显示行时的样式
     * @param row
     * @param index
     * @returns {string}
     */
    showTableTree (row, index) {
      return row._show ? '' : 'switchTableTree'
    },
    /**
     * 列表按钮事件
     */
    bindEvent (h, params) {
      return h('div', [
        h('Button', {
          props: { type: 'warning', ghost: true },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑'),
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      ])
    },
    /**
     * 初始化系统信息
     */
    initSystemList () {
      systemList().then(data => {
        this.systemList = data.result
        if (!this.$CV.isEmpty(this.systemList)) {
          // 当systemList赋值后，MenuItem标签重新渲染，若没有$nextTick，Menu标签active-name找不到对应的MenuItem
          this.$nextTick(_ => {
            // TODO ? ? ? 后台返回的是rId，到前端怎么变成rid了？？？ 艹 艹 艹 艹 艹 艹 艹 艹 艹
            this.currentSystemRId = this.systemList[0].rid
            this.initMenuTreeList()
          })
        }
      })
    },
    /**
     * 初始化菜单树形表格
     */
    initMenuTreeList () {
      this.listLoading = true
      treeList(this.currentSystemRId).then(data => {
        this.menuTableData = data.result
        this.listLoading = false
      })
    },
    /**
     * 选择系统
     * @param name 系统id
     */
    selectMenu (rid) {
      this.currentSystemRId = rid
      this.initMenuTreeList()
    },
    /**
     * 新增菜单信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.currentMenuId = ''; this.showForm = true
    },
    /**
     * 修改菜单信息
     */
    modifyHandle (row) {
      this.formType = 'modify'; this.currentMenuId = row.rid; this.showForm = true
    },
    /**
     * 删除菜单信息
     * @param row 菜单信息
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的菜单以及下属资源</p><p>将被删除，是否继续？</p>',
        'confirm': () => {
          del(row.rid).then(() => {
            this.initMenuTreeList()
            this.$Message.success('删除成功')
          })
        }
      })
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
