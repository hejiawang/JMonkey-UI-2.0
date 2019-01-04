<template>
  <Layout v-layoutIn class="app-sys-dict">
    <Row style="height: 61px;">
      <Button type="primary" @click="raiseHandle">新增</Button>
    </Row>
    <Row>
      <Table :height="dictTableHeight" :loading="listLoading" border :columns="dictTableColumns"
             :data="dictTreeTableData" stripe :row-class-name="showTableTree" />
    </Row>

    <CDictForm v-model="showForm" :type="formType" :parent="parentDict" :modifyId="modifyId" @refresh="initDictTreeData"/>
  </Layout>
</template>
<script>
import store from '@/store'
import CDictForm from '@/views/sys/dict/form'
import { treeToArray } from '@/utils/common'
import { tree, del } from '@/api/sys/dict'

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
      dictTableData: [],
      parentDict: null,
      modifyId: null
    }
  },
  created () {
    this.initTableColumns()
    this.initDictTreeData()
  },
  methods: {
    /**
     * 初始化树形表格头
     */
    initTableColumns () {
      this.dictTableColumns = [
        {
          title: '字典标签',
          key: 'lable',
          width: 400,
          render: (h, params) => { return this.bindTreeEvent(h, params) }
        },
        { title: '字典键值', key: 'value', width: 300 },
        { title: '排序', key: 'sort', width: 100 },
        { title: '备注', key: 'remark' },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 350,
          render: (h, params) => { return this.bindEvent(h, params) }
        }
      ]
    },
    bindTreeEvent (h, params) {
      let renderContent = []

      // 缩进
      for (let i = 0; i < (params.row._level - 1); i++) {
        renderContent.push(h('span', {
          style: { width: '25px', display: 'inline-block' }
        }))
      }

      // 判断是否显示图标
      if (!this.$CV.isEmpty(params.row.children)) {
        let iconType = params.row.children[0]._show ? 'ios-arrow-down' : 'ios-arrow-forward'
        let renderIcon = h('Icon', {
          props: { type: iconType, size: 25 }
        })
        renderContent.push(renderIcon)
      } else {
        renderContent.push(h('span', {
          style: { width: '25px', display: 'inline-block' }
        }))
      }

      // 显示菜单名称
      let renderSpan = h('span', ' ' + params.row.lable)
      renderContent.push(renderSpan)

      return h('div', {
        style: { cursor: 'pointer' },
        on: { click: () => { this.showChildren(params.row._indexArray) } }
      }, renderContent)
    },
    /**
     * 显示子表格
     * @param index 表格在树形表格的序号
     */
    showChildren (indexArray) {
      let dictP = Object.assign({}, this.dictTableData)
      indexArray.forEach(i => { dictP = dictP[i].children })

      dictP.forEach(dict => {
        if (dict._show) this.hidenChildren(dict)
        else dict._show = !dict._show
      })
    },
    /**
     * 隐藏子表格时，将孙子以下表格也隐藏
     */
    hidenChildren (dict) {
      dict._show = false

      if (!this.$CV.isEmpty(dict.children)) {
        dict.children.forEach(dictChildren => { this.hidenChildren(dictChildren) })
      }
    },
    /**
     * 树形表格显示行时的样式
     * @param row
     * @param index
     * @returns {string}
     */
    showTableTree (row, index) {
      return row._show ? '' : 'switchTableTree'
    },
    /**
     * 列表按钮
     */
    bindEvent (h, params) {
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
          props: { type: 'success', ghost: true },
          on: { click: () => { this.raiseChildrenHandle(params.row) } }
        }, '添加下级字典')
      ])
    },
    /**
     * 获取字典信息
     */
    initDictTreeData () {
      this.listLoading = true
      tree().then(data => {
        this.dictTableData = data.result
        this.listLoading = false
      })
    },
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + row.lable + '</span> 的字典将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then(() => {
            this.initDictTreeData()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 修改字典信息
     */
    modifyHandle (row) {
      this.modifyId = row.id; this.parentDict = null; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 新增字典
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true; this.parentDict = null
    },
    /**
     * 新增下级字典
     * @param row
     */
    raiseChildrenHandle (row) {
      this.formType = 'raise'; this.showForm = true; this.parentDict = row
    }
  }
}
</script>
<style lang="scss">
  .app-sys-dict{
    .switchTableTree{
      display:none;
    }
  }
</style>
