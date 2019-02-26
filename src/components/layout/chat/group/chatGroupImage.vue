<template>
  <div class="chat-group-image">
    <div v-if="imgPath">
      <img :src="website.filePath + imgPath">
      <div class="chat-group-image-cover">
        <Icon type="ios-trash-outline" @click.native="handleRemove()" />
      </div>
    </div>

    <Upload v-else
      type="drag"
      action="/ms/assets/chat/group/image"
      :headers="headersObj"
      :show-upload-list="false"
      :max-size="2048"
      :format="['jpg','jpeg','png']"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess">
      <div style="padding: 20px 0">
        <Icon type="logo-instagram" size="20" style="color: #3399ff" />
      </div>
    </Upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'CChatGroupImage',
  props: {
    value: {required: true}
  },
  watch: {
    value (val) { this.imgPath = val },
    imgPath (val) { this.$emit('input', val) }
  },
  computed: {
    ...mapGetters(['website']),
    /**
     * token
     */
    headersObj () {
      return { Authorization: 'Bearer ' + getToken() }
    }
  },
  data () {
    return {
      imgPath: ''
    }
  },
  methods: {
    /**
     * 上传格式错误
     * @param file
     */
    handleFormatError (file) {
      this.$Message.error('请上传jpg、jpeg或png格式的群组图片')
    },
    /**
     * 上传大小超过限制
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传2M以内的群组图片')
    },
    /**
     * 上传成功
     * @param data
     * @param file
     */
    handleSuccess (data, file) {
      if (data.isSuccess) this.imgPath = data.result
    },
    /**
     * 移除头像
     */
    handleRemove () {
      this.imgPath = ''
    }
  }
}
</script>
<style lang="scss">
  .chat-group-image{
    img{
      height: 60px;
      width: 100%
    }
  }
  .chat-group-image-cover{
    text-align: center;
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 60px;
    background: rgba(0,0,0,.5);
    i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }

  .chat-group-image:hover .chat-group-image-cover{
    display: block;
  }
</style>
