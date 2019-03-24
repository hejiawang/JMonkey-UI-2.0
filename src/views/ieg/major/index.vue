<template>
  <Layout v-layoutIn>
    <Row :gutter="32" class="ieg-major-main">
      <Col span="6">
        <Row class="ieg-major-button">
          <ButtonGroup >
            <Button type="primary" icon="ios-add-circle-outline" @click="raiseHandle"> 新增 </Button>
            <Button type="warning" icon="ios-brush-outline"> 修改 </Button>
            <Button type="error" icon="ios-trash-outline"> 删除 </Button>
          </ButtonGroup>
        </Row>
        <Row class="ieg-major-degree">
          <Tabs @on-click="selectDegreeHandle">
            <TabPane label="本科" icon="ios-cube-outline" name="B"/>
            <TabPane label="专科" icon="md-crop" name="Z"/>
          </Tabs>
        </Row>
        <Tree :data="treeDate" ref="magorTree" @on-select-change="selectMagor"/>
      </Col>
      <Col span="18">
      </Col>

      <CIegMajorForm v-model="showForm" :type="formType" @refresh="initMajorList"/>
    </Row>
  </Layout>
</template>
<script>
import CIegMajorForm from '@/views/ieg/major/form'
import { tree } from '@/api/ieg/major'
import { converKey } from '@/utils/common'

export default {
  name: 'IegMajor',
  components: {
    CIegMajorForm
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
      magorTreeDate: []
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
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
    },
    selectMagor (row) {
      console.info(row)
    }
  }
}
</script>
<style lang="scss">
  .ieg-major-main{
    height: 100%;
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
  }
</style>
