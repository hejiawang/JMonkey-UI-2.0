<template>
  <div class="userForm-upload">
    <div v-if="photoPath">
      <img :src="website.filePath + photoPath">
      <div class="userForm-upload-cover">
        <Icon type="ios-trash-outline" @click.native="handleRemove()" />
      </div>
    </div>

    <Upload v-else
      type="drag"
      action="/sys/user/uploadPhoto"
      :headers="headersObj"
      :show-upload-list="false"
      :max-size="2048"
      :format="['jpg','jpeg','png']"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :on-success="handleSuccess">

      <div class="userForm-upload-context">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" />
        <p>上传用户头像</p>
      </div>
    </Upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

/**
 * 上传用户头像组件
 */
export default {
  name: 'SysUser_Upload',
  props: {
    value: {required: true}
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
     * 上传用户头像成功
     * @param data
     * @param file
     */
    handleSuccess (data, file) {
      if (data.isSuccess) this.photoPath = data.result
    },
    /**
     * 上传头衔格式错误
     * @param file
     */
    handleFormatError (file) {
      this.$Message.error('请上传jpg、jpeg或png格式的头像图片')
    },
    /**
     * 上传头像大小超过限制
     * @param file
     */
    handleMaxSize (file) {
      this.$Message.error('请上传2M以内的头像图片')
    },
    /**
     * 移除上传的用户头像
     */
    handleRemove () {
      this.photoPath = ''
    }
  }
}
</script>
<style lang="scss">
  .userForm-upload{
    text-align: center;
    .ivu-upload .ivu-upload-drag{
      height: 220px;
    }
    .userForm-upload-context{
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

  .userForm-upload-cover{
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

  .userForm-upload:hover .userForm-upload-cover{
    display: block;
  }
</style>
