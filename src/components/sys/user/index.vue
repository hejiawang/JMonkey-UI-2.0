<template>
  <Row>
    <Input type="text" v-model="userName" icon="ios-close"
           @on-focus="showUserModal" @on-click="clearUser" readonly :disabled="disabled"/>

    <Modal v-model="isShow" :title="title" width="1000">
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
          <Table :height="400" border :columns="userTableColumns" :data="userTableData" :loading="listLoading" stripe />
        </Col>
      </Row>

      <div slot="footer">
        <Row>
          <Col span="15" offset="5"><CPage v-model="listQuery" @on-list="initList" ref="userPage" style="float: left"/></Col>
          <Col span="2" style="margin-top: 5px;"> <Button type="text">取消</Button> </Col>
          <Col span="2" style="margin-top: 5px;"> <Button type="primary">确定</Button> </Col>
        </Row>
      </div>
    </Modal>
  </Row>
</template>
<script>
import { tree } from '@/api/sys/dept'
import CRole from '@/components/sys/role'
import { list } from '@/api/sys/user'
import { mapGetters } from 'vuex'
import { converKey } from '@/utils/common'

export default {
  name: 'CUser',
  components: { CRole },
  props: {
    title: {type: String, default: '请选择用户', required: false},
    disabled: {type: Boolean, default: false, required: false}
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
      listLoading: false,
      userTableColumns: [],
      userTableData: [],
      userName: null,
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
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.userTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    initDept () {
      tree().then(data => { this.deptTreeDate = data.result })
    },
    clearUser () {},
    showUserModal () {
      this.isShow = true
    },
    selectDept () {},
    search () {},
    restSearch () {}
  }
}
</script>
