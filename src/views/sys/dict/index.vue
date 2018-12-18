<template>
  <Layout v-layoutIn class="app-sys-dict">
    <Row style="height: 61px;">
      <Button type="primary" @click="raiseHandle">新增</Button>
    </Row>
    <Row>
      <Table :height="dictTableHeight" :loading="listLoading" border :columns="dictTableColumns" :data="dictTreeTableData"></Table>
    </Row>

    <CDictForm v-model="showForm" :type="formType" @refresh="initDictTreeData"/>
  </Layout>
</template>
<script>
import store from '@/store'
import CDictForm from '@/views/sys/dict/form'
import { treeToArray } from '@/utils/common'
import { tree } from '@/api/sys/dict'

export default {
  name: 'SysDict',
  components: {
    CDictForm
  },
  computed: {
    dictTableHeight () {
      return store.getters.windowHeight - 250
    },
    /**
     * 将树形属性转换为树形表格需要的数据
     */
    dictTreeTableData () {
      let tmpTreeData = Array.isArray(this.dictTableData) ? this.dictTableData : [this.dictTableData]
      return treeToArray(tmpTreeData, false)
    }
  },
  data () {
    return {
      showForm: false,
      formType: '',
      listLoading: false,
      dictTableColumns: [],
      dictTableData: []
    }
  },
  created () {
    this.initTableColumns()
    this.initDictTreeData()
  },
  methods: {
    initTableColumns () {
      this.dictTableColumns = [
        {
          title: '字典标签',
          key: 'lable',
          width: 400
        },
        { title: '字典键值', key: 'value', width: 300 },
        { title: '排序', key: 'sort', width: 100 },
        { title: '备注', key: 'remark' },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 350,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'success', ghost: true }
              }, '添加下级字典'),
              h('Button', {
                props: { type: 'warning', ghost: true }
              }, '编辑'),
              h('Button', {
                props: { type: 'error', ghost: true }
              }, '删除')
            ])
          }
        }
      ]
    },
    initDictTreeData () {
      this.listLoading = true
      tree().then(data => {
        this.dictTableData = data.result
        this.listLoading = false
      })
    },
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    }
  }
}
</script>
