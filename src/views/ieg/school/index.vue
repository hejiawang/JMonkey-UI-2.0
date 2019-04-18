<template>
  <Layout v-layoutIn>
    <Row style="height: 60px;">
      <Col span="16">
        <Button type="primary" icon="ios-add-circle-outline" v-if="ieg_school_raise"
                @click="raiseHandle">新增学院</Button>
        <Button type="warning" icon="ios-brush-outline" :disabled="currentSchoolIndex === null"
                @click="modifyHandle">修改学院</Button>
        <Button type="error" icon="ios-trash-outline" :disabled="currentSchoolIndex === null" v-if="ieg_school_delete"
                @click="deleteHandle">删除学院</Button>
        <Button type="success" icon="ios-at-outline" :disabled="currentSchoolIndex === null"
                @click="facultyHandle">院系信息</Button>
        <Button type="primary" icon="logo-designernews" :disabled="currentSchoolIndex === null"
                @click="majorHandle">专业信息</Button>
        <Button type="info" icon="ios-at-outline" :disabled="currentSchoolIndex === null"
                @click="submitHandle">投档单位</Button>
        <!-- <Button type="warning" icon="ios-menu-outline" :disabled="currentSchoolIndex === null"
                @click="enrollHandle">录取信息</Button> -->
        <Button icon="md-help" :disabled="currentSchoolIndex === null"
                @click="problemHandle">常见问题</Button>
      </Col>
      <Col span="8">
        <Form ref="searchForm" :model="listQuery" :label-width="80" inline style="float: right">
          <FormItem label="院校名称">
            <Input type="text" v-model="listQuery.name" />
          </FormItem>
          <FormItem :label-width="0">
            <ButtonGroup>
              <Button icon="ios-search" @click="search" />
              <Button icon="ios-trash-outline" @click="restSearch" />
            </ButtonGroup>
          </FormItem>
        </Form>
      </Col>
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
import { list, del } from '@/api/ieg/school'
import { mapGetters } from 'vuex'

export default {
  name: 'IegSchool',
  computed: {
    ...mapGetters(['permissions']),
    /**
     * 列表高度
     */
    schoolTableHeight () {
      return store.getters.windowHeight - 280
    },
    /**
     * 当前选中的院校信息
     */
    currentSchool () {
      return this.$CV.isEmpty(this.currentSchoolIndex) ? null : this.schoolTableData[this.currentSchoolIndex]
    }
  },
  data () {
    return {
      listLoading: false,
      listQuery: {
        name: null,
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
    this.initPermissions()
  },
  methods: {
    initPermissions () {
      this.ieg_school_delete = this.permissions['ieg_school_delete']
      this.ieg_school_raise = this.permissions['ieg_school_raise']
    },
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
        {title: '院校编码', key: 'code', tooltip: true, width: 120},
        {
          title: '所在地',
          key: 'areaProvince',
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
      this.currentSchoolIndex = null

      this.listLoading = true
      this.listQuery.userId = store.getters.user.id
      list(this.listQuery).then(data => {
        this.schoolTableData = data.rows
        this.listQuery = Object.assign({}, this.listQuery, {total: data.total})

        this.listLoading = false

        if (this.schoolTableData.length > 0) this.currentSchoolIndex = 0
      })
    },
    /**
     * 重置角色列表搜索条件
     */
    restSearch () {
      ['name'].forEach(param => (
        this.listQuery[param] = null
      ))
      this.search()
    },
    /**
     * 角色列表搜索
     */
    search () {
      this.$refs.schoolPage.rest()
      this.initList()
    },
    /**
     * 点击table一行时触发
     */
    clickTable (row, index) {
      this.currentSchoolIndex = index
    },
    /**
     * 删除院校信息
     */
    deleteHandle () {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + this.currentSchool.name + '</span> 的院校将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(this.currentSchool.id).then((data) => {
            this.initList()

            if (data.result) this.$Message.success('删除成功')
            else this.$Message.error('删除失败')
          })
        }
      })
    },
    /**
     * 新增院校信息
     */
    raiseHandle () {
      this.$router.replace({path: '/ieg/school/form'})
    },
    /**
     * 修改院校信息
     */
    modifyHandle () {
      this.$router.replace(
        {path: '/ieg/school/form', query: {schoolId: this.currentSchool.id}}
      )
    },
    /**
     * 学院信息
     */
    facultyHandle () {
      this.$router.replace(
        {
          path: '/ieg/faculty',
          query: {schoolId: this.currentSchool.id, schoolName: this.currentSchool.name}
        }
      )
    },
    /**
     * 投档单位信息
     */
    submitHandle () {
      this.$router.replace(
        {
          path: '/ieg/schoolSubmit',
          query: {schoolId: this.currentSchool.id, schoolName: this.currentSchool.name}
        }
      )
    },
    /**
     * 专业信息
     */
    majorHandle () {
      this.$router.replace(
        {
          path: '/ieg/schoolMajor',
          query: {schoolId: this.currentSchool.id, schoolName: this.currentSchool.name}
        }
      )
    },
    /**
     * 学校历年录取信息
     */
    enrollHandle () {
      this.$router.replace(
        {
          path: '/ieg/schoolEnrollRecord',
          query: {schoolId: this.currentSchool.id, schoolName: this.currentSchool.name}
        }
      )
    },
    /**
     * 考生对学校的常见问题以及回答
     */
    problemHandle () {
      this.$router.replace(
        {
          path: '/ieg/schoolProblem',
          query: {schoolId: this.currentSchool.id, schoolName: this.currentSchool.name}
        }
      )
    }
  }
}
</script>
<style lang="scss">

</style>
