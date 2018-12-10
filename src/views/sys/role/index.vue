<template>
  <Layout v-layoutIn>
    <Row>
      <Col span="8">
        <Button type="primary">新增</Button>
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
              <Button icon="ios-search" ></Button>
              <Button icon="ios-trash-outline" ></Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Row>
      <Table :height="roleTableHeight" border :columns="roleTableColumns" :data="roleTableData"></Table>
    </Row>
    <Row>
      <Page :total="listQuery.total" :current="listQuery.current" :page-size="listQuery.size" @on-change="changeCurrent" @on-page-size-change="changePageSize" show-sizer show-elevator show-total></Page>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'

import { list } from '@/api/sys/role'

export default {
  name: 'SysRole',
  computed: {
    roleTableHeight: function () {
      return store.getters.windowHeight - 280
    }
  },
  data: function () {
    return {
      listQuery: {
        name: null,
        code: null,
        current: 1,
        size: 10,
        total: 0
      },
      roleTableColumns: [ ],
      roleTableData: [ ]
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
          fixed: 'right',
          width: 350,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'primary', ghost: true }
              }, '编辑'),
              h('Button', {
                props: { type: 'error', ghost: true }
              }, '删除')
            ])
          }
        }
      ]
    },
    /**
     * 获取角色list数据
     */
    initRoleList () {
      list(this.listQuery).then(data => {
        this.roleTableData = data.rows
        this.listQuery.total = data.total
      })
    },
    changeCurrent (current) {
      this.listQuery.current = current
      this.initRoleList()
    },
    changePageSize (pageSize) {
      this.listQuery.size = pageSize
      this.initRoleList()
    }
  }
}
</script>
