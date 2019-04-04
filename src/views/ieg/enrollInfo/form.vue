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
      <Col span="12"><Button type="info" :loading="downloadDemoLoading" long>模 板 下 载</Button></Col>
      <Col span="12"><Button type="primary" :loading="loading" long>上 传 文 件</Button></Col>
    </Row>
  </Row>
</template>
<script>
import { getToken } from '@/utils/auth'

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
      filePath: []
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
    }
  }
}
</script>
