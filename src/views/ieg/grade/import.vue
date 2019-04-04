<template>
  <Modal v-model="isShow" :title="title" width="500" >
    <Form ref="gradeForm" :model="gradeForm" :rules="gradeRules"  :label-width="50">
      <FormItem label="年份" prop="year">
        <InputNumber :max="10000" :min="1" v-model="gradeForm.year" style="width: 100%"/>
      </FormItem>
      <FormItem label="类型" prop="type">
        <RadioGroup v-model="gradeForm.type" >
          <Radio label="L">理科</Radio>
          <Radio label="W">文科</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem :label-width="0" prop="filePath">
        <Upload
          type="drag"
          action="/ieg/grade/file"
          :headers="headersObj"
          :max-size="20480"
          :format="['xlsx', 'xls']"
          :default-file-list="filePath"
          :on-success="handleSuccess"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :on-remove="handleRemove">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点 击 或 拖 拽 上 传 附 件 </p>
          </div>
        </Upload>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="info" :loading="downloadDemoLoading" @click="downloadDemo">模板下载</Button>
      <Button type="primary" :loading="loading" @click="ok">批量上传</Button>
    </div>
  </Modal>
</template>
<script>
import moment from 'moment'
import excel from '@/utils/excel'
import { getToken } from '@/utils/auth'
import { importGrade, checkGrade, checkExist } from '@/api/ieg/grade'

export default {
  name: 'IegGrade_Import',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'submit', required: true}
  },
  computed: {
    /**
     * token
     */
    headersObj () {
      return { Authorization: 'Bearer ' + getToken() }
    },
    /**
     * title
     * @returns {*}
     */
    title () {
      let titleAry = {
        'submit': '批量导入一分一段表',
        'check': '批量校验一分一段表'
      }
      return titleAry[this.type]
    }
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    /**
     * 校验是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validExist = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请上传一分一段表Excel文件'))
      } else {
        if (this.type === 'submit') {
          checkExist(this.gradeForm).then(data => {
            if (data.result) callback(new Error(this.gradeForm.year + '' + this.gradeType[this.gradeForm.type] + '的一分一段表已存在, 请先批量删除'))
            else callback()
          })
        } else {
          callback()
        }
      }
    }

    return {
      downloadDemoLoading: false,
      loading: false,
      isShow: false,
      gradeForm: {
        year: 2000,
        type: 'L',
        filePath: ''
      },
      gradeRules: {
        filePath: {required: true, validator: validExist, trigger: 'change'}
      },
      gradeType: {
        L: '理科',
        W: '文科'
      },
      filePath: [],
      downloadDemoData: [
        {score: 652, number: 5, sort: 1},
        {score: 651, number: 3, sort: 6},
        {score: 650, number: 15, sort: 9}
      ]
    }
  },
  created () {
    this.buildNowYear()
  },
  methods: {
    buildNowYear () {
      this.gradeForm.year = parseInt(moment(new Date()).format('YYYY'))
    },
    /**
     * handleMaxSize
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传20M以内的消息附件')
    },
    /**
     * 格式错误
     * @param file
     */
    handleFormatError (file) {
      this.$Message.error('请上传xlsx格式的文件')
    },
    /**
     * handleSuccess
     * @param data
     * @param file
     */
    handleSuccess (data, file) {
      if (data.isSuccess) {
        this.filePath = [{name: file.name, path: data.result}]
        this.gradeForm.filePath = data.result
      }
    },
    /**
     * handleRemove
     * @param file
     * @param fileList
     */
    handleRemove (file, fileList) {
      this.filePath = []
      this.gradeForm.filePath = ''
    },
    /**
     * submit
     */
    ok () {
      this.loading = true
      this.$refs.gradeForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
        }
      })
    },
    /**
     * submit
     */
    submit () {
      importGrade(this.gradeForm).then(data => {
        if (data.result) {
          this.$Message.success('批量上传成功')
          this.$emit('refresh', this.gradeForm)

          this.cancel()
        } else {
          this.loading = false
          this.$Message.success('批量上传失败, 请检查文档格式是否与模板一致')
        }
      })
    },
    /**
     * 校验
     */
    check () {
      checkGrade(this.gradeForm).then(data => {
        this.$Message.success(data.message)

        if (data.isSuccess) {
          this.$emit('refresh', this.gradeForm)

          this.cancel()
        } else {
          this.loading = false
        }
      })
    },
    /**
     * 关闭modal
     */
    cancel () {
      this.$refs.gradeForm.resetFields()
      this.gradeForm = {
        year: 2000,
        type: 'L',
        filePath: ''
      }

      this.buildNowYear()
      this.filePath = []

      this.loading = false
      this.isShow = false
    },
    /**
     * 下载模板
     */
    downloadDemo () {
      this.downloadDemoLoading = true

      const params = {
        title: ['分数', '人数', '累计'],
        key: ['score', 'number', 'sort'],
        data: this.downloadDemoData,
        autoWidth: true,
        filename: '一分一段表上传模板下载'
      }
      excel.export_array_to_excel(params)

      this.downloadDemoLoading = false
    }
  }
}
</script>
