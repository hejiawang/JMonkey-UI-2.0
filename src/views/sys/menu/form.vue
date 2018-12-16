<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="750">
    <Form ref="menuForm" :model="menuForm" :rules="menuRules" :label-width="90">
      <FormItem label="菜单名称" prop="name">
        <Input type="text" v-model.trim="menuForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="上级资源" prop="parentId">
        <!--<Input type="text" v-model.trim="menuForm.parentName" :maxlength="20" clearable />-->
        <CRsmTree v-model="menuForm.parentId"></CRsmTree>
      </FormItem>
      <FormItem label="菜单图标" prop="icon">
        <Input type="text" v-model.trim="menuForm.icon" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="前端路由" prop="path">
        <Input type="text" v-model.trim="menuForm.path" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="前端页面" prop="component">
        <Input type="text" v-model.trim="menuForm.component" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="系统排序" prop="sort">
        <InputNumber :max="1000" :min="1" v-model="menuForm.sort" style="width: 100%"/>
      </FormItem>
      <Row :gutter="32">
        <Col span="7">
          <FormItem label="是否显示" prop="isShow">
            <i-switch v-model="menuForm.isShow" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="是否主页" prop="isShow">
            <i-switch v-model="menuForm.isIndex" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="路由方式" prop="showType">
            <RadioGroup v-model="menuForm.showType">
              <Radio label="Home">Home页</Radio>
              <Radio label="Screen">全屏页</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { save } from '@/api/sys/menu'
import CRsmTree from '@/views/sys/resource/smTree'

export default {
  name: 'SysMenu_Form',
  components: {
    CRsmTree
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    systemRId: {type: String, default: null, required: true}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑菜单信息',
        'raise': '新增菜单信息'
      }
      return titleAry[this.type]
    }
  },
  watch: {
    value (val) {
      this.isShow = val
    },
    isShow (val) {
      this.$emit('input', val)
    }
  },
  data () {
    return {
      loading: true,
      isShow: false,
      menuForm: {
        name: null,
        parentId: null,
        icon: null,
        path: null,
        component: null,
        sort: 1,
        isShow: 'Yes',
        isIndex: 'No',
        showType: 'Home'
      },
      menuRules: {
        name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
        icon: { required: true, message: '请输入菜单图标', trigger: 'blur' },
        path: { required: true, message: '请输入前端路由', trigger: 'blur' },
        component: { required: true, message: '请输入前端页面', trigger: 'blur' }
      }
    }
  },
  methods: {
    ok () {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    raise () {
      save(this.menuForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    modify () {

    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.menuForm.resetFields()
      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen) {
        this.menuForm.parentId = this.systemRId
      }
    }
  }
}
</script>
