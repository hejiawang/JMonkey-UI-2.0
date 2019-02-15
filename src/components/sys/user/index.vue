<template>
  <Row>
    <Input type="text" v-model="userName" icon="ios-close"
           @on-focus="showUserModal" @on-click="clearUser" readonly :disabled="disabled"/>

    <Modal v-model="isShow" :title="title" width="1000" @on-visible-change="visibleChange">
      <Row style="height: 60px;">
        <Form ref="userSearchForm" :model="listQuery" :label-width="80" inline>
          <FormItem label="用户名称">
            <Input type="text" v-model.trim="listQuery.username" :maxlength="50" clearable style="width: 185px;"/>
          </FormItem>
          <FormItem label="真实姓名">
            <Input type="text" v-model.trim="listQuery.realName" :maxlength="50" clearable style="width: 185px;"/>
          </FormItem>
          <FormItem label="用户角色">
            <CRole v-model="listQuery.roleId" style="width: 185px;"/>
          </FormItem>
          <FormItem :label-width="0">
            <ButtonGroup>
              <Button icon="ios-search" @click="search" />
              <Button icon="ios-trash-outline" @click="restSearch" />
            </ButtonGroup>
          </FormItem>
        </Form>
      </Row>
      <Row style="height: 400px;">
        <Col span="5" style="height: 100%">
          <Tree :data="treeDate" ref="deptTree" @on-select-change="selectDept" style="height: 100%; overflow-y: auto"/>
        </Col>
        <Col span="19">
          <RadioGroup v-model="currentUserId" vertical style="width: 100%;">
            <Table :height="400" border :columns="userTableColumns" :data="userTableData"
                   :loading="listLoading" stripe @on-row-click="clickTable"/>
          </RadioGroup>
        </Col>
      </Row>

      <div slot="footer">
        <Row>
          <Col span="20" ><CPage v-model="listQuery" @on-list="initList" ref="userPage" style="float: left"/></Col>
          <Col span="2" style="margin-top: 5px;">
            <Button type="text" @click="closeModal">取消</Button>
          </Col>
          <Col span="2" style="margin-top: 5px;">
            <Button type="primary" @click="selectUserHandle">确定</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </Row>
</template>
<script>
import { tree } from '@/api/sys/dept'
import CRole from '@/components/sys/role'
import { list, findDto } from '@/api/sys/user'
import { mapGetters } from 'vuex'
import { converKey } from '@/utils/common'

export default {
  name: 'CUser',
  components: { CRole },
  props: {
    value: {required: true},
    title: {type: String, default: '请选择用户', required: false},
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) {
      this.userId = val

      if (!this.$CV.isEmpty(this.userId)) {
        findDto(this.userId).then(data => {
          this.userName = data.result.realName
        })
      }
    },
    userId (val) { this.$emit('input', val) }
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.deptTreeDate) ? this.deptTreeDate : [this.deptTreeDate]
      // TODO 怎么跳过第2、3、4个参数直接传第五个参数
      return converKey(tmpTreeData, 'name', 'title', 'children', [{key: 'expand', value: true}])
    }
  },
  data: function () {
    return {
      currentUserId: null,
      listLoading: false,
      userTableColumns: [],
      userTableData: [],
      userName: null,
      userId: null,
      deptTreeDate: [],
      isShow: false,
      listQuery: {
        username: null,
        realName: null,
        roleId: null,
        deptId: null,
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  created () {
    this.initDept()
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * user table header
     */
    initTableColumns () {
      this.userTableColumns = [
        {
          title: ' ',
          key: 'id',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('Radio', {
              props: { label: params.row.id }
            }, '  ')
          }
        },
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
        }
      ]
    },
    /**
     * init user table data
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
     * init dept tree data
     */
    initDept () {
      tree().then(data => { this.deptTreeDate = data.result })
    },
    clearUser () {
      this.userId = null
      this.userName = null
    },
    /**
     * show select user modal
     */
    showUserModal () {
      this.isShow = true
    },
    /**
     * close select user modal
     */
    closeModal () {
      this.isShow = false
    },
    /**
     * 点击部门树节点后时查询用户信息
     */
    selectDept (depts, cDept) {
      this.listQuery.deptId = depts.length > 0 ? cDept.id : null

      this.search()
    },
    /**
     * search user table data
     */
    search () {
      this.$refs.userPage.rest()
      this.initList()
    },
    /**
     * clear search user data
     */
    restSearch () {
      ['username', 'realName', 'roleId'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 点击table一行时触发
     */
    clickTable (row, index) {
      this.currentUserId = row.id
    },
    /**
     * 选择用户
     */
    selectUserHandle () {
      findDto(this.currentUserId).then(data => {
        this.userId = this.currentUserId
        this.userName = data.result.realName

        this.closeModal()
      })
    },
    /**
     * modal open
     * @param isOpen true is open
     */
    visibleChange (isOpen) {
      if (isOpen && !this.$CV.isEmpty(this.userId)) {
        this.currentUserId = this.userId
      }
    }
  }
}
</script>
