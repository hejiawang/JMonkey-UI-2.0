<template>
  <Layout>
    <Row>
      <Col span="8">
        <Button type="primary">新增</Button>
        <Button type="success">导入</Button>
        <Button type="warning">导出</Button>
      </Col>
      <Col span="16">
        <Form ref="userSearchForm" :model="userSearchForm" :label-width="80" inline style="float: right">
          <FormItem label="用户名称">
            <Input type="text" v-model="userSearchForm.userName" />
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
      <Table :height="userTableHeight" border :columns="userTableColumns" :data="userTableData" stripe></Table>
    </Row>
    <Row>
      <Page :total="100" show-sizer show-elevator show-total></Page>
    </Row>
  </Layout>
</template>
<script>

export default {
  name: 'SysUser',
  data: function () {
    return {
      userSearchForm: {
        userName: ''
      },
      userTableColumns: [
        {title: '用户名称', key: 'name'},
        {title: '年龄', key: 'age', width: 200},
        {title: '手机号码', key: 'phone'},
        {title: '归属部门', key: 'dept'},
        {title: '地址', key: 'address'},
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 350,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'primary', ghost: true }
              }, '查看'),
              h('Button', {
                props: { type: 'warning', ghost: true }
              }, '编辑'),
              h('Button', {
                props: { type: 'error', ghost: true },
                on: { click: () => { this.deleteHandle(params.row) } }
              }, '删除'),
              h('Button', {
                props: {},
                on: { click: () => { this.modifyPasswordHandle(params.row.id) } }
              }, '修改密码')
            ])
          }
        }
      ],
      userTableData: [
        {id: 'id1', name: 'John Brown', age: 18, phone: '13333333333', dept: '研发中心', address: 'New York No. 1 Lake Park', date: '2016-10-03'},
        {id: 'id1', name: 'Jim Green', age: 24, phone: '13333333333', dept: '研发中心', address: 'London No. 1 Lake Park', date: '2016-10-01'},
        {id: 'id1', name: 'John Brown', age: 18, phone: '13333333333', dept: '研发中心', address: 'New York No. 1 Lake Park', date: '2016-10-03'},
        {id: 'id1', name: 'Jim Green', age: 24, phone: '13333333333', dept: '研发中心', address: 'London No. 1 Lake Park', date: '2016-10-01'},
        {id: 'id1', name: 'Jim Green', age: 24, phone: '13333333333', dept: '研发中心', address: 'London No. 1 Lake Park', date: '2016-10-01'},
        {id: 'id1', name: 'John Brown', age: 18, phone: '13333333333', dept: '研发中心', address: 'New York No. 1 Lake Park', date: '2016-10-03'},
        {id: 'id1', name: 'Jim Green', age: 24, phone: '13333333333', dept: '研发中心', address: 'London No. 1 Lake Park', date: '2016-10-01'},
        {id: 'id1', name: 'Jim Green', age: 24, phone: '13333333333', dept: '研发中心', address: 'London No. 1 Lake Park', date: '2016-10-01'},
        {id: 'id1', name: 'John Brown', age: 18, phone: '13333333333', dept: '研发中心', address: 'New York No. 1 Lake Park', date: '2016-10-03'}
      ],
      userTableHeight: 200
    }
  },
  mounted () {
    this.userTableHeight = document.body.clientHeight - 280
  },
  created () {
  },
  methods: {
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.name + '</span> 的用户将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          this.$Message.success('删除成功')
        }
      })
    },
    modifyPasswordHandle (userId) {

    }
  }
}
</script>
