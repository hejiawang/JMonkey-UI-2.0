<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" width="1200" class="ieg-major-form">
    <Form ref="majorForm" :model="majorForm" :rules="majorRules" :label-width="90">
      <Row> <Alert show-icon>专 业 基 本 信 息 </Alert> </Row>
      <Row  :gutter="32">
        <Col span="12">
          <FormItem label="学历层次" prop="degreeType">
            <RadioGroup v-model="majorForm.degreeType">
              <Radio label="B">本科</Radio>
              <Radio label="Z">专科</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="层级分类" prop="levelType">
            <RadioGroup v-model="majorForm.levelType">
              <Radio label="One">门类</Radio>
              <Radio label="Two">学科</Radio>
              <Radio label="Three">专业</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="32">
        <Col span="12">
          <FormItem label="专业名称" prop="name">
            <Input type="text" v-model.trim="majorForm.name" :maxlength="50" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="专业编码" prop="code">
            <Input type="text" v-model.trim="majorForm.code" :maxlength="50" clearable />
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="32">
        <Col span="12">
          <FormItem label="上级专业" prop="parentId">
            <Input type="text" v-model.trim="majorForm.parentId" :maxlength="50" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="专业排序" prop="sort">
            <InputNumber :max="1000" :min="1" v-model="majorForm.sort" style="width: 100%"/>
          </FormItem>
        </Col>
      </Row>

      <Row> <Alert show-icon type="warning">专 业 详 细 信 息 </Alert> </Row>
      <FormItem label="专业简介" prop="describe">
        <Input type="textarea" v-model.trim="majorForm.describe" :maxlength="500" clearable />
      </FormItem>
      <FormItem label="从业方向" prop="workDirection">
        <Input type="textarea" v-model.trim="majorForm.workDirection" :maxlength="500" clearable />
      </FormItem>
      <FormItem label="专业课程" prop="course">
        <Input type="textarea" v-model.trim="majorForm.course" :maxlength="500" clearable />
      </FormItem>
      <Row  :gutter="32">
        <Col span="6">
          <FormItem label="男生比例" prop="ratioSexMan">
            <InputNumber :max="100" :min="0" v-model="majorForm.ratioSexMan"
                         :formatter="value => `${value}%`"
                         :parser="value => value.replace('%', '')" style="width: 100%"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="女生比例" prop="ratioSexWoman">
            <InputNumber :max="100" :min="0" v-model="majorForm.ratioSexWoman"
                         :formatter="value => `${value}%`"
                         :parser="value => value.replace('%', '')"  style="width: 100%"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="文科比例" prop="ratioCourseArts">
            <InputNumber :max="100" :min="0" v-model="majorForm.ratioCourseArts"
                         :formatter="value => `${value}%`"
                         :parser="value => value.replace('%', '')"  style="width: 100%"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="理科比例" prop="ratioCourseSci">
            <InputNumber :max="100" :min="0" v-model="majorForm.ratioCourseSci"
                         :formatter="value => `${value}%`"
                         :parser="value => value.replace('%', '')"  style="width: 100%"/>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="32">
        <Col span="18">
          <FormItem label="学生规模" prop="studentScope">
            <Input type="text" v-model.trim="majorForm.studentScope" :maxlength="50" clearable />
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="综合评价" prop="ratioAssessWhole">
            <Rate allow-half v-model="majorForm.ratioAssessWhole"/>
          </FormItem>
        </Col>
      </Row>
      <Row  :gutter="32">
        <Col span="6">
          <FormItem label="就业评价" prop="ratioAssessWork">
            <Rate allow-half v-model="majorForm.ratioAssessWork"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="教学评价" prop="ratioAssessStudy">
            <Rate allow-half v-model="majorForm.ratioAssessStudy"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="办学评价" prop="ratioAssessShool">
            <Rate allow-half v-model="majorForm.ratioAssessShool"/>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="难易评价" prop="ratioAssessDifficulty">
            <Rate allow-half v-model="majorForm.ratioAssessDifficulty"/>
          </FormItem>
        </Col>
      </Row>

    </Form>
  </Modal>
</template>
<script>
export default {
  name: 'IegMajor_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑专业信息',
        'raise': '新增专业信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      majorForm: {
        parentId: null,
        degreeType: 'B',
        levelType: 'One',
        name: null,
        code: null,
        sort: 1,
        describe: null,
        workDirection: null,
        course: null,
        studentScope: null,
        ratioSexMan: 50,
        ratioSexWoman: 50,
        ratioCourseArts: 50,
        ratioCourseSci: 50,
        ratioAssessWhole: 5,
        ratioAssessWork: 5,
        ratioAssessStudy: 5,
        ratioAssessShool: 5,
        ratioAssessDifficulty: 5
      },
      majorRules: {

      }
    }
  },
  methods: {
    ok () {
    },
    cancel () {
    },
    visibleChange (isOpen) {
    }
  }
}
</script>
<style lang="scss">
  .ieg-major-form {
    .ivu-modal {
      top: 10px;
    }
  }
</style>
