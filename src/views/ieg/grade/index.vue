<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Col span="16">
        <!--<Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle">新增</Button>-->
        <Button type="primary" icon="ios-filing" @click="importHandle">批量导入</Button>
        <Button type="success" icon="ios-add-circle-outline" @click="checkHandle">批量校验</Button>
        <Button type="error" icon="ios-trash-outline" @click="deleteAllHandle">批量删除</Button>
      </Col>
      <Col span="8">
        <Form ref="searchForm" :model="listQuery" :label-width="80" inline style="float: right">
          <FormItem label="年份">
            <InputNumber :max="10000" :min="1" v-model="listQuery.year" style="width: 100%" @on-change="selectYear"/>
          </FormItem>
          <FormItem label="类型" prop="type">
            <RadioGroup v-model="listQuery.type" @on-change="selectType">
              <Radio label="L">理科</Radio>
              <Radio label="W">文科</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </Col>
    </Row>
    <Row>
      <Table :height="tableHeight" border :columns="tableColumns" :data="tableData" :loading="listLoading" stripe/>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="gradePage"/>
    </Row>

    <CIegGradeForm v-model="showForm" :type="formType" :grade="currenGrade" @refresh="initList"/>
    <CIegGradeImport v-model="showImport" :type="importType" @refresh="initImportList"/>
  </Layout>
</template>
<script>
import CIegGradeForm from '@/views/ieg/grade/form'
import CIegGradeImport from '@/views/ieg/grade/import'
import moment from 'moment'
import { list, del, delByYearAndType } from '@/api/ieg/grade'
import store from '@/store'

export default {
  name: 'IegGrade',
  components: {
    CIegGradeForm, CIegGradeImport
  },
  computed: {
    /**
     * 列表高度
     */
    tableHeight () {
      return store.getters.windowHeight - 280
    }
  },
  data () {
    return {
      importType: 'submit',
      showImport: false,
      showForm: false,
      formType: '',
      currenGrade: null,
      listQuery: {
        year: 2000,
        type: 'L',
        size: 10,
        total: 0
      },
      gradeType: {
        L: '理科',
        W: '文科'
      },
      tableColumns: [],
      tableData: [],
      listLoading: false,
      tagColor: {
        No: 'warning',
        Yes: 'success'
      },
      tagName: {
        No: '未校验',
        Yes: '已校验'
      }
    }
  },
  created () {
    this.buildNowYear()
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * 设置年份为当前年份
     */
    buildNowYear () {
      this.listQuery.year = parseInt(moment(new Date()).format('YYYY'))
    },
    /**
     * init table columns
     */
    initTableColumns () {
      this.tableColumns = [
        {title: '分数', key: 'score', tooltip: true},
        {title: '人数', key: 'number', tooltip: true},
        {title: '累计', key: 'sort', tooltip: true},
        {
          title: '状态',
          key: 'state',
          tooltip: true,
          render: (h, params) => {
            return h('Tag', { props: { color: this.tagColor[params.row.state] } }, this.tagName[params.row.state])
          }
        }
        /* {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (h, params) => { return this.bindEvent(h, params) }
        } */
      ]
    },
    /**
     * 列表按钮
     */
    bindEvent (h, params) {
      let hContent = []

      hContent.push(
        h('Button', {
          props: { type: 'warning', ghost: true },
          on: { click: () => { this.modifyHandle(params.row) } }
        }, '编辑')
      )
      hContent.push(
        h('Button', {
          props: { type: 'error', ghost: true },
          on: { click: () => { this.deleteHandle(params.row) } }
        }, '删除')
      )

      return h('div', hContent)
    },
    /**
     * init table list data
     */
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.tableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})
        this.listLoading = false
      })
    },
    /**
     * 批量插入后刷新页面
     */
    initImportList (o) {
      this.listQuery.year = o.year; this.listQuery.type = o.type
      this.initList()
    },
    /**
     * 选择文理类型
     * @param o
     */
    selectType (o) {
      this.initList()
    },
    /**
     * 选择年份
     * @param o
     */
    selectYear (o) {
      this.initList()
    },
    /**
     * 新增
     */
    raiseHandle () {
      this.currenGrade = null; this.formType = 'raise'; this.showForm = true
    },
    /**
     * 编辑
     */
    modifyHandle (row) {
      this.currenGrade = row; this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除
     */
    deleteHandle (row) {
      this.$CDelete({
        'content': '<p> 该信息将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(row.id).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    },
    /**
     * 批量导入
     */
    importHandle () {
      this.showImport = true; this.importType = 'submit'
    },
    /**
     * 批量校验
     */
    checkHandle () {
      this.showImport = true; this.importType = 'check'
    },
    /**
     * 批量删除
     */
    deleteAllHandle () {
      this.$CDelete({
        'content': '<p> <span style="color: #f60">' + this.listQuery.year + '年' + this.gradeType[this.listQuery.type] + '</span>的一分一段表将被清空</p><p>是否继续？</p>',
        'confirm': () => {
          delByYearAndType(this.listQuery).then(data => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    }
  }
}
</script>
