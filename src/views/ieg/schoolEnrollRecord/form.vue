<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1200" class="ieg-school-enroll-form">
    <Form ref="recordForm" :model="recordForm" :rules="recordRules" :label-width="125">
      <Row>
        <FormItem label="招生录取年份" prop="year">
          <InputNumber :max="10000" :min="1" v-model="recordForm.year" style="width: 210px;"/>
        </FormItem>
      </Row>
      <Tabs value="enroll_info">
        <TabPane label="招生简章" name="enroll_info">
          <Row style="height: 600px">
            <CEditor v-model="recordForm.enrollInfo" imgRef="enrollInfo-handle"
                     imgAction="/ieg/school/enroll/record/file" :imgData="{schoolId: schoolId, content: 'enrollInfo'}"/>
          </Row>
        </TabPane>
        <TabPane label="录取规则" name="enroll_rule">
          <Row style="height: 600px">
            <CEditor v-model="recordForm.enrollRule" imgRef="enrollRule-handle"
                     imgAction="/ieg/school/enroll/record/file" :imgData="{schoolId: schoolId, content: 'enrollRule'}"/>
          </Row>
        </TabPane>
        <TabPane label="投档分数线" name="enroll_base">
          <Row style="height: 600px">
            <Row :gutter="32" style="margin-top: 20px;">
              <Col span="8">
                <FormItem label="全国录取人数" prop="allNumber">
                  <InputNumber :max="10000" :min="0" v-model="recordForm.allNumber" style="width: 100%"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="全国最低分数" prop="allScoreMin">
                  <InputNumber :max="10000" :min="0" v-model="recordForm.allScoreMin" style="width: 100%"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="全国最高分数" prop="allScoreMax">
                  <InputNumber :max="10000" :min="0" v-model="recordForm.allScoreMax" style="width: 100%"/>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="32" style="margin-top: 20px;">
              <Col span="8">
                <FormItem label="当地录取人数" prop="localNumber">
                  <InputNumber :max="10000" :min="0" v-model="recordForm.localNumber" style="width: 100%"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="当地最低分数" prop="localScoreMin">
                  <InputNumber :max="10000" :min="0" v-model="recordForm.localScoreMin" style="width: 100%"/>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="当地最高分数" prop="localScoreMax">
                  <InputNumber :max="10000" :min="0" v-model="recordForm.localScoreMax" style="width: 100%"/>
                </FormItem>
              </Col>
            </Row>
          </Row>
        </TabPane>
      </Tabs>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/ieg/schoolEnrollRecord'
import CEditor from '@/components/layout/editor'
import moment from 'moment'

export default {
  name: 'IegSchoolEnrollRecord_Form',
  components: {
    CEditor
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    schoolId: {type: String, default: '', required: true},
    record: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑录取信息',
        'raise': '新增录取信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      recordForm: {
        year: 2000,
        enrollInfo: '',
        enrollRule: '',
        allScoreMin: null,
        allScoreMax: null,
        allNumber: null,
        localScoreMin: null,
        localScoreMax: null,
        localNumber: null
      },
      recordRules: {
        year: { required: true, type: 'date', message: '请选择招生录取年份', trigger: 'change' }
      }
    }
  },
  created () {
    this.buildNowYear()
  },
  methods: {
    buildNowYear () {
      this.recordForm.year = parseInt(moment(new Date()).format('YYYY'))
    },
    /**
     * ok handle
     */
    ok () {
      this.$refs.recordForm.validate((valid) => {
        if (valid) {
          this.recordForm.schoolId = this.schoolId
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
      save(this.recordForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      modify(this.recordForm).then(data => {
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
      this.$refs.recordForm.resetFields()

      this.recordForm = {
        year: 2000,
        enrollInfo: '',
        enrollRule: '',
        allScoreMin: 1,
        allScoreMax: 750,
        allNumber: 1,
        localScoreMin: 1,
        localScoreMax: 750,
        localNumber: 1
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') this.recordForm = Object.assign({}, this.record)
    }
  }
}
</script>
<style lang="scss">
  .ieg-school-enroll-form {
    .ivu-modal {
      top: 10px;
    }
    .ivu-tabs-nav-container {
      font-size: 17px;
    }
    .app-layout-editor {
      height: calc(100% - 50px);
    }
  }
</style>
