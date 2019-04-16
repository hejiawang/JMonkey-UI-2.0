<template>
  <Layout v-layoutIn class="ieg-school-form">
    <Form ref="schoolForm" :model="schoolForm" :rules="schoolRules" :label-width="90">
      <Row> <Alert show-icon>基 本 信 息</Alert> </Row>
      <Row :gutter="32">
        <Col span="4">
          <CUploadImg v-model="schoolForm.logo" title="上传院校LOGO" action="/ieg/school/logo"/>
        </Col>
        <Col span="20">
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="院校名称" prop="name">
                <Input type="text" v-model.trim="schoolForm.name" :maxlength="50" clearable />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="院校编码" prop="code">
                <Input type="text" v-model.trim="schoolForm.code" :maxlength="50" clearable />
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="联系方式" prop="phone">
                <Input type="text" v-model.trim="schoolForm.phone" :maxlength="50" clearable />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="10">
              <FormItem label="院校地址" prop="area">
                <al-selector v-model="area" level="2" data-type="code" class="al-selector" />
              </FormItem>
            </Col>
            <Col span="6">
              <Input type="text" v-model.trim="schoolForm.areaDetail" :maxlength="50" clearable />
            </Col>
            <Col span="8">
              <FormItem label="院校网址" prop="website">
                <Input type="text" v-model.trim="schoolForm.website" :maxlength="50" clearable >
                  <span slot="prepend">http://</span>
                </Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="8">
              <FormItem label="院校排名" prop="sort">
                <InputNumber :max="10000" :min="1" v-model="schoolForm.sort" style="width: 100%"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="院校类型" prop="majorType">
                <CDictSelect v-model="schoolForm.majorType" dict="ieg-school-major-type"/>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="学历层次" prop="degreeType">
                <RadioGroup v-model="schoolForm.degreeType">
                  <Radio label="B"> 本科 </Radio>
                  <Radio label="Z"> 高职(专科) </Radio>
                  <Radio label="A"> 本科/高职(专科) </Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="6">
              <FormItem label="归属类型" prop="attachType">
                <CDictSelect v-model="schoolForm.attachType" dict="ieg-school-attach-type"/>
              </FormItem>
            </Col>
            <Col span="6">
                <Input type="text" v-model.trim="schoolForm.attachInfo" :maxlength="50" clearable />
            </Col>
            <Col span="12">
              <FormItem label="院校特性" prop="features">
                <CDictSelect v-model="schoolForm.features" type="radio" :multiple="true" dict="ieg-school-features-type"/>
              </FormItem>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="4" offset="4">
          <FormItem label="综合评价" prop="satisfy">
            <Rate allow-half v-model="schoolForm.satisfy"/>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="环境指数" prop="ratioSatisfyEnvironment">
            <Rate allow-half v-model="schoolForm.ratioSatisfyEnvironment"/>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="生活指数" prop="ratioSatisfyLife">
            <Rate allow-half v-model="schoolForm.ratioSatisfyLife"/>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="教育指数" prop="ratioSatisfyEdu">
            <Rate allow-half v-model="schoolForm.ratioSatisfyEdu"/>
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="教育指数" prop="ratioSatisfyWork">
            <Rate allow-half v-model="schoolForm.ratioSatisfyWork"/>
          </FormItem>
        </Col>
      </Row>

      <Row> <Alert show-icon>详 细 信 息</Alert> </Row>
      <Row class="ieg-school-form-detail-img">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 学校图片</Divider>
        <Row :gutter="32">
          <Col span="6">
            <CUploadImg v-model="schoolForm.detail.img1Path" title="上传学校图片" action="/ieg/school/logo"/>
          </Col>
          <Col span="6">
            <CUploadImg v-model="schoolForm.detail.img2Path" title="上传学校图片" action="/ieg/school/logo"/>
          </Col>
          <Col span="6">
            <CUploadImg v-model="schoolForm.detail.img3Path" title="上传学校图片" action="/ieg/school/logo"/>
          </Col>
          <Col span="6">
            <CUploadImg v-model="schoolForm.detail.img4Path" title="上传学校图片" action="/ieg/school/logo"/>
          </Col>
        </Row>
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 学校简介</Divider>
        <CEditor v-model="schoolForm.detail.describe" imgRef="describe"
                 imgAction="/ieg/school/detail/file" :imgData="{content: 'describe'}" />
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 学院简介</Divider>
        <CEditor v-model="schoolForm.detail.faculty" imgRef="faculty"
                 imgAction="/ieg/school/detail/file" :imgData="{content: 'faculty'}"/>
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 食宿条件</Divider>
        <CEditor v-model="schoolForm.detail.life" imgRef="life"
                 imgAction="/ieg/school/detail/file" :imgData="{content: 'life'}"/>
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 奖学金设置及推免名额 </Divider>
        <CEditor v-model="schoolForm.detail.scholarship" imgRef="scholarship"
                 imgAction="/ieg/school/detail/file" :imgData="{content: 'scholarship'}"/>
      </Row>
    </Form>
    <Row :gutter="120">
      <Col offset="8" span="4"><Button long type="info" @click="goBack">取 消</Button></Col>
      <Col span="4"><Button long type="success" @click="submitHandle" :loading="loading">确 定</Button></Col>
    </Row>
  </Layout>
</template>
<script>
import CDictSelect from '@/components/sys/dict/select'
import CUploadImg from '@/components/layout/uploadImg'
import CEditor from '@/components/layout/editor'
import { save, modify, findDto } from '@/api/ieg/school'

export default {
  name: 'IegSchoolForm',
  components: {
    CDictSelect, CUploadImg, CEditor
  },
  watch: {
    area (val) {
      if (this.area.length >= 1) this.schoolForm.areaProvince = this.area[0]
      if (this.area.length >= 2) this.schoolForm.areaCity = this.area[1]
      if (this.area.length >= 3) this.schoolForm.areaArea = this.area[2]
    }
  },
  data () {
    /**
     * 校验院校地址是否为空
     * @param rule
     * @param value
     * @param callback
     */
    const validateArea = (rule, value, callback) => {
      if (this.area.length < 3) {
        callback(new Error('请输入院校地址'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      area: [],
      schoolForm: {
        logo: null,
        name: null,
        code: null,
        website: null,
        phone: null,
        areaProvince: null,
        areaCity: null,
        areaArea: null,
        areaDetail: null,
        sort: 1,
        majorType: null,
        degreeType: 'B',
        attachType: null,
        attachInfo: null,
        satisfy: 5,
        ratioSatisfyEnvironment: 5,
        ratioSatisfyLife: 5,
        ratioSatisfyEdu: 5,
        ratioSatisfyWork: 5,
        features: [],
        detail: {
          describe: '',
          faculty: '',
          life: '',
          scholarship: '',
          img1Path: '',
          img2Path: '',
          img3Path: '',
          img4Path: ''
        }
      },
      schoolRules: {
        name: { required: true, message: '请输入院校名称', trigger: 'blur' },
        code: { required: true, message: '请输入院校编码', trigger: 'blur' },
        area: { required: true, validator: validateArea, trigger: 'change' },
        majorType: { required: true, message: '请选择院校类型', trigger: 'change' },
        degreeType: { required: true, message: '请选择学历层次', trigger: 'change' },
        attachType: { required: true, message: '请选择归属类型', trigger: 'change' }
      }
    }
  },
  created () {
    this.initSchool()
  },
  methods: {
    /**
     * 如果是修改操作，获取院校信息
     */
    initSchool () {
      if (!this.$CV.isEmpty(this.$route.query.schoolId)) {
        findDto(this.$route.query.schoolId).then(data => {
          this.schoolForm = data.result

          if (!this.$CV.isEmpty(this.schoolForm.areaProvince)) this.area.push(this.schoolForm.areaProvince)
          if (!this.$CV.isEmpty(this.schoolForm.areaCity)) this.area.push(this.schoolForm.areaCity)
          if (!this.$CV.isEmpty(this.schoolForm.areaArea)) this.area.push(this.schoolForm.areaArea)
        })
      }
    },
    /**
     * 放回列表页
     */
    goBack () {
      this.$CSure({
        'content': '放弃本次编辑内容？',
        'confirm': () => { this.$router.replace({path: '/ieg/school'}) }
      })
    },
    /**
     * 确定事件
     */
    submitHandle () {
      this.loading = true
      this.$refs.schoolForm.validate((valid) => {
        if (valid) {
          if (this.$CV.isEmpty(this.$route.query.schoolId)) this.raiseHandle()
          else this.modifyHandle()
        } else {
          this.loading = false
        }
      })
    },
    /**
     * 新增院校信息
     */
    raiseHandle () {
      save(this.schoolForm).then(data => {
        if (data.isSuccess) {
          this.$Message.success('新增成功')
          this.$router.replace({path: '/ieg/school'})
        }
      })
    },
    /**
     * 修改院校信息
     */
    modifyHandle () {
      modify(this.schoolForm).then(data => {
        if (data.isSuccess) {
          this.$Message.success('修改成功')
          this.$router.replace({path: '/ieg/school'})
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .ieg-school-form {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .ieg-school-form-detail-row {
      height: 500px;
    }
  }
</style>
