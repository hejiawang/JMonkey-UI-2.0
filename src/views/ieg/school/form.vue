<template>
  <Layout v-layoutIn class="ieg-school-form">
    <Form ref="schoolForm" :model="schoolForm" :label-width="90">
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
              <FormItem label="院校网址" prop="website">
                <Input type="text" v-model.trim="schoolForm.website" :maxlength="50" clearable >
                  <span slot="prepend">http://</span>
                </Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="联系方式" prop="phone">
                <Input type="text" v-model.trim="schoolForm.phone" :maxlength="50" clearable />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="10">
            <Col span="14">
              <FormItem label="院校地址" prop="area">
                <al-selector v-model="area" level="2" class="al-selector" />
              </FormItem>
            </Col>
            <Col span="10">
              <Input type="text" v-model.trim="schoolForm.areaDetail" :maxlength="50" clearable />
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
            <Col span="8">
              <FormItem label="归属类型" prop="attachType">
                <CDictSelect v-model="schoolForm.attachType" dict="ieg-school-attach-type"/>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="归属信息" prop="attachInfo">
                <Input type="text" v-model.trim="schoolForm.attachInfo" :maxlength="50" clearable />
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
      <Row :gutter="32">
        <Col span="20" offset="4">
          <FormItem label="院校特性" prop="features">
            <CDictSelect v-model="schoolForm.features" type="radio" multiple="true" dict="ieg-school-features-type"/>
          </FormItem>
        </Col>
      </Row>

      <Row> <Alert show-icon>详 细 信 息</Alert> </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 学校简介</Divider>
        <CEditor v-model="schoolForm.describe" imgAction="/ieg/school/detail/file" :imgData="{content: 'describe'}" />
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 学院简介</Divider>
        <CEditor v-model="schoolForm.faculty" imgAction="/ieg/school/detail/file" :imgData="{content: 'faculty'}"/>
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 食宿条件</Divider>
        <CEditor v-model="schoolForm.life" imgAction="/ieg/school/detail/file" :imgData="{content: 'life'}"/>
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 当地气候饮食情况</Divider>
        <CEditor v-model="schoolForm.environment" imgAction="/ieg/school/detail/file" :imgData="{content: 'environment'}"/>
      </Row>
      <Row class="ieg-school-form-detail-row">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 奖学金设置</Divider>
        <CEditor v-model="schoolForm.scholarship" imgAction="/ieg/school/detail/file" :imgData="{content: 'scholarship'}"/>
      </Row>
    </Form>
    <Row :gutter="120">
      <Col offset="8" span="4"><Button long type="info" @click="goBack">取 消</Button></Col>
      <Col span="4"><Button long type="success" >确 定</Button></Col>
    </Row>
  </Layout>
</template>
<script>
import CDictSelect from '@/components/sys/dict/select'
import CUploadImg from '@/components/layout/uploadImg'
import CEditor from '@/components/layout/editor'

export default {
  name: 'IegSchoolForm',
  components: {
    CDictSelect, CUploadImg, CEditor
  },
  computed: {
    area () {
      return [this.schoolForm.areaProvince, this.schoolForm.areaCity, this.schoolForm.areaArea]
    }
  },
  data () {
    return {
      schoolForm: {
        logo: null,
        name: null,
        website: null,
        phone: null,
        areaProvince: null,
        areaCity: null,
        areaArea: null,
        areaDetail: null,
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
        describe: '',
        faculty: '',
        life: '',
        environment: '',
        scholarship: ''
      }
    }
  },
  created () {
  },
  methods: {
    goBack () {
      this.$CSure({
        'content': '放弃本次编辑内容？',
        'confirm': () => { this.$router.replace({path: '/ieg/school'}) }
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
      height: 300px;
    }
  }
</style>
