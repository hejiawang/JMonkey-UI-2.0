<template>
  <Modal v-model="isShow" title="新增群组" :loading="loading" width="1000"  @on-visible-change="visibleChange">
    <Form ref="chatGroupForm" :model="chatGroupForm" :rules="chatGroupRules" label-position="top">
      <Row  :gutter="20">
        <Col span="2">
          <CChatGroupImage v-model="chatGroupForm.img"/>
        </Col>
        <Col span="22">
          <FormItem label="群组名称" prop="name">
            <Input type="text" v-model.trim="chatGroupForm.name" :maxlength="10" :clearable="!disabled" :disabled="disabled"/>
          </FormItem>
        </Col>
      </Row>

      <Row style="height: 400px;">
        <Col span="5" style="height: 100%">
          <Tree :data="treeDate" ref="deptTree" @on-select-change="selectDept" style="height: 100%; overflow-y: auto"/>
        </Col>
        <Col span="19">
          <CheckboxGroup v-model="chatGroupForm.userList">
            <Table :height="400" border :columns="userTableColumns" :data="userTableData"
                   :loading="listLoading" stripe @on-row-click="clickTable"/>
          </CheckboxGroup>
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
          <Button type="primary" @click="ok" :disabled="submitLoading">确定</Button>
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
import CChatGroupImage from '@/components/layout/chat/chatGroupImage'
import store from '@/store'
import { save } from '@/api/message/chatGroup'

export default {
  name: 'CChatGroup',
  components: {
    CChatGroupImage
  },
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
      submitLoading: false,
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
        creator: null,
        name: null,
        img: null,
        userList: []
      },
      chatGroupRules: {
        name: { required: true, message: '请输入群组名称', trigger: 'blur' }
      }
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
          title: ' ',
          key: 'id',
          width: 60,
          align: 'center',
          render: (h, params) => {
            let prop
            if (params.row.id === store.getters.user.id) prop = { props: { label: params.row.id, disabled: true } }
            else prop = { props: { label: params.row.id } }

            return h('Checkbox', prop, '  ')
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
    initCreator () {
      this.chatGroupForm.creator = store.getters.user.id
      this.chatGroupForm.userList.push(store.getters.user.id)
    },
    /**
     * select dept
     * @param depts dept list
     * @param cDept current dept
     */
    selectDept (depts, cDept) {
      this.listQuery.deptId = depts.length > 0 ? cDept.id : null
      this.$refs.userPage.rest()

      this.initList()
    },
    /**
     * click user table
     * @param row
     * @param index
     */
    clickTable (row, index) {
      if (row.id === store.getters.user.id) return

      if (this.chatGroupForm.userList.indexOf(row.id) < 0) this.chatGroupForm.userList.push(row.id)
      else this.chatGroupForm.userList.splice(this.chatGroupForm.userList.indexOf(row.id), 1)
    },
    /**
     * 确认
     */
    ok () {
      this.submitLoading = true
      this.$refs.chatGroupForm.validate((valid) => {
        if (valid) {
          save(this.chatGroupForm).then(data => {
            if (data.isSuccess) {
              this.$Message.success('新建群组成功')
              this.cancel()
            }
          })
        } else {
          this.submitLoading = false
        }
      })
    },
    /**
     * close modal
     */
    cancel () {
      this.$refs.chatGroupForm.resetFields()
      this.chatGroupForm = {
        creator: null,
        name: null,
        img: null,
        userList: []
      }

      this.submitLoading = false
      this.isShow = false
    },
    /**
     * modal visible change
     * @param isOpen 'true' is open
     */
    visibleChange (isOpen) {
      if (isOpen) this.initCreator()
      else this.cancel()
    }
  }
}
</script>
