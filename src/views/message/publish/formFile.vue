<template>
  <Upload
    multiple
    type="drag"
    action="/ms/assets/file"
    :headers="headersObj"
    :default-file-list="filePath"
    :max-size="20480"
    :on-exceeded-size="handleMaxSize"
    :on-success="handleSuccess"
    :on-remove="handleRemove">
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
      <p>点 击 或 拖 拽 上 传 附 件 </p>
    </div>
  </Upload>
</template>
<script>
import { getToken } from '@/utils/auth'

export default {
  name: 'MessagePublishForm_File',
  props: {
    value: {required: true}
  },
  computed: {
    /**
     * token
     */
    headersObj () {
      return { Authorization: 'Bearer ' + getToken() }
    }
  },
  watch: {
    value (val) { this.filePath = val },
    filePath (val) { this.$emit('input', val) }
  },
  data () {
    return {
      filePath: []
    }
  },
  methods: {
    /**
     * handleMaxSize
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传20M以内的消息附件')
    },
    /**
     * handleSuccess
     * @param data
     * @param file
     */
    handleSuccess (data, file) {
      if (data.isSuccess) this.filePath.push({name: file.name, path: data.result})
    },
    /**
     * handleRemove
     * @param file
     * @param fileList
     */
    handleRemove (file, fileList) {
      let fileIndex
      this.filePath.forEach((f, index) => {
        if (file.name === f.name) fileIndex = index
      })

      this.filePath.splice(fileIndex, 1)
    }
  }
}
</script>
