<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" :mask-closable="false"
         @on-visible-change="visibleChange" width="1200" class="ieg-environment-form">
    <Form ref="environmentForm" :model="environmentForm" :rules="environmentRules" :label-width="90">
      <FormItem label="省市区域" prop="area">
        <al-selector v-model="area" level="1" data-type="code" class="al-selector" />
      </FormItem>
      <FormItem label="信息来源" prop="source">
        <Input type="textarea" v-model.trim="environmentForm.source" :maxlength="500" clearable />
      </FormItem>
      <Row class="ieg-environment-form-describe">
        <Divider><Icon type="ios-information-circle-outline" size="16"/> 简介 </Divider>
        <CEditor v-model="environmentForm.describe" imgRef="describe"
                 imgAction="/ieg/environment/file" />
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { save, modify, checkExist } from '@/api/ieg/environment'
import CEditor from '@/components/layout/editor'

export default {
  name: 'IegEnvironment_Form',
  components: {
    CEditor
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    environment: {type: Object, default: null, required: false}
  },
  watch: {
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) },
    area (val) {
      if (this.area.length >= 1) this.environmentForm.areaProvince = this.area[0]
      if (this.area.length >= 2) this.environmentForm.areaCity = this.area[1]
    }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑气候饮食信息',
        'raise': '新增气候饮食信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    /**
     * 校验院校地址是否为空
     * @param rule
     * @param value
     * @param callback
     */
    const validateArea = (rule, value, callback) => {
      if (this.area.length < 2) {
        callback(new Error('请选择地址'))
      } else {
        checkExist(this.environmentForm).then(data => {
          if (data.result) callback(new Error('该地区信息已存在'))
          else callback()
        })
      }
    }

    return {
      area: [],
      loading: true,
      isShow: false,
      environmentForm: {
        areaProvince: null,
        areaCity: null,
        describe: '',
        source: null
      },
      environmentRules: {
        area: { required: true, validator: validateArea, trigger: 'change' }
      }
    }
  },
  methods: {
    /**
     * ok handle
     */
    ok () {
      this.$refs.environmentForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * raise environmentForm
     */
    raise () {
      save(this.environmentForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * modify environmentForm
     */
    modify () {
      modify(this.environmentForm).then(data => {
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
      this.$refs.environmentForm.resetFields()

      this.environmentForm = {
        areaProvince: null,
        areaCity: null,
        describe: '',
        source: null
      }
      this.area = []

      this.isShow = false
    },
    /**
     * open modal
     * @param isOpen true
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.environmentForm = Object.assign({}, this.environment)
        this.area = [this.environmentForm.areaProvince, this.environmentForm.areaCity]
      }
    }
  }
}
</script>
<style lang="scss">
  .ieg-environment-form {
    .ivu-modal {
      top: 50px;
    }
    .ieg-environment-form-describe {
      height: 500px;
    }
  }
</style>
