<template>
  <Layout class="animated fadeIn">
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
      <Table :height="userTableHeight" border :columns="userTableColumns" :data="userTableData"></Table>
    </Row>
    <Row>
      <Page :total="0" show-sizer show-elevator show-total></Page>
    </Row>
  </Layout>
</template>
<script>
export default {
  name: 'SysRole',
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
                props: { type: 'primary', ghost: true },
                on: { click: () => { this.editHandle(params.row) } }
              }, '编辑'),
              h('Button', {
                props: { type: 'warning', ghost: true }
              }, '查看'),
              h('Button', {
                props: { type: 'error', ghost: true }
              }, '删除'),
              h('Button', {
                props: { }
              }, '密码重置')
            ])
          }
        }
      ],
      userTableData: [
      ],
      userTableHeight: 200,
      isShow: false
    }
  },
  mounted () {
    this.userTableHeight = document.body.clientHeight - 280
  },
  created () {
  }
}
</script>
