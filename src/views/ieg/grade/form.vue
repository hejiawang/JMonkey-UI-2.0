<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel"
         @on-visible-change="visibleChange" width="500" >
    <Form ref="gradeForm" :model="gradeForm" :label-width="90">
      <FormItem label="年份" prop="year">
        <InputNumber :max="10000" :min="1" v-model="gradeForm.year" style="width: 100%"/>
      </FormItem>
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="gradeForm.type" >
          <Radio label="L">理科</Radio>
          <Radio label="W">文科</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="分数" prop="score">
        <InputNumber :max="10000" :min="1" v-model="gradeForm.score" style="width: 100%"/>
      </FormItem>
      <FormItem label="人数" prop="number">
        <InputNumber :max="10000" :min="1" v-model="gradeForm.number" style="width: 100%"/>
      </FormItem>
      <FormItem label="累计" prop="sort">
        <InputNumber :max="10000" :min="1" v-model="gradeForm.sort" style="width: 100%"/>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import moment from 'moment'
import { save, modify } from '@/api/ieg/grade'

export default {
  name: 'IegGrade_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    grade: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑信息',
        'raise': '新增信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      gradeForm: {
        year: 2000,
        score: 0,
        number: 0,
        sort: 1,
        type: 'L'
      }
    }
  },
  created () {
    this.buildNowYear()
  },
  methods: {
    buildNowYear () {
      this.gradeForm.year = parseInt(moment(new Date()).format('YYYY'))
    },
    ok () {
      this.$refs.gradeForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    raise () {
      save(this.gradeForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    modify () {
      modify(this.gradeForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.gradeForm.resetFields()

      this.gradeForm = {
        year: 2000,
        score: 0,
        number: 0,
        sort: 1,
        type: 'L'
      }
      this.buildNowYear()

      this.isShow = false
    },
    /**
     * visibleChange
     * @param isOpen true is open
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.gradeForm = Object.assign({}, this.grade)
      }
    }
  }
}
</script>
