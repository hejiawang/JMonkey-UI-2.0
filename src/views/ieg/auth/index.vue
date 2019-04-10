<template>
  <Layout v-layoutIn>
    <Row>
      <Table :height="userTableHeight" border :columns="userTableColumns" :data="userTableData" :loading="listLoading" stripe />
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="userPage"/>
    </Row>

    <CIegAuthForm v-model="showForm" :user="currentUser"/>
  </Layout>
</template>
<script>
import store from '@/store'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { list } from '@/api/sys/user'
import CIegAuthForm from '@/views/ieg/auth/form'

export default {
  name: 'IegAuth',
  components: {
    CIegAuthForm
  },
  data () {
    return {
      showForm: false,
      currentUser: null,
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      userTableColumns: [],
      userTableData: [],
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
      return store.getters.windowHeight - 230
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
          width: 150,
          render: (h, params) => { return this.bindTableEvent(h, params) }
        }
      ]
    },
    /**
     * 用户列表点击事件
     */
    bindTableEvent (h, params) {
      let hContent = []

      hContent.push(h('Button', {
        props: { type: 'warning', ghost: true },
        on: { click: () => { this.authHandle(params.row) } }
      }, '授权'))

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
    authHandle (row) {
      this.currentUser = row; this.showForm = true
    }
  }
}
</script>
