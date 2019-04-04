<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" width="500" class="ieg-enroll-form">
    <Form ref="enrollForm" :model="enrollForm" :label-width="90" :rules="enrollRules">
      <FormItem label="录取年份" prop="year">
        <InputNumber :max="10000" :min="1" v-model="enrollForm.year" style="width: 100%;"/>
      </FormItem>
      <FormItem label="学科类型" prop="courseType">
        <RadioGroup v-model="enrollForm.courseType">
          <Radio label="W">文科</Radio>
          <Radio label="L">理科</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="学历层次" prop="degreeType">
        <RadioGroup v-model="enrollForm.degreeType">
          <Radio label="B">本科</Radio>
          <Radio label="Z">专科</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="招收类型" prop="enrollType">
        <RadioGroup v-model="enrollForm.enrollType">
          <Radio label="Common">普通</Radio>
          <Radio label="Art">艺术</Radio>
          <Radio label="Gym">体育</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { save, modify, checkExist } from '@/api/ieg/enroll'
import moment from 'moment'

export default {
  name: 'IegEnroll_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    enroll: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑投档分数线信息',
        'raise': '新增投档分数线信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    const validateExist = (rule, value, callback) => {
      checkExist(this.enrollForm).then(data => {
        if (data.result) callback(new Error('该信息已存在'))
        else callback()
      })
    }

    return {
      area: [],
      loading: true,
      isShow: false,
      enrollForm: {
        year: 2000,
        courseType: 'W',
        degreeType: 'B',
        enrollType: 'Common'
      },
      enrollRules: {
        enrollType: {validator: validateExist, trigger: 'changle'}
      }
    }
  },
  methods: {
    /**
     * ok handle
     */
    ok () {
      this.$refs.enrollForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * raise environmentForm
     */
    raise () {
      save(this.enrollForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify environmentForm
     */
    modify () {
      modify(this.enrollForm).then(data => {
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
      this.$refs.enrollForm.resetFields()

      this.enrollForm = {
        year: 2000,
        courseType: 'W',
        degreeType: 'B',
        enrollType: 'Common'
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      this.enrollForm.year = parseInt(moment(new Date()).format('YYYY'))

      if (isOpen && this.type === 'modify') {
        this.enrollForm = Object.assign({}, this.enroll)
      }
    }
  }
}
</script>
