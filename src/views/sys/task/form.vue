<template>
  <Modal v-model="isShow" :title="title" :loading="loading" @on-ok="ok" @on-cancel="cancel" @on-visible-change="visibleChange" >
    <Form ref="taskForm" :model="taskForm" :rules="taskRules" :label-width="90">
      <FormItem label="任务名称" prop="name">
        <Input type="text" v-model.trim="taskForm.name" :maxlength="20" clearable />
      </FormItem>
      <FormItem label="定时规则" prop="rule">
        <Input type="text" v-model.trim="taskForm.rule" :maxlength="30" clearable />
      </FormItem>
      <FormItem label=" ">
        <Alert show-icon>
          示例：
          <template slot="desc">
            <p>*/5 * * * * ? 每隔5秒执行</p>
            <p>0 */1 * * * ? 每隔1分钟执行</p>
            <p>0 0 23 * * ? 每天23点执行</p>
          </template>
        </Alert>
      </FormItem>
      <FormItem label="任 务 类" prop="className">
        <Input type="text" v-model.trim="taskForm.className" :maxlength="100" clearable />
      </FormItem>
      <Row :gutter="10">
        <Col span="14">
          <FormItem label="任 务 组" prop="group">
            <CDictSelect v-model="taskForm.group" dict="sys_task"/>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="启用状态" prop="isShow">
            <i-switch v-model="taskForm.status" true-value="Yes" false-value="No">
              <span slot="open">启用</span>
              <span slot="close">停用</span>
            </i-switch>
          </FormItem>
        </Col>
      </Row>
      <FormItem label="备注" prop="remark">
        <Input type="textarea" v-model.trim="taskForm.remark" :maxlength="100" clearable />
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import CDictSelect from '@/components/sys/dict/select'
import { checkName, checkRule, checkTask, save, modify } from '@/api/sys/task'

export default {
  name: 'SysMenu_Form',
  components: { CDictSelect },
  props: {
    value: {type: Boolean, default: false, required: true},
    type: {type: String, default: 'raise', required: true},
    taskInfo: {type: Object, default: null, required: false}
  },
  computed: {
    /**
     * modal title
     * @returns {*}
     */
    title () {
      let titleAry = {
        'modify': '编辑任务信息',
        'raise': '新增任务信息'
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
     * 校验任务名称是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validateName = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入任务名称'))
      } else {
        let id = this.taskForm.id ? this.taskForm.id : null
        checkName(id, value).then(data => {
          if (data.result) callback(new Error('任务名称已存在'))
          else callback()
        })
      }
    }

    /**
     * 校验定时规则是否正确
     * @param rule
     * @param value
     * @param callback
     */
    const validateRule = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入定时规则'))
      } else {
        checkRule(value).then(data => {
          if (!data.result) callback(new Error('请输入符合规则的定时规则'))
          else callback()
        })
      }
    }

    /**
     * 校验任务类是否存在
     * @param rule
     * @param value
     * @param callback
     */
    const validateClassName = (rule, value, callback) => {
      if (this.$CV.isEmpty(value)) {
        callback(new Error('请输入任务类'))
      } else {
        checkTask(value).then(data => {
          if (!data.result) callback(new Error('任务类不存在'))
          else callback()
        })
      }
    }

    return {
      loading: true,
      isShow: false,
      taskForm: {
        name: null,
        group: null,
        rule: null,
        status: 'Yes',
        className: null,
        remark: null
      },
      taskRules: {
        name: {required: true, validator: validateName, trigger: 'blur'},
        group: {required: true, message: '请选择任务组', trigger: 'change'},
        rule: {required: true, validator: validateRule, trigger: 'blur'},
        className: {required: true, validator: validateClassName, trigger: 'blur'}
      }
    }
  },
  methods: {
    /**
     * 确定按钮事件
     */
    ok () {
      this.$refs.taskForm.validate((valid) => {
        if (valid) {
          this[this.type]()
        } else {
          this.loading = false
          this.$nextTick(() => { this.loading = true })
        }
      })
    },
    /**
     * 保存
     */
    raise () {
      save(this.taskForm).then(data => {
        if (data.isSuccess) this.callBack('新增成功')
      })
    },
    /**
     * 修改
     */
    modify () {
      modify(this.taskForm).then(data => {
        if (data.isSuccess) this.callBack('修改成功')
      })
    },
    /**
     * 操作的回掉函数
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
      this.$refs.taskForm.resetFields()

      this.taskForm = {
        name: null,
        group: null,
        rule: null,
        status: 'Yes',
        className: null,
        remark: null
      }

      this.isShow = false
    },
    /**
     * 修改信息时赋值
     * @param isOpen
     */
    visibleChange (isOpen) {
      if (isOpen && this.type === 'modify') {
        this.taskForm = Object.assign({}, this.taskInfo)
      }
    }
  }
}
</script>
