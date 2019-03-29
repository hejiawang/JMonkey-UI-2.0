<template>
  <Row class="app-layout-editor">
    <Upload
      style="height: 0px;"
      :class="'content-image-' + imgRef"
      :action="imgAction"
      :data="imgData"
      :headers="headersObj"
      :show-upload-list="false"
      :max-size="2048"
      :format="['jpg','jpeg','png']"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess"/>

    <quillEditor ref="myQuillEditor"  v-model="editorContent" :options="editorOption" />
  </Row>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

/**
 * 富文本编辑器配置信息
 * @type {*[]}
 */
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{'header': 1}, {'header': 2}], // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
  [{'direction': 'rtl'}], // text direction
  [{'size': ['small', false, 'large', 'huge']}], // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],
  [{'color': []}, {'background': []}], // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image'],
  ['clean']
]

export default {
  name: 'MessagePublishForm_Editor',
  components: {
    quillEditor
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * token
     */
    headersObj () {
      return { Authorization: 'Bearer ' + getToken() }
    },
    editorOption () {
      let _t = this
      return {
        placeholder: '',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'image': function (value) {
                let s = '.content-image-' + _t.imgRef + ' input'
                if (value) document.querySelector(s).click()
              }
            }
          }
        }
      }
    }
  },
  props: {
    value: {required: true},
    imgAction: {required: true},
    imgData: {required: false},
    imgRef: {type: String, default: 'img', required: false} // 防止一个页面多余该组件时,Upload的class重复
  },
  watch: {
    value (val) { this.editorContent = val },
    editorContent (val) { this.$emit('input', val) }
  },
  data () {
    return {
      editorContent: ''
    }
  },
  methods: {
    /**
     * 上传图片成功,将图片信息插入到文本编辑器中
     * @param data
     * @param file
     */
    handleSuccess (data, file) {
      if (data.isSuccess) {
        let quill = this.$refs.myQuillEditor.quill
        let length = quill.getSelection().index
        quill.insertEmbed(length, 'image', this.website.filePath + data.result)

        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$Message.error('图片插入失败')
      }
    },
    /**
     * 上传格式错误
     * @param file
     */
    handleFormatError (file) {
      this.$Message.error('请上传jpg、jpeg或png格式的头像图片')
    },
    /**
     * 上传大小超过限制
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传2M以内的头像图片')
    }
  }
}
</script>
<style lang="scss">
  .app-layout-editor{
    height: calc(100% - 130px);
    .quill-editor{
      height: 100%;
    }
  }
</style>
