<template>
  <Layout v-layoutIn class="ieg-faculty">
    <Row :gutter="32">
      <Col span="22"><Alert show-icon>【 {{schoolName}} 】 院系信息维护</Alert></Col>
      <Col span="2"><Button long type="info" icon="ios-undo" @click="goBack"> 返 回 </Button></Col>
    </Row>
    <Row :gutter="32" class="ieg-faculty-main">
      <Col span="6">
        <Row style="height: 50px;">
          <ButtonGroup >
            <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新增 </Button>
            <Button type="warning" icon="ios-brush-outline" @click="modifyHandle"
                    :disabled="currentFacultyIndex === null"> 修改 </Button>
            <Button type="error" icon="ios-trash-outline" @click="deleteHandle"
                    :disabled="currentFacultyIndex === null"> 删除 </Button>
          </ButtonGroup>
        </Row>
        <Row>
          <RadioGroup v-model="currentFacultyIndex" vertical style="width: 100%;">
            <Table :height="facultyTableHeight" border :columns="facultyTableColumns" :show-header="false"
                   :data="facultyTableData" :loading="listLoading" stripe @on-row-click="clickTable"/>
          </RadioGroup>
        </Row>
      </Col>
      <Col span="18" class="ieg-faculty-view">
        <Row style="line-height: 50px; font-size: 17px;">
          <Col span="6" v-if="currentFaculty && currentFaculty.name">
            <span><Icon type="md-reorder" size="17"/> 院系名称： {{currentFaculty.name}} </span>
            <Divider type="vertical" />
          </Col>
          <!-- <Col span="6" v-if="currentFaculty && currentFaculty.sort">
            <span><Icon type="ios-pulse" size="17"/> 院系排名： {{currentFaculty.sort}} </span>
            <Divider type="vertical" />
          </Col> -->
          <Col span="6" v-if="currentFaculty && currentFaculty.website">
            <span><Icon type="logo-linkedin" size="17"/> 院系网址： {{currentFaculty.website}} </span>
            <Divider type="vertical" />
          </Col>
          <!-- <Col span="6" v-if="currentFaculty && currentFaculty.phone">
            <span><Icon type="md-call" size="17"/> 联系方式： {{currentFaculty.phone}} </span>
          </Col> -->
        </Row>
        <Row v-if="currentFaculty && currentFaculty.describe">
          <Divider><Icon type="ios-information-circle-outline" size="16"/> 院系详细信息 </Divider>
        </Row>
        <Row class="describe-body ql-container ql-snow" v-if="currentFaculty && currentFaculty.describe">
          <Row class="ql-editor" v-html="currentFaculty.describe" />
        </Row>
      </Col>
    </Row>

    <CIegFacultyForm v-model="showForm" :type="formType" :schoolId="schoolId" :faculty="currentFaculty" @refresh="initList"/>
  </Layout>
</template>
<script>
import store from '@/store'
import CIegFacultyForm from '@/views/ieg/faculty/form'
import { list, del } from '@/api/ieg/faculty'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'IegFaculty',
  components: {
    CIegFacultyForm
  },
  computed: {
    /**
     * 列表高度
     */
    facultyTableHeight () {
      return store.getters.windowHeight - 285
    },
    /**
     * 当前院校名称
     * @returns {*}
     */
    schoolName () {
      return this.$route.query.schoolName
    },
    /**
     * 当前院校id
     * @returns {*}
     */
    schoolId () {
      return this.$route.query.schoolId
    },
    /**
     * 当前院系信息
     */
    currentFaculty () {
      return this.$CV.isEmpty(this.currentFacultyIndex) ? null : this.facultyTableData[this.currentFacultyIndex]
    }
  },
  data () {
    return {
      showForm: false,
      formType: '',
      listLoading: false,
      facultyTableColumns: [],
      facultyTableData: [],
      currentFacultyIndex: null
    }
  },
  created () {
    this.initTableColumns()
    this.initList()
  },
  methods: {
    /**
     * initTableColumns
     */
    initTableColumns () {
      this.facultyTableColumns = [
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
        {title: '院系名称', key: 'name', tooltip: true}
      ]
    },
    /**
     * init table list data
     */
    initList () {
      this.currentFacultyIndex = null

      this.listLoading = true
      list({schoolId: this.schoolId}).then(data => {
        this.facultyTableData = data.result
        this.listLoading = false

        if (this.facultyTableData.length > 0) this.currentFacultyIndex = 0
      })
    },
    /**
     * 返回学院列表页
     */
    goBack () {
      this.$router.replace({path: '/ieg/school'})
    },
    /**
     * click table row
     */
    clickTable (row, index) {
      this.currentFacultyIndex = index
    },
    /**
     * 新增院系信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改院校信息
     */
    modifyHandle () {
      this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除院系信息
     */
    deleteHandle () {
      this.$CDelete({
        'content': '<p>名称为 <span style="color: #f60">' + this.currentFaculty.name + '</span> 的院系将被删除</p><p>是否继续？</p>',
        'confirm': () => {
          del(this.currentFaculty.id).then((data) => {
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
<style lang="scss">
  .ieg-faculty{
    .ieg-faculty-main {
      margin-top: 10px;
      height: calc(100% - 55px);
      .ieg-faculty-view {
        height: 100%;
        .describe-body {
          height: calc(100% - 110px);
          overflow-y: auto;
          border: 0px;
        }
      }
    }
  }
</style>
