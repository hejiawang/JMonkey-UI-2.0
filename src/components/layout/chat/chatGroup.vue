<template>
  <Modal v-model="isShow" title="新增群组" :loading="loading" @on-visible-change="visibleChange" width="1000">
    <Form ref="chatGroupForm" :model="chatGroupForm" :rules="chatGroupRules" label-position="top">
      <Row  :gutter="20">
        <Col span="2">
          <Upload
            multiple
            type="drag"
            action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding: 20px 0">
              <Icon type="logo-instagram" size="20" style="color: #3399ff"></Icon>
            </div>
          </Upload>
        </Col>
        <Col span="22">
          <FormItem label="群组名称" prop="name">
            <Input type="text" v-model.trim="chatGroupForm.name" :maxlength="12" :clearable="!disabled" :disabled="disabled"/>
          </FormItem>
        </Col>
      </Row>

      <Row style="height: 400px;">
        <Col span="5" style="height: 100%">
          <Tree :data="treeDate" ref="deptTree" @on-select-change="selectDept" style="height: 100%; overflow-y: auto"/>
        </Col>
        <Col span="19">
            <Table :height="400" border :columns="userTableColumns" :data="userTableData"
                   :loading="listLoading" stripe @on-row-click="clickTable"/>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Row>
        <Col span="20" ><CPage v-model="listQuery" @on-list="initList" ref="userPage" style="float: left"/></Col>
        <Col span="2" style="margin-top: 5px;">
          <Button type="text" @click="cancel">取消</Button>
        </Col>
        <Col span="2" style="margin-top: 5px;">
          <Button type="primary" @click="ok">确定</Button>
        </Col>
      </Row>
    </div>
  </Modal>
</template>
<script>
import { mapGetters } from 'vuex'
import { converKey } from '@/utils/common'
import { tree } from '@/api/sys/dept'
import { list } from '@/api/sys/user'

export default {
  name: 'CChatGroup',
  props: {
    value: {type: Boolean, default: false, required: true},
    disabled: {type: Boolean, default: false, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    return {
      listLoading: false,
      userTableColumns: [],
      userTableData: [],
      deptTreeDate: [],
      listQuery: {
        deptId: null,
        current: 1,
        size: 10,
        total: 0
      },
      loading: true,
      isShow: false,
      chatGroupForm: {
        name: null,
        img: null
      },
      chatGroupRules: {}
    }
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.deptTreeDate) ? this.deptTreeDate : [this.deptTreeDate]
      return converKey(tmpTreeData, 'name', 'title', 'children', [{key: 'expand', value: true}])
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
          type: 'selection',
          width: 60,
          align: 'center'
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
    selectDept (depts, cDept) {

    },
    clickTable () {

    },
    ok () {},
    cancel () {
      this.isShow = false
    },
    visibleChange (isOpen) {}
  }
}
</script>
