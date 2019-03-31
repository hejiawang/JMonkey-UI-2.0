<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1200" class="ieg-school-major-form">
    <Form ref="schoolMajorForm" :model="schoolMajorForm" :rules="schoolMajorRules" :label-width="90">
      <Tabs value="major_info">
        <TabPane label="基本信息" icon="ios-cube-outline" name="major_info">
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="定义类型" prop="recordType">
                <RadioGroup v-model="schoolMajorForm.recordType" @on-change="selectRecordType">
                  <Radio label="Common">通用专业</Radio>
                  <Radio label="Other">其他专业</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="选择专业" prop="majorName" v-if="schoolMajorForm.recordType === 'Common'">
                <CIegMajorSelect v-model="schoolMajorForm.majorId" :degreeType="schoolMajorForm.degreeType" @renderMajorName="renderMajorName"/>
              </FormItem>
              <FormItem label="专业名称" prop="majorName" v-if="schoolMajorForm.recordType === 'Other'">
                <Input type="text" v-model.trim="schoolMajorForm.majorName" :maxlength="50" clearable />
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
              <FormItem label="所属院系" prop="facultyId">
                <CIegFacultySelect v-model="schoolMajorForm.facultyId" :schoolId="schoolId"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="校内排行" prop="sort">
                <InputNumber :max="1000" :min="1" v-model="schoolMajorForm.sort" style="width: 100%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="专业学费" prop="money">
                <InputNumber :max="100000" :min="0" v-model="schoolMajorForm.money" style="width: 100%"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="专业学制" prop="studyLength">
                <InputNumber :max="100000" :min="0" v-model="schoolMajorForm.studyLength" style="width: 100%"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学生规模" prop="studentScope">
                <Input type="text" v-model.trim="schoolMajorForm.studentScope" :maxlength="50" clearable />
              </FormItem>
            </Col>
          </Row>
          <Row>
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
            <Col span="6">
              <FormItem label="综合评价" prop="ratioAssessWhole">
                <Rate allow-half v-model="schoolMajorForm.ratioAssessWhole"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="6">
              <FormItem label="就业评价" prop="ratioAssessWork">
                <Rate allow-half v-model="schoolMajorForm.ratioAssessWork"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="教学评价" prop="ratioAssessStudy">
                <Rate allow-half v-model="schoolMajorForm.ratioAssessStudy"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="办学评价" prop="ratioAssessShool">
                <Rate allow-half v-model="schoolMajorForm.ratioAssessShool"/>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="难易评价" prop="ratioAssessDifficulty">
                <Rate allow-half v-model="schoolMajorForm.ratioAssessDifficulty"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
              <FormItem label="从业方向" prop="workDirection">
                <Input type="textarea" v-model.trim="schoolMajorForm.workDirection" :maxlength="500" clearable />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="24">
              <FormItem label="专业课程" prop="course">
                <Input type="textarea" v-model.trim="schoolMajorForm.course" :maxlength="500" clearable />
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="专业介绍" icon="ios-grid" name="major_detail">
          <Row style="height: 530px">
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
import CIegMajorSelect from '@/views/ieg/major/selectMajor'
import CDictSelect from '@/components/sys/dict/select'

export default {
  name: 'IegSchoolMajor_Form',
  components: {
    CEditor, CIegFacultySelect, CIegMajorSelect, CDictSelect
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
        sort: 1,
        degreeType: 'B',
        facultyId: '',
        recordType: 'Common',
        majorId: '',
        majorName: '',
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
        majorName: { required: true, message: '请输入专业名称', trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * selectRecordType
     */
    selectRecordType (o) {
      this.schoolMajorForm.majorId = null; this.schoolMajorForm.majorName = null
    },
    /**
     * selectDegreeType
     */
    selectDegreeType (o) {
      if (this.schoolMajorForm.recordType === 'Common') {
        this.schoolMajorForm.majorId = null; this.schoolMajorForm.majorName = null
      }
    },
    /**
     * renderMajorName
     */
    renderMajorName (o) {
      this.schoolMajorForm.majorName = o
    },
    /**
     * ok handle
     */
    ok () {
      this.$refs.schoolMajorForm.validate((valid) => {
        if (valid) {
          this.schoolMajorForm.schoolId = this.schoolId
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
        sort: 1,
        degreeType: 'B',
        facultyId: '',
        recordType: 'Common',
        majorId: '',
        majorName: '',
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
