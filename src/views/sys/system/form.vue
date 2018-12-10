<template>
  <Modal v-model="isShow" :title="title" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="500">
    <Form ref="systemForm" :model="systemForm" :rules="systemRules" :label-width="100">
        <FormItem label="系统名称" prop="name">
          <Input type="text" v-model="systemForm.name" clearable />
        </FormItem>
        <FormItem label="系统图标" prop="icon">
          <Input type="text" v-model="systemForm.icon" clearable />
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
export default {
  name: 'SysSystem_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'View', required: true}
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
        'Modify': '编辑系统信息',
        'Raise': '新增系统信息'
      }
      return titleAry[this.type]
    }
  },
  data () {
    return {
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
      systemRules: { }
    }
  },
  methods: {
    ok () {
      this.$emit('refresh', '')
      this.isShow = false
    },
    cancel () {
      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen) {
        console.info(1)
      }
    }
  }
}
</script>
