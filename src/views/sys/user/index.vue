<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Button type="primary" @click="raiseHandle" v-if="sys_user_post">新增</Button>
      <Button type="success">导入</Button>
      <Button type="warning">导出</Button>

      <Button type="info" icon="ios-search" style="float: right;" @click="searchHandle">高级检索</Button>
    </Row>
    <Row>
      <Table :height="userTableHeight" border :columns="userTableColumns" :data="userTableData" :loading="listLoading" stripe />
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="userPage"/>
    </Row>

    <!-- 修改用户密码 -->
    <CModifyPassword v-model="showModifyPassword" :userId="currenUser.id" :userName="currenUser.username" />

    <!-- 新增/修改用户信息 -->
    <CUserForm v-model="showForm" :userInfo="currenUser" :type="formType" @refresh="restSearch" />

    <!-- 检索用户信息 -->
    <CUserSearch v-model="showSearch" :listQuery="listQuery" @search="search" @rest="restSearch"/>
  </Layout>
</template>
<script>
import CModifyPassword from '@/views/sys/user/modifyPasswordForm'
import CUserForm from '@/views/sys/user/form'
import CUserSearch from '@/views/sys/user/search'
import store from '@/store'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { list, del } from '@/api/sys/user'

export default {
  name: 'SysUser',
  components: {
    CModifyPassword, CUserForm, CUserSearch
  },
  data () {
    return {
      showSearch: false,
      listQuery: {
        username: null,
        realName: null,
        phone: null,
        sex: null,
        roleId: null,
        deptId: null,
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
    ...mapGetters(['permissions']),
    /**
     * 用户列表高度
     */
    userTableHeight () {
      return store.getters.windowHeight - 280
    }
  },
  created () {
    this.initPermissions()
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * 获取登录用户权限
     */
    initPermissions () {
      this.sys_user_get = this.permissions['sys_user_get']
      this.sys_user_post = this.permissions['sys_user_post']
      this.sys_user_put = this.permissions['sys_user_put']
      this.sys_user_delete = this.permissions['sys_user_delete']
    },
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
              return h('Avatar', {
                props: { shape: 'square', size: 'default', src: this.website.filePath + params.row.photo }
              })
            }
          }
        },
        {title: '用户名称', key: 'username', tooltip: true},
        {title: '真实姓名', key: 'realName', tooltip: true},
        {
          title: '用户性别',
          key: 'sex',
          render: (h, params) => { return h('span', this.sexFilter[params.row.sex]) }
        },
        {title: '手机号码', key: 'phone', tooltip: true},
        {
          title: '出生日期',
          tooltip: true,
          key: 'birthday',
          render: (h, params) => {
            let birthday = ''
            if (params.row.birthday) birthday = moment(params.row.birthday).format('YYYY-MM-DD')
            return h('span', birthday)
          }
        },
        {
          title: '归属部门',
          tooltip: true,
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
          tooltip: true,
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
      let hContent = []

      // 没啥事别动admin
      // 如果有修改权限，添加修改按钮
      if (this.sys_user_put && params.row.id !== '1') {
        hContent.push(h('Button', {
          props: { type: 'warning', ghost: true },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑'))
      }

      // 添加删除按钮
      if (this.sys_user_delete && params.row.id !== '1') {
        hContent.push(
          h('Button', {
            props: { type: 'error', ghost: true },
            on: { click: () => { this.deleteHandle(params.row) } }
          }, '删除')
        )
      }

      // 添加修改密码按钮
      hContent.push(
        h('Button', {
          props: {},
          on: { click: () => { this.modifyPasswordHandle(params.row) } }
        }, '修改密码')
      )

      return h('div', hContent)
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
      ['username', 'realName', 'phone', 'sex', 'roleId', 'deptId'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 检索用户信息
     */
    search () {
      this.showSearch = false
      this.$refs.userPage.rest()
      this.initList()
    },
    /**
     * 显示检索抽屉
     */
    searchHandle () {
      this.showSearch = true
    }
  }
}
</script>
