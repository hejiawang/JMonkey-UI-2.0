<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="1000">
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
        ratioSexMan: 0,
        ratioSexWoman: 0,
        ratioCourseArts: 0,
        ratioCourseSci: 0,
        ratioAssessWhole: 0,
        ratioAssessWork: 0,
        ratioAssessStudy: 0,
        ratioAssessShool: 0,
        ratioAssessDifficulty: 0
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
