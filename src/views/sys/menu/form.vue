<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" width="750">
    <Form ref="menuForm" :model="menuForm" :rules="menuRules" :label-width="90">
      <FormItem label="菜单名称" prop="name">
        <Input type="text" v-model.trim="menuForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="上级资源" prop="parentId">
        <CRsmTree v-model="menuForm.parentId" />
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
        <Col span="6">
          <FormItem label="是否显示" prop="isShow">
            <i-switch v-model="menuForm.isShow" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="是否在引导页显示" prop="isGuide" :label-width="180">
            <i-switch v-model="menuForm.isGuide" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="是否主页" prop="isShow">
            <i-switch v-model="menuForm.isIndex" true-value="Yes" false-value="No">
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="路由方式" prop="showType">
          <RadioGroup v-model="menuForm.showType">
            <Radio label="Home">Home页</Radio>
            <Radio label="Screen">全屏页</Radio>
          </RadioGroup>
        </FormItem>
      </Row>
    </Form>
  </Modal>
</template>
<script>
import { save, find, modify, checkPath } from '@/api/sys/menu'
import CRsmTree from '@/views/sys/resource/smTree'

export default {
  name: 'SysMenu_Form',
  components: {
    CRsmTree
  },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    systemRId: {type: String, default: null, required: true},
    menuId: {type: String, default: null, required: false}
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
    value (val) { this.isShow = val },
    isShow (val) { this.$emit('input', val) }
  },
  data () {
    /**
     * 校验前端路由是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validatePath = (rule, value, callback) => {
      if (!this.$CV.isEmpty(value)) {
        let id = this.menuForm.id ? this.menuForm.id : null
        checkPath(id, value).then(data => {
          if (data.result) callback(new Error('前端路由已存在'))
          else callback()
        })
      } else {
        callback()
      }
    }

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
        isGuide: 'No',
        isIndex: 'No',
        showType: 'Home'
      },
      menuRules: {
        name: { required: true, message: '请输入菜单名称', trigger: 'blur' },
        path: {required: false, validator: validatePath, trigger: 'blur'}
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
      modify(this.menuForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    cancel () {
      this.$refs.menuForm.resetFields()
      this.menuForm = {
        name: null,
        parentId: null,
        icon: null,
        path: null,
        component: null,
        sort: 1,
        isShow: 'Yes',
        isGuide: 'No',
        isIndex: 'No',
        showType: 'Home'
      }
      this.isShow = false
    },
    visibleChange (isOpen) {
      if (isOpen && this.type === 'raise') this.menuForm.parentId = this.systemRId
      if (isOpen && this.type === 'modify') find(this.menuId).then(data => { this.menuForm = data.result })
    }
  }
}
</script>
