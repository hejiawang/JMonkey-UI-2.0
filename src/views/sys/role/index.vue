<template>
  <Layout v-layoutIn>
    <Row>
      <Col span="8">
        <Button type="primary" @click="raiseHandle">新增</Button>
      </Col>
      <Col span="16">
        <Form ref="roleSearchForm" :model="listQuery" :label-width="80" inline style="float: right">
          <FormItem label="角色名称">
            <Input type="text" v-model="listQuery.name" />
          </FormItem>
          <FormItem label="角色编码">
            <Input type="text" v-model="listQuery.code" />
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
      <Table :height="roleTableHeight" :loading="listLoading" border :columns="roleTableColumns" :data="roleTableData"></Table>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initRoleList" ref="rolePage"/>
    </Row>

    <CRoleForm v-model="showForm" :type="formType" :roleId="currentRoleId" @refresh="restSearch"/>
    <CRoleAuthorize v-model="showAuthorize" :role="authRole"/>
    <CRoleData v-model="showData" :role="authRole"/>
  </Layout>
</template>
<script>
import store from '@/store'
import CRoleForm from '@/views/sys/role/form'
import CRoleAuthorize from '@/views/sys/role/authorize'
import CRoleData from '@/views/sys/role/data'
import { list, del } from '@/api/sys/role'

/**
 * 角色管理
 */
export default {
  name: 'SysRole',
  components: {
    CRoleForm, CRoleAuthorize, CRoleData
  },
  computed: {
    roleTableHeight () {
      return store.getters.windowHeight - 290
    }
  },
  data () {
    return {
      listLoading: false,
      listQuery: {
        name: null,
        code: null,
        current: 1,
        size: 10,
        total: 0
      },
      roleTableColumns: [ ],
      roleTableData: [ ],
      formType: '',
      showForm: false,
      currentRoleId: '',
      showAuthorize: false,
      authRole: null,
      showData: false
    }
  },
  created () {
    this.initRoleTableColumns()
    this.initRoleList()
  },
  methods: {
    /**
     * 初始化角色表格头
     */
    initRoleTableColumns () {
      this.roleTableColumns = [
        {title: '角色名称', key: 'name'},
        {title: '角色编码', key: 'code'},
        {title: '备注', key: 'remark'},
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 400,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    /**
     * 列表按钮
     */
    bindEvent (h, params) {
      let hContent = []

      if (params.row.id !== '1') {
        hContent.push(
          h('Button', {
            props: { type: 'warning', ghost: true },
            on: { click: () => { this.modifyHandle(params.row) } }
          }, '编辑')
        )
        hContent.push(
          h('Button', {
            props: { type: 'error', ghost: true },
            on: { click: () => { this.deleteHandle(params.row) } }
          }, '删除')
        )
      }

      hContent.push(
        h('Button', {
          props: { type: 'success', ghost: true },
          on: { click: () => { this.authHandle(params.row) } }
        }, '访问权限')
      )
      hContent.push(
        h('Button', {
          props: { type: 'info', ghost: true },
          on: { click: () => { this.dataHandle(params.row) } }
        }, '数据规则')
      )
      return h('div', hContent)
    },
    /**
     * 获取角色list数据
     */
    initRoleList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.roleTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * 重置角色列表搜索条件
     */
    restSearch () {
      ['name', 'code'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 角色列表搜索
     */
    search () {
      this.$refs.rolePage.rest()
      this.initRoleList()
    },
    /**
     * 删除角色信息
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的角色将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.restSearch()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 新增角色
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改角色
     * @param row
     */
    modifyHandle (row) {
      this.formType = 'modify'; this.showForm = true; this.currentRoleId = row.id
    },
    /**
     * 为角色授权
     * @param row 角色信息
     */
    authHandle (row) {
      this.authRole = row; this.showAuthorize = true
    },
    dataHandle (row) {
      this.authRole = row; this.showData = true
    }
  }
}
</script>
