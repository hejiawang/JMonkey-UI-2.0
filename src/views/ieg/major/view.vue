<template>
  <Card class="ieg-major-view" v-if="majorForm !== null">
    <Row> <Alert show-icon>基 本 信 息 </Alert> </Row>
    <Row class="ieg-major-base">
      <span><Icon type="ios-appstore-outline" size="17"/> 专业名称： {{majorForm.name}} </span>
      <Divider type="vertical" />
      <span><Icon type="ios-at-outline" size="17"/> 专业代码： {{majorForm.code}} </span>
      <Divider type="vertical" />
      <span><Icon type="ios-barcode-outline" size="17"/> 学历层次： {{majorForm.degreeType}}</span>
      <template v-if="majorForm.oneName">
        <Divider type="vertical" />
        <span><Icon type="md-book" size="17"/> 门类： {{majorForm.oneName}}</span>
      </template>
      <template v-if="majorForm.twoName">
        <Divider type="vertical" />
        <span><Icon type="ios-browsers-outline" size="17"/> 学科： {{majorForm.twoName}}</span>
      </template>
    </Row>
    <Row > <Alert show-icon>详 细 信 息 </Alert> </Row>
    <Row class="ieg-major-detail">
      <Row v-if="majorForm.describe"><Divider><Icon type="ios-document-outline" size="16"/> 专业简介</Divider></Row>
      <Row >
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>{{majorForm.describe}}</span>
      </Row>
      <Row v-if="majorForm.workDirection" style="margin-top: 10px;"><Divider><Icon type="ios-document-outline" size="16"/> 从业方向</Divider></Row>
      <Row >
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>{{majorForm.workDirection}}</span>
      </Row>
      <Row v-if="majorForm.course" style="margin-top: 10px;"><Divider><Icon type="ios-document-outline" size="16"/> 专业课程</Divider></Row>
      <Row >
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>{{majorForm.course}}</span>
      </Row>
    </Row>

    <Row style="margin-bottom: 20px;"> <Alert show-icon>统 计 信 息 </Alert> </Row>
    <Row>
      <Row :gutter="10">
        <Col span="7">
          <ChartCircle :value="sexData" text="" style="height: 200px;" ref="majorSexChart"/>
        </Col>
        <Col span="7">
          <ChartCircle :value="courseData" text="" style="height: 200px;" ref="majorCourseChart"/>
        </Col>
        <Col span="7">
          <ChartRadar :value="assessData" :indicator="indicator" hint="专业满意度评价" style="height: 200px;" ref="majorAssessChart"/>
        </Col>
        <Col span="3" v-if="majorForm.studentScope">
          <p><Icon type="ios-contacts" />学生规模: </p>
          <p>{{majorForm.studentScope}}</p>
        </Col>
      </Row>
    </Row>
  </Card>
</template>
<script>
import { findDto } from '@/api/ieg/major'
import { ChartCircle, ChartRadar } from '@/components/layout/charts'

export default {
  name: 'IegMajor_View',
  props: {
    majorId: {type: String, default: '', required: true}
  },
  components: {
    ChartCircle, ChartRadar
  },
  computed: {
    /**
     * 构建性别比例数据
     * @returns {*[]}
     */
    sexData () {
      return [{value: this.majorForm.ratioSexMan, name: '男生比例'}, {value: this.majorForm.ratioSexWoman, name: '女生比例'}]
    },
    /**
     * 构建学科比例数据
     * @returns {*[]}
     */
    courseData () {
      return [{value: this.majorForm.ratioCourseArts, name: '文科比例'}, {value: this.majorForm.ratioCourseSci, name: '理科比例'}]
    },
    assessData () {
      return [this.majorForm.ratioAssessWhole, this.majorForm.ratioAssessWork, this.majorForm.ratioAssessStudy, this.majorForm.ratioAssessShool, this.majorForm.ratioAssessDifficulty]
    }
  },
  watch: {
    majorId (val) {
      if (this.$CV.isEmpty(this.majorId)) this.majorForm = null
      else findDto(this.majorId).then(data => { this.majorForm = data.result })
    }
  },
  data () {
    return {
      majorForm: null,
      indicator: [
        {text: '综合评价', max: 5},
        {text: '就业评价', max: 5},
        {text: '教学评价', max: 5},
        {text: '办学评价', max: 5},
        {text: '难易评价', max: 5}
      ]
    }
  }
}
</script>
<style lang="scss">
  .ieg-major-view {
    height: 100%;
    .ivu-card-body {
      height: 100%;
      overflow-y: auto;
    }

    .ieg-major-base {
      line-height: 30px;
      padding: 10px;
      margin-bottom: 20px;
    }
    .ieg-major-detail {
      margin-bottom: 20px;
    }
  }
</style>
