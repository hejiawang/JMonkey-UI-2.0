<template>
  <Layout v-layoutIn>
    <Row :gutter="32" class="ieg-major-main">
      <Col span="6" class="ieg-major-h">
        <Row class="ieg-major-button">
          <ButtonGroup >
            <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新增 </Button>
            <Button type="warning" icon="ios-brush-outline" @click="modifyHandle"> 修改 </Button>
            <Button type="error" icon="ios-trash-outline" @click="deleteHandle"> 删除 </Button>
          </ButtonGroup>
        </Row>
        <Row class="ieg-major-degree">
          <Tabs @on-click="selectDegreeHandle">
            <TabPane label="本科" icon="ios-cube-outline" name="B"/>
            <TabPane label="专科" icon="md-crop" name="Z"/>
          </Tabs>
        </Row>
        <Row class="ieg-major-tree">
          <Tree :data="treeDate" ref="magorTree" @on-select-change="selectMagor"/>
        </Row>
      </Col>
      <Col span="18" class="ieg-major-h">
        <CIegMajorView :majorId="majorIdC"/>
      </Col>

      <CIegMajorForm v-model="showForm" :type="formType" :majorId="majorIdC" @refresh="initMajorList"/>
    </Row>
  </Layout>
</template>
<script>
import CIegMajorForm from '@/views/ieg/major/form'
import CIegMajorView from '@/views/ieg/major/view'
import { tree, del } from '@/api/ieg/major'
import { converKey } from '@/utils/common'

export default {
  name: 'IegMajor',
  components: {
    CIegMajorForm, CIegMajorView
  },
  computed: {
    /**
     * 转换tree控件展示的title
     * @returns {*}
     */
    treeDate () {
      let tmpTreeData = Array.isArray(this.magorTreeDate) ? this.magorTreeDate : [this.magorTreeDate]
      return converKey(tmpTreeData)
    }
  },
  data () {
    return {
      showForm: false,
      formType: '',
      selectDegree: 'B',
      magorTreeDate: [],
      majorIdC: ''
    }
  },
  created () {
    this.initMajorList()
  },
  methods: {
    /**
     * 初始化专业树信息
     */
    initMajorList () {
      this.majorIdC = ''

      tree({degreeType: this.selectDegree}).then(data => {
        this.magorTreeDate = data.result
      })
    },
    /**
     * 选择学历层次
     * @param tabName 学历层次标识
     */
    selectDegreeHandle (tabName) {
      this.selectDegree = tabName

      this.initMajorList()
    },
    /**
     * 新增专业信息
     */
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    /**
     * 修改专业信息
     */
    modifyHandle () {
      if (this.$CV.isEmpty(this.majorIdC)) {
        this.$Message.error('请选择专业信息')
        return
      }

      if (this.majorIdC.indexOf('other') !== -1) {
        this.$Message.error('该专业不可修改')
        return
      }

      this.formType = 'modify'; this.showForm = true
    },
    /**
     * 删除专业信息
     */
    deleteHandle () {
      if (this.$CV.isEmpty(this.majorIdC)) {
        this.$Message.error('请选择专业信息')
        return
      }

      if (this.majorIdC.indexOf('other') !== -1) {
        this.$Message.error('该专业不可删除')
        return
      }

      this.$CDelete({
        'content': '<p>该专业将被删除, 是否继续？</p>',
        'confirm': () => {
          del(this.majorIdC).then(() => {
            this.initMajorList()
            this.$Message.success('删除成功')
          })
        }
      })
    },
    /**
     * 选择专业
     * @param row
     */
    selectMagor (row) {
      if (this.$CV.isEmpty(row)) this.majorIdC = ''
      else this.majorIdC = row[0].id
    }
  }
}
</script>
<style lang="scss">
  .ieg-major-main{
    height: 100%;
    .ieg-major-h {
      height: 100%;
    }
    .ieg-major-button{
      height: 60px;
    }
    .ieg-major-degree{
      height: 60px;
      .ivu-tabs-nav-container{
        font-size: 17px;
      }
      .ivu-tabs-nav .ivu-tabs-tab .ivu-icon{
        width: 17px;
        height: 17px;
      }
    }
    .ieg-major-tree {
      height: calc(100% - 120px);
      overflow-y: auto;
    }
  }
</style>
