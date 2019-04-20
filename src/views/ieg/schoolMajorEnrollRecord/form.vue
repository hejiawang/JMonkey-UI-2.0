<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="500" class="ieg-school-major-enroll-record-form">
    <Form ref="recordForm" :model="recordForm" :rules="recordRules" :label-width="90">
      <FormItem label="录取年份" prop="year">
        <InputNumber :max="10000" :min="1" v-model="recordForm.year" style="width: 100%"/>
      </FormItem>
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="recordForm.type" >
          <Radio label="L">理科</Radio>
          <Radio label="W">文科</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="计划人数" prop="planNumber">
        <InputNumber :max="10000" :min="0" v-model="recordForm.planNumber" style="width: 100%"/>
      </FormItem>
      <FormItem label="实际人数" prop="realNumber">
        <InputNumber :max="10000" :min="0" v-model="recordForm.realNumber" style="width: 100%"/>
      </FormItem>
      <FormItem label="最高分数" prop="scoreMax">
        <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.scoreMax" style="width: 100%"/>
      </FormItem>
      <FormItem label="最低分数" prop="scoreMin">
        <InputNumber :max="10000" :min="0" :step="0.01" v-model="recordForm.scoreMin" style="width: 100%"/>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import moment from 'moment'
import { save, modify } from '@/api/ieg/schoolMajorEnrollRecord'

export default {
  name: 'IegSchoolMajorEnrollRecord_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    majorId: {type: String, default: '', required: true},
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
        scoreMin: null,
        scoreMax: null,
        planNumber: null,
        realNumber: null,
        type: 'L'
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
          this.recordForm.schoolMajorId = this.majorId
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
        scoreMin: null,
        scoreMax: null,
        planNumber: null,
        realNumber: null,
        type: 'L'
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
