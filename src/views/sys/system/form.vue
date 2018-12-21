<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="500">
    <Form ref="systemForm" :model="systemForm" :rules="systemRules" :label-width="100">
      <FormItem label="系统名称" prop="name">
        <Input type="text" v-model.trim="systemForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="系统图标" prop="icon">
        <Input type="text" v-model.trim="systemForm.icon" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="系统排序" prop="sort">
        <InputNumber :max="1000" :min="1" v-model="systemForm.sort" style="width: 100%"/>
      </FormItem>
      <Row :gutter="32">
        <Col span="9">
          <FormItem label="是否显示" prop="isShow">
            <i-switch v-model="systemForm.isShow" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="15">
          <FormItem label="显示方式" prop="showType">
            <RadioGroup v-model="systemForm.showType">
              <Radio label="Tabs">标签页</Radio>
              <Radio label="Breadcrumb">导航条</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="9">
          <FormItem label="放置引导页" prop="showGuide">
            <i-switch v-model="systemForm.showGuide" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="15">
          <FormItem label="引导页菜单" prop="showMenu">
            <i-switch v-model="systemForm.showMenu" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { save, modify, find } from '@/api/sys/system'

export default {
  name: 'SysSystem_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'View', required: true},
    systemId: {type: String, default: '', required: false}
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑系统信息',
        'raise': '新增系统信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      systemForm: {
        id: '',
        icon: '',
        name: '',
        isShow: 'Yes',
        showType: 'Tabs',
        showGuide: 'Yes',
        showMenu: 'Yes',
        sort: 1
      },
      systemRules: {
        name: { required: true, message: '请输入系统名称', trigger: 'blur' },
        icon: { required: true, message: '请输入系统图标', trigger: 'blur' }
      }
    }
  },
  methods: {
    /**
     * 操作系统信息
     */
    ok () {
      this.$refs.systemForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 新增系统信息
     */
    raise () {
      save(this.systemForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改系统信息
     */
    modify () {
      modify(this.systemForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 修改/新增系统信息成功回调
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.systemForm.resetFields()
      this.systemForm = {
        id: '',
        icon: '',
        name: '',
        isShow: 'Yes',
        showType: 'Tabs',
        showGuide: 'Yes',
        showMenu: 'Yes',
        sort: 1
      }
      this.isShow = false
    },
    /**
     * modal显示/隐藏变化回调
     * @param isOpen true显示 false隐藏
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify' && !this.$CV.isEmpty(this.systemId)) {
        find(this.systemId).then(data => {
          this.systemForm = data.result
        })
      }
    }
  }
}
</script>
