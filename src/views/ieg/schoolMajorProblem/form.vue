<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1050">
    <Form ref="schoolMajorProblemForm" :model="schoolMajorProblemForm" :rules="schoolMajorProblemRules" :label-width="90">
      <FormItem label="问题描述" prop="problem">
        <Input type="text" v-model.trim="schoolMajorProblemForm.problem" :maxlength="50" clearable />
      </FormItem>
      <Row style="height: 500px;">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 问题回答 </Divider>
        <CEditor v-model="schoolMajorProblemForm.answer" imgRef="school-major-problem-handle"
                 imgAction="/ieg/school/major/problem/file" :imgData="{schoolMajorId: schoolMajorId}"/>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { save, modify } from '@/api/ieg/schoolMajorProblem'
import CEditor from '@/components/layout/editor'

export default {
  name: 'IegSchoolMajorProblem_Form',
  components: {
    CEditor
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    schoolMajorId: {type: String, default: '', required: true},
    problem: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑院校专业问题信息',
        'raise': '新增院校专业问题信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      schoolMajorProblemForm: {
        problem: null,
        answer: null
      },
      schoolMajorProblemRules: {
        problem: { required: true, message: '请输入问题信息', trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * ok handle
     */
    ok () {
      this.$refs.schoolMajorProblemForm.validate((valid) => {
        if (valid) {
          this.schoolMajorProblemForm.schoolMajorId = this.schoolMajorId
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
      save(this.schoolMajorProblemForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify faculty
     */
    modify () {
      modify(this.schoolMajorProblemForm).then(data => {
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
      this.$refs.schoolMajorProblemForm.resetFields()

      this.schoolMajorProblemForm = {
        problem: null,
        answer: null
      }

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') this.schoolMajorProblemForm = Object.assign({}, this.problem)
    }
  }
}
</script>
