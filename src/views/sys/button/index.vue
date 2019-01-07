<template>
  <Layout v-layoutIn class="app-sys-button">
    <Row :gutter="32" style="height: 100%;">
      <Col span="5" style="height: 100%;">
        <Card class="resource-tree">
          <p slot="title">
            <Icon type="md-apps"></Icon>
            <Tag color="success" v-if="currentResource.id != null">{{currentResource.name}}</Tag>
            <Tag color="warning" v-else>未选择菜单</Tag>
          </p>
          <Tree :data="resourceTreeDate" :render="renderTreeContent" ref="resourceTree" />
        </Card>
      </Col>
      <Col span="19">
        <Row style="height: 53px;"> <Button type="primary" @click="raiseHandle" :disabled="currentResource.id == null">新增</Button> </Row>
        <Table :height="buttonTableHeight" border :columns="buttonTableColumns" :data="buttonTableData" stripe :loading="listLoading" />
      </Col>
    </Row>

    <CButtonForm v-model="showForm" :type="formType" :resource="currentResource" :button="currentButton" @refresh="initButtonTable"/>
  </Layout>
</template>
<script>
import store from '@/store'
import { smtree } from '@/api/sys/resource'
import { list, del } from '@/api/sys/button'
import CButtonForm from '@/views/sys/button/form'

export default {
  name: 'SysButton',
  components: {
    CButtonForm
  },
  data () {
    return {
      resourceTreeDate: [],
      buttonTableColumns: [],
      buttonTableData: [],
      currentResource: {},
      currentButton: null,
      showForm: false,
      formType: '',
      listLoading: false
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
    /**
     * 初始化按钮表格头
     */
    initTableColumns () {
      this.buttonTableColumns = [
        {title: '名称', key: 'name'},
        {title: '权限标识', key: 'permission'},
        {title: '请求方式', key: 'method'},
        {title: '请求路径', key: 'url'},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 250,
          render: (h, params) => {
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
          }
        }
      ]
    },
    /**
     * 初始化资源树信息
     */
    initResourceTree () {
      smtree().then(data => {
        this.resourceTreeDate = data.result
      })
    },
    /**
     * 渲染表格树样式，绑定资源点击事件
     * @param h
     * @param root
     * @param node
     * @param data
     * @returns {*}
     */
    renderTreeContent (h, { root, node, data }) {
      let iconType = ''
      if (data.type === 'System') iconType = 'md-apps'
      else if (data.type === 'Menu') iconType = 'ios-menu'

      return h('span',
        {
          class: 'ivu-tree-title',
          on: { click: (e) => {
            this.currentResource = data
            this.initButtonTable()
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
    /**
     * 初始化按钮表格数据
     */
    initButtonTable () {
      this.listLoading = true
      list(this.currentResource.id).then(data => {
        this.buttonTableData = data.result
        this.listLoading = false
      })
    },
    /**
     * 删除按钮信息
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的按钮将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.initButtonTable()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 修改按钮信息
     * @param row
     */
    modifyHandle (row) {
      this.formType = 'modify'; this.currentButton = row; this.showForm = true
    },
    /**
     * 新增按钮信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    }
  }
}
</script>
<style lang="scss">
  .app-sys-button{
    .resource-tree{
      height: 100%;
      .ivu-card-body{
        height: calc(100% - 54px);
      }
      .ivu-tree{
        height: 100%;
        overflow-y: auto;
      }
    }
  }
</style>
