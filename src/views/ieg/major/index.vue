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

      </Col>
      <Col span="18">

      </Col>

      <CIegMajorForm v-model="showForm" :type="formType" />
    </Row>
  </Layout>
</template>
<script>
import CIegMajorForm from '@/views/ieg/major/form'

export default {
  name: 'IegMajor',
  components: {
    CIegMajorForm
  },
  data () {
    return {
      showForm: false,
      formType: ''
    }
  },
  methods: {
    selectDegreeHandle (tabName) {
      console.info(tabName)
    },
    raiseHandle () {
      this.formType = 'raise'; this.showForm = true
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
