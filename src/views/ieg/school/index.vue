<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle">新增学院</Button>
      <Button type="warning" icon="ios-brush-outline">修改学院</Button>
      <Button type="error" icon="ios-trash-outline">删除学院</Button>
      <Button type="success" icon="ios-at-outline">学院信息</Button>
      <Button type="primary" icon="logo-designernews">专业信息</Button>
      <Button type="info" icon="ios-menu-outline">录取信息</Button>
      <Button icon="md-help">问题信息</Button>
    </Row>
    <Row>
      <RadioGroup v-model="currentSchoolIndex" vertical style="width: 100%;">
        <Table :height="schoolTableHeight" border :columns="schoolTableColumns"
               :data="schoolTableData" :loading="listLoading" stripe @on-row-click="clickTable"/>
      </RadioGroup>
    </Row>
    <Row>
      <CPage v-model="listQuery" @on-list="initList" ref="schoolPage"/>
    </Row>
  </Layout>
</template>
<script>
import store from '@/store'
import pca from 'area-data/pca'
import { list } from '@/api/ieg/school'

export default {
  name: 'IegSchool',
  computed: {
    /**
     * 列表高度
     */
    schoolTableHeight () {
      return store.getters.windowHeight - 280
    }
  },
  data () {
    return {
      listLoading: false,
      listQuery: {
        current: 1,
        size: 10,
        total: 0
      },
      schoolTableColumns: [],
      schoolTableData: [],
      degreeType: {
        B: '本科',
        Z: '专科',
        A: '全部'
      },
      currentSchoolIndex: null
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * init school table columns
     */
    initTableColumns () {
      this.schoolTableColumns = [
        {
          title: ' ',
          key: 'id',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('Radio', {
              props: { label: params.index }
            }, '  ')
          }
        },
        {title: '院校名称', key: 'name', tooltip: true},
        {
          title: '所在地',
          key: 'areaProvince',
          width: 120,
          render: (h, params) => { return h('span', pca['86'][params.row.areaProvince]) }
        },
        {title: '院校排名', key: 'sort', width: 120, tooltip: true},
        {
          title: '院校隶属',
          key: 'attachTypeName',
          tooltip: true,
          render: (h, params) => {
            let attachTypeName = params.row.attachTypeName
            if (!this.$CV.isEmpty(params.row.attachInfo)) attachTypeName = params.row.attachInfo

            return h('span', attachTypeName)
          }
        },
        {title: '院校类型', key: 'majorTypeName', width: 120, tooltip: true},
        {
          title: '学历层次',
          key: 'degreeType',
          width: 120,
          tooltip: true,
          render: (h, params) => { return h('span', this.degreeType[params.row.degreeType]) }
        },
        {
          title: '院校特性',
          key: 'features',
          tooltip: true,
          render: (h, params) => {
            let renderContent = []
            params.row.featureNames.forEach(f => {
              renderContent.push(
                h('Tag', { props: { color: '#FFA2D3' } }, f)
              )
            })

            return h('div', renderContent)
          }
        }
      ]
    },
    /**
     * init school table list data
     */
    initList () {
      this.listLoading = true
      list(this.listQuery).then(data => {
        this.schoolTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false
      })
    },
    /**
     * 点击table一行时触发
     */
    clickTable (row, index) {
      this.currentSchoolIndex = index
    },
    /**
     * 新增院校信息
     */
    raiseHandle () {
      this.$router.replace({path: '/ieg/school/form'})
    }
  }
}
</script>
<style lang="scss">

</style>
