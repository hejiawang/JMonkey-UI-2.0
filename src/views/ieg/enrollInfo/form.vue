<template>
  <Row>
    <Row>
      <Upload
        type="drag"
        action="/ieg/enroll/info/file"
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
          <p>点 击 或 拖 拽 上 传 Excel 文件 </p>
        </div>
      </Upload>
    </Row>
    <Row :gutter="32">
      <Col span="12"><Button type="info" :loading="downloadDemoLoading" long @click="downloadDemo">模 板 下 载</Button></Col>
      <Col span="12"><Button type="primary" :loading="loading" long @click="ok">上 传 文 件</Button></Col>
    </Row>
  </Row>
</template>
<script>
import { getToken } from '@/utils/auth'
import excel from '@/utils/excel'
import { importInfo } from '@/api/ieg/enrollInfo'

export default {
  name: 'IegEnrollInfo_Import',
  props: {
    enroll: { required: true }
  },
  computed: {
    /**
     * token
     */
    headersObj () {
      return { Authorization: 'Bearer ' + getToken() }
    }
  },
  data () {
    return {
      downloadDemoLoading: false,
      loading: false,
      filePath: [],
      downloadDemoData: [
        {schoolCode: '0001', schoolName: '安徽财经大学', submitCode: '0002', number: '5', scoreMin: 587.106147132, scoreMax: 587.106147132},
        {schoolCode: '0002', schoolName: '安徽大学', submitCode: '0002', number: '5', scoreMin: 587.109129134, scoreMax: 587.106147132},
        {schoolCode: '0005', schoolName: '安徽工业大学', submitCode: '0002', number: '5', scoreMin: 540.096120128, scoreMax: 587.106147132}
      ]
    }
  },
  methods: {
    /**
     * handleMaxSize
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传20M以内的Excel文件')
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
      }
    },
    /**
     * handleRemove
     * @param file
     * @param fileList
     */
    handleRemove (file, fileList) {
      this.filePath = []
    },
    /**
     * 下载模板
     */
    downloadDemo () {
      this.downloadDemoLoading = true

      const params = {
        title: ['院校代号', '院校名称', '投档单位', '投档人数', '最低分数', '最高分数'],
        key: ['schoolCode', 'schoolName', 'submitCode', 'number', 'scoreMin', 'scoreMax'],
        data: this.downloadDemoData,
        autoWidth: true,
        filename: '投档线模板下载'
      }
      excel.export_array_to_excel(params)

      this.downloadDemoLoading = false
    },
    ok () {
      if (this.$CV.isEmpty(this.filePath)) {
        this.$Message.error('请上传格式正确的Excel文件')
        return
      }

      this.loading = true
      importInfo({enrollId: this.enroll.id, filePath: this.filePath[0].path}).then(data => {
        if (data.result) {
          this.$Message.success('批量上传成功')
          this.$emit('refresh', '')

          this.cancel()
        } else {
          this.loading = false
          this.$Message.success('批量上传失败, 请检查文档格式是否与模板一致')
        }
      })
    }
  }
}
</script>
