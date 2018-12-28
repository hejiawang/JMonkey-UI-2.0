<template>
  <Layout v-layoutIn>
    <Row>
      <Col span="8">
        <Button type="primary" @click="raiseHandle">新增</Button>
        <Button type="success">导入</Button>
        <Button type="warning">导出</Button>
      </Col>
      <Col span="16">
        <Form ref="userSearchForm" :model="listQuery" :label-width="80" inline style="float: right" @submit.native.prevent>
          <FormItem label="用户名称">
            <Input type="text" v-model="listQuery.username" />
          </FormItem>

          <FormItem :label-width="0">
            <ButtonGroup>
              <Button icon="ios-search" @click="search"></Button>
              <Button icon="ios-trash-outline" @click="restSearch"></Button>
            </ButtonGroup>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Row>
      <Table :height="userTableHeight" border :columns="userTableColumns" :data="userTableData" :loading="listLoading" stripe />
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="userPage"/>
    </Row>

    <CModifyPassword v-model="showModifyPassword" :userId="currenUser.id" :userName="currenUser.name"></CModifyPassword>
    <CUserForm v-model="showForm" :userInfo="currenUser" :type="formType" @refresh="restSearch" ></CUserForm>
  </Layout>
</template>
<script>
import CModifyPassword from '@/views/sys/user/modifyPasswordForm'
import CUserForm from '@/views/sys/user/form'
import store from '@/store'
import moment from 'moment'
import { mapGetters } from 'vuex'

import { list, del } from '@/api/sys/user'

export default {
  name: 'SysUser',
  components: {
    CModifyPassword, CUserForm
  },
  data () {
    return {
      listQuery: {
        username: null,
        current: 1,
        size: 10,
        total: 0
      },
      userTableColumns: [],
      userTableData: [],
      showModifyPassword: false,
      showForm: false,
      currenUser: {},
      formType: '',
      listLoading: false,
      sexFilter: { 'Man': '男', 'Woman': '女', 'Other': '其他' }
    }
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * 用户列表高度
     */
    userTableHeight () {
      return store.getters.windowHeight - 280
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * 初始化用户列表头
     */
    initTableColumns () {
      this.userTableColumns = [
        {
          title: '头像',
          key: 'photo',
          width: 80,
          render: (h, params) => {
            if (this.$CV.isEmpty(params.row.photo)) {
              return h('Avatar', {
                props: { shape: 'square', icon: 'ios-person', size: 'default' }
              })
            } else {
              return h('img', {
                attrs: { src: this.website.filePath + params.row.photo },
                style: 'width: 32px; height: 32px'
              })
            }
          }
        },
        {title: '用户名称', key: 'username'},
        {title: '真实姓名', key: 'realName'},
        {
          title: '用户性别',
          key: 'sex',
          render: (h, params) => { return h('span', this.sexFilter[params.row.sex]) }
        },
        {title: '手机号码', key: 'phone'},
        {
          title: '出生日期',
          key: 'birthday',
          render: (h, params) => {
            let birthday = ''
            if (params.row.birthday) birthday = moment(params.row.birthday).format('YYYY-MM-DD')
            return h('span', birthday)
          }
        },
        {
          title: '归属部门',
          key: 'dept',
          render: (h, params) => {
            let t = ''
            if (!this.$CV.isEmpty(params.row.depts)) {
              params.row.depts.forEach(d => { t = t + d.name + ',' })
              t = t.substr(0, t.length - 1)
            }

            return h('span', t)
          }
        },
        {
          title: '用户角色',
          key: 'role',
          render: (h, params) => {
            let t = ''
            if (!this.$CV.isEmpty(params.row.roles)) {
              params.row.roles.forEach(r => { t = t + r.name + ',' })
              t = t.substr(0, t.length - 1)
            }

            return h('span', t)
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          align: 'center',
          width: 350,
          render: (h, params) => { return this.bindTableEvent(h, params) }
        }
      ]
    },
    /**
     * 用户列表点击事件
     */
    bindTableEvent (h, params) {
      return h('div', [
        h('Button', {
          props: { type: 'warning', ghost: true },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑'),
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除'),
        h('Button', {
          props: {},
          on: { click: () => { this.modifyPasswordHandle(params.row) } }
        }, '修改密码')
      ])
    },
    /**
     * 初始化用户列表
     */
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.userTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * 删除用户信息
     * @param row
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.username + '</span> 的用户将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.restSearch()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 修改用户密码
     */
    modifyPasswordHandle (userInfo) {
      this.currenUser = userInfo
      this.showModifyPassword = true
    },
    /**
     * 修改用户
     */
    modifyHandle (userInfo) {
      this.currenUser = userInfo; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 新增用户
     */
    raiseHandle () {
      this.currenUser = {}; this.formType = 'raise'; this.showForm = true
    },
    /**
     * 重置检索信息
     */
    restSearch () {
      ['username'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 检索用户信息
     */
    search () {
      this.$refs.userPage.rest()
      this.initList()
    }
  }
}
</script>
