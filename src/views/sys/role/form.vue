<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange">
    <Form ref="roleForm" :model="roleForm" :rules="roleRules" :label-width="90">
      <FormItem label="角色名称" prop="name">
        <Input type="text" v-model.trim="roleForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="角色编码" prop="code">
        <Input type="text" v-model.trim="roleForm.code" :maxlength="50" clearable />
      </FormItem>
      <FormItem label="备注" prop="remark">
        <Input type="textarea" v-model.trim="roleForm.remark" :maxlength="100" clearable />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import { save, modify, checkCode, checkName, find } from '@/api/sys/role'

/**
 * 新增/修改角色信息
 */
export default {
  name: 'SysRole_Form',
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    roleId: {type: String, default: '', required: false}
  },
  computed: {
    title () {
      let titleAry = {
        'modify': '编辑角色信息',
        'raise': '新增角色信息'
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
    /**
     * 定义校验角色名称规则
     * @param rule
     * @param value
     * @param callback
     */
    const validateName = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入角色名称'))
      } else {
        let id = this.roleForm.id ? this.roleForm.id : null
        checkName(id, value).then(data => {
          if (data.result) callback(new Error('角色名称已存在'))
          else callback()
        })
      }
    }

    /**
     * 定义校验角色编码规则
     * @param rule
     * @param value
     * @param callback
     */
    const validateCode = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入角色编码'))
      } else {
        let id = this.roleForm.id ? this.roleForm.id : null
        checkCode(id, value).then(data => {
          if (data.result) callback(new Error('角色编码已存在'))
          else callback()
        })
      }
    }

    return {
      loading: true,
      isShow: false,
      roleForm: {id: null, name: null, code: null, remark: null},
      roleRules: {
        name: {required: true, validator: validateName, trigger: 'blur'},
        code: {required: true, validator: validateCode, trigger: 'blur'}
      }
    }
  },
  methods: {
    /**
     * 操作角色信息
     */
    ok () {
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          /*
            若不掉用$nextTick ：
              this.loading = false
              this.loading = true
              这样相当于没执行，被vue优化掉了
           */
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 修改角色信息
     */
    modify () {
      modify(this.roleForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 新增角色信息
     */
    raise () {
      save(this.roleForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改/新增角色信息成功回掉
     */
    callBack (msg) {
      this.$Message.success(msg)
      this.cancel()

      this.$emit('refresh', '')
    },
    /**
     * 关闭modal
     */
    cancel () {
      this.$refs.roleForm.resetFields()
      this.roleForm = {id: null, name: null, code: null, remark: null}
      this.isShow = false
    },
    /**
     * modal显示/隐藏变化回调
     * @param isOpen true显示 false隐藏
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify' && !this.$CV.isEmpty(this.roleId)) {
        find(this.roleId).then(data => {
          this.roleForm = data.result
        })
      }
    }
  }
}
</script>
