<template>
  <div class="app-upload-img">
    <div v-if="photoPath">
      <img :src="website.filePath + photoPath">
      <div class="upload-cover">
        <Icon type="ios-trash-outline" @click.native="handleRemove()" />
      </div>
    </div>

    <Upload v-else
            type="drag"
            :action="action"
            :headers="headersObj"
            :show-upload-list="false"
            :max-size="2048"
            :format="['jpg','jpeg','png']"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :on-success="handleSuccess">

      <div class="upload-context">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" />
        <p>{{title}}</p>
      </div>
    </Upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

/**
 * 上传图片组件
 */
export default {
  name: 'SysUser_Upload',
  props: {
    value: {required: true},
    title: {required: false},
    action: {required: true}
  },
  watch: {
    value (val) { this.photoPath = val },
    photoPath (val) { this.$emit('input', val) }
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
      photoPath: ''
    }
  },
  methods: {
    /**
     * 上传图片成功
     * @param data
     * @param file
     */
    handleSuccess (data, file) {
      if (data.isSuccess) this.photoPath = data.result
    },
    /**
     * 上传图片格式错误
     * @param file
     */
    handleFormatError (file) {
      this.$Message.error('请上传jpg、jpeg或png格式的图片')
    },
    /**
     * 上传图片大小超过限制
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传2M以内的图片')
    },
    /**
     * 移除上传的头像
     */
    handleRemove () {
      this.photoPath = ''
    }
  }
}
</script>
<style lang="scss">
  .app-upload-img{
    text-align: center;
    .ivu-upload .ivu-upload-drag{
      height: 220px;
    }
    .upload-context{
      padding: 20px 0;
      margin-top: 50px;
      p{
        font-size: 17px;
      }
    }
    img{
      height: 220px;
      width: 100%
    }
  }

  .upload-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 220px;
    background: rgba(0,0,0,.5);
    i{
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }

  .app-upload-img:hover .upload-cover{
    display: block;
  }
</style>
