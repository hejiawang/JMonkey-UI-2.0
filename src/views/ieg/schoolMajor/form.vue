<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1200" class="ieg-school-major-form">
    <Form ref="schoolMajorForm" :model="schoolMajorForm" :rules="schoolMajorRules" :label-width="90">
      <Tabs value="major_info">
        <TabPane label="基本信息" icon="ios-cube-outline" name="major_info">
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="专业名称" prop="name" >
                <Input type="text" v-model.trim="schoolMajorForm.name" :maxlength="50" clearable />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="归属学科" prop="majorTwoId" >
                <CIegSPMajor v-model="schoolMajorForm.majorTwoId" :degreeType="schoolMajorForm.degreeType" level="Three"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="专业编码" prop="code">
                <Input type="text" v-model.trim="schoolMajorForm.code" :maxlength="50" clearable />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="学历层次" prop="degreeType">
                <RadioGroup v-model="schoolMajorForm.degreeType" @on-change="selectDegreeType">
                  <Radio label="B">本科</Radio>
                  <Radio label="Z">专科</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学科类型" prop="degreeType">
                <RadioGroup v-model="schoolMajorForm.courseType">
                  <Radio label="W">文科</Radio>
                  <Radio label="L">理科</Radio>
                  <Radio label="A">文科/理科</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="专业学费" prop="money">
                <InputNumber :max="100000" :min="0" v-model="schoolMajorForm.money" style="width: 100%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="投档单位" prop="submitId">
                <CIegSubmitSelect v-model="schoolMajorForm.submitId" :schoolId="schoolId"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="所属院系" prop="facultyId">
                <CIegFacultySelect v-model="schoolMajorForm.facultyId" :schoolId="schoolId"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="专业学制" prop="studyLength">
                <InputNumber :max="100000" :min="0" v-model="schoolMajorForm.studyLength" style="width: 100%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
              <FormItem label="专业特性" prop="features">
                <CDictSelect v-model="schoolMajorForm.features" type="radio"
                             :multiple="true" dict="ieg-school-major-features-type"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="6">
              <FormItem label="男生比例" prop="ratioSexMan">
                <InputNumber :max="100" :min="0" v-model="schoolMajorForm.ratioSexMan"
                             :formatter="value => `${value}%`"
                             :parser="value => value.replace('%', '')" style="width: 100%"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="女生比例" prop="ratioSexWoman">
                <InputNumber :max="100" :min="0" v-model="schoolMajorForm.ratioSexWoman"
                             :formatter="value => `${value}%`"
                             :parser="value => value.replace('%', '')"  style="width: 100%"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="文科比例" prop="ratioCourseArts">
                <InputNumber :max="100" :min="0" v-model="schoolMajorForm.ratioCourseArts"
                             :formatter="value => `${value}%`"
                             :parser="value => value.replace('%', '')"  style="width: 100%"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="理科比例" prop="ratioCourseSci">
                <InputNumber :max="100" :min="0" v-model="schoolMajorForm.ratioCourseSci"
                             :formatter="value => `${value}%`"
                             :parser="value => value.replace('%', '')"  style="width: 100%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
              <FormItem label="就业方向" prop="workDirection">
                <Input type="textarea" v-model.trim="schoolMajorForm.workDirection" :maxlength="500" clearable />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
              <FormItem label="主要课程" prop="course">
                <Input type="textarea" v-model.trim="schoolMajorForm.course" :maxlength="500" clearable />
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="专业介绍" icon="ios-grid" name="major_detail">
          <Row style="height: 400px">
            <CEditor v-model="schoolMajorForm.describe" imgRef="major_detail"
                     imgAction="/ieg/school/major/file" :imgData="{schoolId: schoolId}"/>
          </Row>
        </TabPane>
      </Tabs>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/ieg/schoolMajor'
import CEditor from '@/components/layout/editor'
import CIegFacultySelect from '@/views/ieg/faculty/select'
import CIegSubmitSelect from '@/views/ieg/schoolSubmit/select'
import CDictSelect from '@/components/sys/dict/select'
import CIegSPMajor from '@/views/ieg/major/selectParentMajor'

export default {
  name: 'IegSchoolMajor_Form',
  components: {
    CEditor, CIegFacultySelect, CDictSelect, CIegSubmitSelect, CIegSPMajor
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    schoolId: {type: String, default: '', required: true},
    major: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) },
    fSexMan (val) { this.schoolMajorForm.ratioSexWoman = 100 - val },
    fSexWoman (val) { this.schoolMajorForm.ratioSexMan = 100 - val },
    fCourseArts (val) { this.schoolMajorForm.ratioCourseSci = 100 - val },
    fCourseSci (val) { this.schoolMajorForm.ratioCourseArts = 100 - val }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑院校专业信息',
        'raise': '新增院校专业信息'
      }
      return titleAry[this.type]
    },
    fSexMan () { return this.schoolMajorForm.ratioSexMan },
    fSexWoman () { return this.schoolMajorForm.ratioSexWoman },
    fCourseArts () { return this.schoolMajorForm.ratioCourseArts },
    fCourseSci () { return this.schoolMajorForm.ratioCourseSci }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      schoolMajorForm: {
        majorTwoId: '',
        sort: 1,
        degreeType: 'B',
        facultyId: '',
        submitId: '',
        courseType: 'W',
        code: null,
        name: '',
        ratioSexMan: 50,
        ratioSexWoman: 50,
        ratioCourseArts: 50,
        ratioCourseSci: 50,
        money: 4200,
        studyLength: 4,
        studentScope: null,
        ratioAssessWhole: 5,
        ratioAssessWork: 5,
        ratioAssessStudy: 5,
        ratioAssessShool: 5,
        ratioAssessDifficulty: 5,
        describe: null,
        workDirection: null,
        course: null,
        features: []
      },
      schoolMajorRules: {
        name: { required: true, message: '请输入专业名称', trigger: 'blur' },
        code: { required: true, message: '请输入专业编码', trigger: 'blur' },
        submitId: { required: true, message: '请选择投档单位', trigger: 'change' }
      }
    }
  },
  methods: {
    selectDegreeType (o) {
      this.schoolMajorForm.majorTwoId = null
    },
    /**
     * ok handle
     */
    ok () {
      this.$refs.schoolMajorForm.validate((valid) => {
        if (valid) {
          this.schoolMajorForm.schoolId = this.schoolId
          if (this.schoolMajorForm.recordType === 'Other') this.schoolMajorForm.majorId = 'other_three'

          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * raise faculty
     */
    raise () {
      save(this.schoolMajorForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      modify(this.schoolMajorForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 操作成功
     * @param msg
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * close modal
     */
    cancel () {
      this.$refs.schoolMajorForm.resetFields()

      this.schoolMajorForm = {
        majorTwoId: '',
        sort: 1,
        degreeType: 'B',
        facultyId: '',
        submitId: '',
        courseType: 'W',
        code: null,
        name: '',
        ratioSexMan: 50,
        ratioSexWoman: 50,
        ratioCourseArts: 50,
        ratioCourseSci: 50,
        money: 4200,
        studyLength: 4,
        studentScope: null,
        ratioAssessWhole: 5,
        ratioAssessWork: 5,
        ratioAssessStudy: 5,
        ratioAssessShool: 5,
        ratioAssessDifficulty: 5,
        describe: null,
        workDirection: null,
        course: null,
        features: []
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.schoolMajorForm = Object.assign({}, this.major)
      }
    }
  }
}
</script>
<style lang="scss">
  .ieg-school-major-form {
    .ivu-modal {
      top: 50px;
    }
    .ivu-tabs-nav-container {
      font-size: 17px;
    }
    .ivu-tabs-nav .ivu-tabs-tab .ivu-icon{
      width: 17px;
      height: 17px;
    }
    .app-layout-editor {
      height: 100%;
    }
  }
</style>
